import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import DatePicker from 'material-ui/DatePicker';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

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
      dob: ''
      // politicalInterest: ''    // to be handled
    };
    this.handleUser = this.handleUser.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleMiddleInitial = this.handleMiddleInitial.bind(this);
    this.handleDob = this.handleDob.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  
  handleDob(e) {
    this.setState({dob: e.target.value});
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
      dob: this.state.dob
    })
    .then(function( {data} ) {
      if(data.success) {
        console.log('data.success, supposed to redirect');
        self.props.history.push({
          pathname: '/volunteer',
          state: { name: data.user.username }
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
            title="Volunteer now" subtitle="Your effort matters"/>
          <CardActions>
            <Paper zDepth={1} style={{ margin: "20px", padding: "10px" }}>
              <TextField hintText="Pick a username for future login" type="text" value={this.state.username} onChange={(e) => this.handleUser(e)} style={style} underlineShow={false} />
              <Divider />
              <TextField hintText="Password" type="password" value={this.state.password} onChange={(e) => this.handlePass(e)} style={style} underlineShow={false} />
              <Divider />
              <TextField hintText="First name" value={this.state.firstName} onChange={(e) => this.handleFirstName(e)} style={style} underlineShow={false} />
              <Divider />
              <TextField hintText="Middle Initial" value={this.state.lastName} onChange={(e) => this.handleMiddleInitial(e)} style={style} underlineShow={false} />
              <Divider />
              <TextField hintText="Last name" value={this.state.middleInitial} onChange={(e) => this.handleLastName(e)} style={style} underlineShow={false} />
              <Divider />
              <DatePicker hintText="Date of birth" value={this.state.dob} onChange={(e) => this.handleDob(e)} style={style} underlineShow={false} openToYearSelection={true} />
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
