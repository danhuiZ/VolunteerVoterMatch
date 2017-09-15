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
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

class Volunteer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      voters: []
    };
  }

  matchvoters() {
    console.log("Volunteer Name", this.props.location.state.name);
    axios.post('http://localhost:3000/matchVoters', {
      volunteer: this.props.location.state.name,
      id: this.props.location.state.id
    })
    .then(function({ data }) {
      console.log('Data from matching voters: ', data);
      if(data.success) {
        // alert('Successfully uploaded!')
      } else {
        // alert('Failed to upload voter data');
      }
    });  
  }
  
  goback() {
    this.props.history.push({
      pathname: '/'
    });
  }

  render() {
    const contentStyle = {margin: '0 16px'};
    console.log('rendering volunteer view');
    return(
      <div>
        <div className="volunteer">
          <AppBar
            className = "appbars"
            title="Voters Assigned to Contact"
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
              <TableRow>
                <TableHeaderColumn>Voter Name</TableHeaderColumn>
                <TableHeaderColumn>Age</TableHeaderColumn>
                <TableHeaderColumn>Location</TableHeaderColumn>
                <TableHeaderColumn>Phone Number</TableHeaderColumn>
                <TableHeaderColumn>Date Last Contacted</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              stripedRows={false}
              showRowHover={true}
              >
              {this.state.voters.length===0 ? 
              <RaisedButton 
                label="No voters assigned yet. Match yourself with voters to contact now!" 
                style={{margin:'10px'}} fullWidth={true}
                onTouchTap={() => this.matchvoters()} 
              />
              :
              this.state.voters.map( (row, index) => (
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

          <small style={{alignSelf: 'center', marginTop: '20px', marginBottom: '20px'}}>2017 The Tuesday Company</small>
        </div>
      </div>
    );
  }
}




export default Volunteer;
