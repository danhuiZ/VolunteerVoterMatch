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
            title="Voters Assigned to Contact"
            style={{width: '100%'}}
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
                <TableHeaderColumn>Name</TableHeaderColumn>
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
              <TableRow>
                <TableRowColumn>John Smith</TableRowColumn>
                <TableRowColumn>28</TableRowColumn>
                <TableRowColumn>Ishpeming, MI</TableRowColumn>
                <TableRowColumn>3482901902</TableRowColumn>
                <TableRowColumn>2017/8/19</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>John Smith</TableRowColumn>
                <TableRowColumn>28</TableRowColumn>
                <TableRowColumn>Ishpeming, MI</TableRowColumn>
                <TableRowColumn>3482901902</TableRowColumn>
                <TableRowColumn>2017/8/19</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>John Smith</TableRowColumn>
                <TableRowColumn>28</TableRowColumn>
                <TableRowColumn>Ishpeming, MI</TableRowColumn>
                <TableRowColumn>3482901902</TableRowColumn>
                <TableRowColumn>2017/8/19</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>

          <small style={{alignSelf: 'center', marginTop: '20px', marginBottom: '20px'}}>2017 The Tuesday Company</small>
        </div>
      </div>
    );
  }
}




export default Volunteer;
