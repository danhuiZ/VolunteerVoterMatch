import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as colors from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import voters from '../voters.json';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      volunteers: []
    };
    
    this.toLocalDate = this.toLocalDate.bind(this);
  }

  uploadVoterData() {
    axios.post('http://localhost:3000/uploadvoters', {
      voters: voters,
    })
    .then(function({ data }) {
      console.log('Data from upload voters data: ', data);
      if(data.success) {
        alert('Successfully uploaded!')
      } else {
        alert('Failed to upload voter data');
      }
    });  
  }

  cleardb() {
    axios.post('http://localhost:3000/cleardb', {
      cleardb: true,
    })
    .then(function({ data }) {
      console.log('Data from clearing db: ', data);
      if(data.success) {
        alert('Database cleared!')
      } else {
        alert('Failed to clear voter database');
      }
    });  
  }
  
  loadVolunteers() {
    var self = this;
    axios.post('http://localhost:3000/loadVolunteers', {
      loadVolunteers: true,
    })
    .then(function({ data }) {
      console.log('Data from loading volunteers: ', data);
      if(!data.success) {
        self.setState({status: 'Failed to load volunteers!'})
      } else {
        self.setState({volunteers: [...data.volunteers]})
      }
    });  
  }

  loadVoters() {
    this.setState({volunteers: []})
  }
  
  toLocalDate(dateString) {
    var bday = new Date(dateString);
    return bday.toLocaleString().split(',')[0];
  }

  goback() {
    this.props.history.push({
      pathname: '/'
    });
  }

  render() {
    const contentStyle = {margin: '0 16px'};
    console.log('rendering admin view');
    console.log('current state', this.state);
    return(
      <div>
        <div className="volunteer">
          <AppBar
            className = "appbars"
            title={this.state.volunteers.length!==0 ? "Admin view: Volunteers" : "Admin view: Voters"}
            style={{width: '100%'}}
            iconElementLeft={<IconButton><NavigationClose /></IconButton>}
            onLeftIconButtonTouchTap={() => this.goback()}
          />

          <Table
            height={"500px"}
            multiSelectable={true}
            >
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
              >
                {this.state.volunteers.length!==0 ? 
                <TableRow>  
                  <TableHeaderColumn>Volunteer First Name</TableHeaderColumn>
                  <TableHeaderColumn>Last Name</TableHeaderColumn>
                  <TableHeaderColumn>Date of birth</TableHeaderColumn>
                  <TableHeaderColumn>Political Interest</TableHeaderColumn>
                </TableRow>
                :
                <TableRow>
                  <TableHeaderColumn>Voter Name</TableHeaderColumn>
                  <TableHeaderColumn>Age</TableHeaderColumn>
                  <TableHeaderColumn>Location</TableHeaderColumn>
                  <TableHeaderColumn>Phone Number</TableHeaderColumn>
                  <TableHeaderColumn>Date Last Contacted</TableHeaderColumn>
                </TableRow>
                }
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              stripedRows={false}
              showRowHover={true}
              >
                {this.state.volunteers.length!==0 ? 
                  this.state.volunteers.map( (row, index) => (
                    <TableRow key={index}>
                      <TableRowColumn>{row.firstName}</TableRowColumn>
                      <TableRowColumn>{row.lastName}</TableRowColumn>
                      <TableRowColumn>{this.toLocalDate(row.dob)}</TableRowColumn>
                      <TableRowColumn>{row.politicalInterest.join(', ')}</TableRowColumn>
                    </TableRow>
                  ))
                :
                voters.map( (row, index) => (
                  <TableRow key={index}>
                    <TableRowColumn>{row.name}</TableRowColumn>
                    <TableRowColumn>{row.age}</TableRowColumn>
                    <TableRowColumn>{row.location}</TableRowColumn>
                    <TableRowColumn>{row.phone}</TableRowColumn>
                    <TableRowColumn>{row.date}</TableRowColumn>
                  </TableRow>
                ))
                }

            </TableBody>
          </Table>
          <p style={{color: 'red'}}>{this.state.status ? this.stats.status : ''}</p>
          <RaisedButton 
            label="Clear existing voter data from database" 
            primary={true} style={{margin:'10px', width: '30%'}}
            onTouchTap={() => this.cleardb()} 
          />
          <RaisedButton 
            label="Load shown voter data into database" 
            primary={true} style={{margin:'10px', width: '30%'}}
            onTouchTap={() => this.uploadVoterData()} 
          />
          {this.state.volunteers.length!==0 ? 
            <RaisedButton 
              label="View all voters" 
              primary={true} style={{margin:'10px', width: '30%'}}
              onTouchTap={() => this.loadVoters()} 
            />
          : 
            <RaisedButton 
              label="View all volunteers" 
              primary={true} style={{margin:'10px', width: '30%'}}
              onTouchTap={() => this.loadVolunteers()} 
            />
          }
          <br></br>
          <small style={{alignSelf: 'center', marginTop: '20px', marginBottom: '20px', paddingTop: '20px'}}>2017 The Tuesday Company</small>
        </div>
      </div>
    );
  }
}




export default Admin;
