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
      voters: this.props.location.state.voters    // passed in from login or register props
    };
  }

  matchvoters() {
    var self = this;
    console.log("Volunteer Name", this.props.location.state.name);
    axios.post('http://localhost:3000/matchVoters', {
      volunteer: this.props.location.state.name,
      id: this.props.location.state.id    // volunteer id passed from login or register props
    })
    .then(function({ data }) {
      console.log('Data from matching voters, data: ', data);
      if(data.success) {
        self.setState({voters: [...data.votersMatched]})
      } else {
        alert('Failed to match with voters')
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
    console.log('rendering volunteer view, voter state: ', this.state.voters, this.props.location);
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

          <small style={{alignSelf: 'center', marginTop: '40px', marginBottom: '20px'}}>2017 The Tuesday Company</small>
        </div>
      </div>
    );
  }
}




export default Volunteer;
