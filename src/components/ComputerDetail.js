import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import EditIcon from '@material-ui/icons/Edit';
import Button from "@material-ui/core/Button";
import ComputerService from '../services/ComputerService';
import CompanyService from '../services/CompanyService';
import Company from '../models/Company';

class ComputerDetail extends Component {
  state = {
    computer : this.props.computer,
    newName : this.props.computer.name,
    editMode : false
  };

  keyHandler = (event) => {
    if(event.key === 'Enter' && this.state.editMode){
        this.toggleEditMode();
    }
  }

  toggleEditMode = () => {
    this.setState({editMode: !this.state.editMode});
    if(this.state.editMode){
      this.update();
    }
  }

  updateName = (event) => {
    let name = event.target.value;
    if(name.trim() !== "") {
      let computer = this.state.computer;
      computer.name = name.trim();
      this.setState({newName: name, computer : computer});

    }else {
      this.setState({snackbar: true, errEdit : "nameEmpty"});
    }
  };

  updateIntroduced = (event) => {
    let computer  = this.state.computer;
    try {
      computer.introduced = event.target.value;
    } catch (error) {
      
    } 
    this.setState({computer: computer})
  };

  updateDiscontinued = (event) => {
    let computer = this.state.computer;
    try {
      computer.discontinued = event.target.value;
    } catch (error) {
        
    }
    this.setState({computer: computer})
  };

  updateCompany = (event) => {
    let newId = event.target.value;
    let computer = this.state.computer;
    computer.company = newId === 0 ? new Company({id:"", name:""}) : this.state.companies.find(obj => obj.id === newId);
    this.setState({computer: computer})
  };

  update = async () => {
    let isSuccess = await ComputerService.edit(this.state.computer)
    .catch(err => console.log(err));
    console.log(isSuccess ? "Success" : "Fail");
  }

  async componentWillMount() {
    var companyList = await CompanyService.getAll();
    companyList.splice(0, 0, new Company({ id: 0, name: "Choose a company" }))
    this.setState({ companies: companyList })
  }

  handleSnack = () => {
    this.setState({ ...this.state, snackbar: !this.state.snackbar })
  };

	render() {
		return (
      <TableRow key={this.state.computer.id}>
        <TableCell>
          { this.state.editMode ? <TextField
                    autoFocus
                    id="nameInput"
                    value={this.state.newName}
                    onChange={this.updateName}
                    onKeyPress={this.keyHandler}
                    margin="dense"
                    fullWidth
                /> : this.state.computer.name }
        </TableCell>
        <TableCell>
          { this.state.editMode ? <TextField
                    autoFocus
                    id="introducedInput"
                    type="date"
                    value={this.state.computer.introduced ? this.state.computer.introduced : ""}
                    onChange={this.updateIntroduced}
                    onKeyPress={this.keyHandler}
                    margin="dense"
                    fullWidth
                />: this.state.computer.introduced }
        </TableCell>
        <TableCell>
          { this.state.editMode ? <TextField
                    autoFocus
                    id="discontinuedInput"
                    type="date"
                    value={this.state.computer.discontinued ? this.state.computer.discontinued : ""}
                    onChange={this.updateDiscontinued}
                    onKeyPress={this.keyHandler}
                    margin="dense"
                    fullWidth
                /> : this.state.computer.discontinued }
        </TableCell>
        <TableCell>{ this.state.editMode ? <TextField id="companyId" select label="Company" className="textField" onKeyPress={this.keyHandler}
                            value={this.state.computer.company && this.state.computer.company.id ? this.state.computer.company.id : ""} onChange={this.updateCompany}
                            helperText="Please select the company"  margin="normal" variant="outlined" >
                            {this.state.companies.map(option => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem> ))
                            }
                        </TextField> : this.state.computer.company ? this.state.computer.company.name : "" }</TableCell>
        <TableCell>
          <Button><DeleteIcon onClick={() => this.props.deleteById(this.state.computer.id)}></DeleteIcon></Button>
          <Button onClick={this.toggleEditMode}><EditIcon/></Button>
        </TableCell>
      </TableRow>
        
		)
  }
}

export default ComputerDetail;