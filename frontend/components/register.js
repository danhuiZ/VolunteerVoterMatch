import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

// or change it to axios request

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state  = {
      username: '',
      password: ''
      // firstName: '',
      // lastName: '',
      // middleInitial: '',
      // dob: '',
      // politicalInterest: ''    // to be handled
    };
    this.handleUser = this.handleUser.bind(this);
    this.handlePass = this.handlePass.bind(this);
    // this.handleFirstName = this.handleFirstName.bind(this);
    // this.handleLastName = this.handleLastName.bind(this);
    // this.handleMiddleInitial = this.handleMiddleInitial.bind(this);
    // this.handleDob = this.handleDob.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUser(e) {
    this.setState({username: e.target.value});
  }

  handlePass(e) {
    this.setState({password: e.target.value});
  }

  // handleFirstName(e) {
  //   this.setState({firstName: e.target.value});
  // }
  // 
  // handleLastName(e) {
  //   this.setState({lastName: e.target.value});
  // }
  // 
  // handleMiddleInitial(e) {
  //   this.setState({middleInitial: e.target.value});
  // }
  // 
  // handleDob(e) {
  //   this.setState({dob: e.target.value});
  // }

  handleSubmit() {
    var self = this;
    console.log("THIS IS OUR STATE: ", this.state);
    axios.post('http://localhost:3000/register', {
      username: this.state.username,
      password: this.state.password
      // firstName: this.state.firstName,
      // lastName: this.state.lastName,
      // middleInitial: this.state.middleInitial,
      // dob: this.state.dob,
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
    return(
      <div className="loginContainer">
        <Card className="card">
          <CardMedia
            className="icon"
            mediaStyle={{width: "150px", height: "150px"}}
          >
            <img src='img/tuesdayStrategies.jpg' />
          </CardMedia>
          <CardTitle
            titleStyle={{textAlign: 'center'}}
            subtitleStyle={{textAlign: 'center'}}
            title="Volunteer to help elect Karen" subtitle="Your effort matters"/>
          <CardText>
            <TextField
              floatingLabelText="Username"
              type="text"
              style={{'boxShadow': 'none'}}
              value={this.state.username}
              onChange={(event) => this.handleUser(event)}
            />
            <br></br>
            <TextField
              floatingLabelText="Password"
              type="password"
              style={{'boxShadow': 'none'}}
              value={this.state.password}
              onChange={(event) => this.handlePass(event)}
            />
            <br></br>
            <Checkbox
              checkedIcon={<ActionFavorite />}
              uncheckedIcon={<ActionFavoriteBorder />}
              label="Become a WiFi-seller"
              style={{marginBottom: '10px', marginTop: '20px'}}
              onCheck={() => this.setState({ isSeller: true })}
            />
          </CardText>
          <CardActions>
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
