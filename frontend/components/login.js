import React from 'react';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state  = {
      username: '',
      password: '',
      status: ''
    };

  }

  handleUser(e) {
    this.setState({username: e.target.value});
  }

  handlePass(e) {
    this.setState({password: e.target.value});
  }

  handleSubmit() {
    var self = this;
    axios.post('http://localhost:3000/login', {
      username: this.state.username,
      password: this.state.password
    })
    .then(function({ data }) {
      console.log('This log should contain the data', data);
      if(data.success) {
        self.props.history.push({
          pathname: '/volunteer',
          state: { name: data.volunteer.username, id: data.volunteer._id }
        });
      } else {
        self.setState({status: 'There was a problem with logging in!'});
      }
    });
  }

  handleAdmin() {
    var self = this;
    axios.post('http://localhost:3000/adminlogin', {
      username: this.state.username,
      password: this.state.password
    })
    .then(function({ data }) {
      console.log('This log should contain the data for login as admin', data);
      if(data.success) {
        self.props.history.push({
          pathname: '/admin'
        });
      } else {
        self.setState({status: 'There was a problem with logging in!'});
      }
    });  
  }

  render() {
    const style = {
      marginLeft: 20
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
            title="The Choice is Clear" subtitle="Let's make a difference!"/>
          <CardText>
            <p style={{color: 'red'}}>{this.state.status}</p>
          </CardText>
          <CardActions>
            <Paper zDepth={1} style={{ margin: "20px", padding: "10px" }}>
              <TextField hintText="Username" type="text" value={this.state.username} onChange={(e) => this.handleUser(e)} style={style} underlineShow={false} />
              <Divider />
              <TextField hintText="Password" type="password" value={this.state.password} onChange={(e) => this.handlePass(e)} style={style} underlineShow={false} />
              <Divider />
            </Paper>
            <RaisedButton
              label="New user"
              containerElement={<Link to='/register'></Link>}
            />
            <RaisedButton
              label="Login"
              primary={true}
              onTouchTap={() => this.handleSubmit()}
            />
            <RaisedButton
              label="Login as admin"
              onTouchTap={() => this.handleAdmin()}
            />
          </CardActions>
        </Card>

        <small style={{alignSelf: 'center', marginBottom: '20px'}}>2017 The Tuesday Company</small>
      </div>
    );
  }

}

export default Login;
