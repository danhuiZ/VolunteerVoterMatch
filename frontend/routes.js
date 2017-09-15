import React from 'react';
import Login from './components/login.js';
import Register from './components/register.js';
import Volunteer from './components/volunteer.js';
import Admin from './components/admin.js';
import { Switch, Route } from 'react-router-dom';


class Routes extends React.Component {
  componentDidMount() {
    console.log('ROUTES MOUNTED');
  }
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/volunteer" component={Volunteer} />
        <Route exact path="/admin" component={Admin} />
      </Switch>
    );
  }
}

export default Routes;
