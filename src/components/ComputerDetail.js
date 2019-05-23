import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';


class ComputerDetail extends Component {
  state = {
    computer : this.props.computer
  };

	render() {
		return (
      <TableRow key={this.state.computer.id} >
      <TableCell>
            <Checkbox/>
            </TableCell>
            <TableCell>{ this.state.computer.name }</TableCell>
            <TableCell>{ this.state.computer.introduced }</TableCell>
            <TableCell>{ this.state.computer.discontinued }</TableCell>
            <TableCell>{this.state.computer.company.name }</TableCell>
      </TableRow>
		)
  }
}


export default ComputerDetail;