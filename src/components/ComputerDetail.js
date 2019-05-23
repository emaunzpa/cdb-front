import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import EditIcon from '@material-ui/icons/Edit';
import Button from "@material-ui/core/Button";
import ComputerService from '../services/ComputerService';



class ComputerDetail extends Component {
  state = {
    computer : this.props.computer,
    editMode : false
  };

  toggleEditMode = () => {
    console.log(this.state.computer)
    this.setState({editMode: !this.state.editMode});
    if(this.state.editMode){
      this.update();
    }
  }

  updateName = (event) => {
    this.state.computer.name = event.target.value
    this.setState({computer: this.state.computer})
  };

  updateIntroduced = (event) => {
    this.state.computer.introduced = event.target.value
    console.log(this.state.computer.introduced)
    this.setState({computer: this.state.computer})
  };

  updateDiscontinued = (event) => {
    this.state.computer.discontinued = event.target.value
    this.setState({computer: this.state.computer})
  };

  update = async () => {
    let isSuccess = await ComputerService.edit(this.state.computer)
    .catch(err => console.log(err));
    console.log(isSuccess ? "Success" : "Fail");
  }

	render() {
		return (
      <TableRow key={this.state.computer.id}>
      <TableCell>
            <Checkbox/>
            <Button onClick={this.toggleEditMode}><EditIcon/></Button>
            </TableCell>
            <TableCell>{ this.state.editMode ? <input onChange={this.updateName} value={this.state.computer.name ? this.state.computer.name : ""}/> : this.state.computer.name }</TableCell>
            <TableCell>{ this.state.editMode ? <input type="date" onChange={this.updateIntroduced} value={this.state.computer.introduced ? this.state.computer.introduced:""}/> : this.state.computer.introduced }</TableCell>
            <TableCell>{ this.state.editMode ? <input type="date" onChange={this.updateDiscontinued} value={this.state.computer.discontinued ? this.state.computer.discontinued:""}/> : this.state.computer.discontinued }</TableCell>
            <TableCell>{ this.state.editMode ? <label>ici company list</label> : this.state.computer.company ? this.state.computer.company.name : "" }</TableCell>
      </TableRow>
		)
  }
}


export default ComputerDetail;