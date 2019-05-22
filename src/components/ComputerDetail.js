import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';


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