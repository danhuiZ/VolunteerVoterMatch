import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as colors from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';

class Volunteer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const contentStyle = {margin: '0 16px'};
    console.log('rendering volunteer view');
    return(
      <div>
        <div className="volunteer">
          <AppBar
            className = "appbars"
            title="The Tuesday Company"
            style={{width: '100%'}}
          />


          <small style={{alignSelf: 'center', marginTop: '20px', marginBottom: '20px'}}>2017 The Tuesday Company</small>
        </div>
      </div>
    );
  }
}




export default Volunteer;
