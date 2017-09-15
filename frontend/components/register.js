import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import DatePicker from 'material-ui/DatePicker';
import ChipInput from 'material-ui-chip-input';

// or change it to axios request

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state  = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      middleInitial: '',
      dob: '',
      politicalInterest: []
    };
  }

  handleUser(e) {
    this.setState({username: e.target.value});
  }

  handlePass(e) {
    this.setState({password: e.target.value});
  }

  handleFirstName(e) {
    this.setState({firstName: e.target.value});
  }
  
  handleLastName(e) {
    this.setState({lastName: e.target.value});
  }
  
  handleMiddleInitial(e) {
    this.setState({middleInitial: e.target.value});
  }
  
  handleDob(val) {
    console.log("date to set: ", val);
    this.setState({dob: val});
  }

  handleChange(chips) {
    console.log("chips ahoy: ", chips);
    this.setState({politicalInterest: [...chips]});
  }

  handleSubmit() {
    var self = this;
    console.log("THIS IS OUR STATE: ", this.state);
    axios.post('http://localhost:3000/register', {
      username: this.state.username,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      middleInitial: this.state.middleInitial,
      dob: this.state.dob,
      politicalInterest: this.state.politicalInterest
    })
    .then(function( {data} ) {
      if(data.success) {
        console.log('data.success, supposed to redirect, data.volunteer: ', data.volunteer);
        self.props.history.push({
          pathname: '/volunteer',
          state: { name: data.volunteer.username }
        });
      }
    })
    .catch(function(err) {
      console.log('There is a massive error :(', err);
    });
  }

  render() {
    const style = {
      marginLeft: 20,
    };
    
    return(
      <div className="loginContainer">
        <Card style={{ margin: "20px"}}>
          <CardMedia
            className="icon"
            mediaStyle={{width: "400px"}}
          >
            <img src='img/tuesdayStrategies.jpg' />
          </CardMedia>
        </Card>
        <Card className="card">
          <CardMedia
            className="icon"
            mediaStyle={{width: "400px"}}
          >
            <img src='img/Karen.jpg' />
          </CardMedia>
          <CardTitle
            titleStyle={{textAlign: 'center'}}
            subtitleStyle={{textAlign: 'center'}}
            title="Become a digital volunteer" subtitle="Your effort matters"/>
          <CardActions>
            <Paper zDepth={1} style={{ margin: "20px", padding: "10px" }}>
              <TextField hintText="Pick a username for future login" type="text" value={this.state.username} onChange={(e) => this.handleUser(e)} style={style} underlineShow={false} />
              <Divider />
              <TextField hintText="Password" type="password" value={this.state.password} onChange={(e) => this.handlePass(e)} style={style} underlineShow={false} />
              <Divider />
              <TextField hintText="First name" value={this.state.firstName} onChange={(e) => this.handleFirstName(e)} style={style} underlineShow={false} />
              <Divider />
              <TextField hintText="Middle Initial" value={this.state.middleInitial} onChange={(e) => this.handleMiddleInitial(e)} style={style} underlineShow={false} />
              <Divider />
              <TextField hintText="Last name" value={this.state.lastName} onChange={(e) => this.handleLastName(e)} style={style} underlineShow={false} />
              <Divider />
              <DatePicker hintText="Date of birth" value={this.state.dob} onChange={(e, val) => this.handleDob(val)} style={style} underlineShow={false} openToYearSelection={true} />
              <Divider />
              <ChipInput
                hintText="Political interest (Press 'Enter')"
                onChange={(chips) => this.handleChange(chips)}
                underlineShow={false}
              />
              <Divider />
            </Paper>
            <RaisedButton
              label="To Login"
              containerElement={<Link to='/'></Link>}
            />
            <RaisedButton
              label="Register"
              primary={true}
              onTouchTap={() => this.handleSubmit()}
            />
          </CardActions>
        </Card>

        <small style={{alignSelf: 'center', marginBottom: '20px'}}>2017 The Tuesday Company</small>
      </div>
    );
  }

}

export default Register;
