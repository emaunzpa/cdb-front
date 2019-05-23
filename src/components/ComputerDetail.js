import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';


class ComputerDetail extends Component {
  state = {
    computer : this.props.computer
  };

	render() {

    const open = false;
		return (
        <TableRow key={this.state.computer.id} >
              <TableCell>{ this.state.computer.name }</TableCell>
              <TableCell>{ this.state.computer.introduced }</TableCell>
              <TableCell>{ this.state.computer.discontinued }</TableCell>
              <TableCell>{this.state.computer.company.name }</TableCell>
              <TableCell><DeleteIcon onClick={() => this.props.deleteById(this.state.computer.id)}></DeleteIcon></TableCell>
      </TableRow>
        
		)
  }
}


export default ComputerDetail;