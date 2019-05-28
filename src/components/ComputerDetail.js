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
import I18n from '../config/i18n';

class ComputerDetail extends Component {
  state = {
    computer : this.props.computer,
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
    let computer = this.state.computer;
    computer.name = event.target.value
    this.setState({computer: computer})
  };

  updateIntroduced = (event) => {
    let computer = this.state.computer;
    computer.introduced = event.target.value ? new Date(event.target.value) : "";
    this.setState({computer: computer})
  };

  updateDiscontinued = (event) => {
    let computer = this.state.computer;
    computer.discontinued = event.target.value ? new Date(event.target.value) : "";
    this.setState({computer: computer})
  };

  updateCompany = (event) => {
    let computer = this.state.computer;
    computer.company = this.state.companies.find(obj => obj.id === event.target.value);
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

	render() {

		return (
      <TableRow key={this.state.computer.id}>
        <TableCell>
          { this.state.editMode ? 
             <TextField
             id="name"
             label={<I18n t="name" />}
             type="text"
             onChange={this.updateName}
             className="textField"
             value={this.state.computer.name ? this.state.computer.name :  ""}
             InputLabelProps={{
               shrink: true,
             }} />
             : this.state.computer.name ? this.state.computer.name :  ""}
        </TableCell>
        <TableCell>
          { this.state.editMode ? 
            <TextField
                  id="introducedDate"
                  label={<I18n t="introducedDate" />}
                  type="date"
                  onChange={this.updateIntroduced}
                  className="textField"
                  value={this.state.computer.introduced ? (typeof this.state.computer.introduced === "string" ? this.state.computer.introduced : this.state.computer.introduced.toISOString().split("T")[0]) : ""}
                  InputLabelProps={{
                    shrink: true,
                  }}
                /> 
            : this.state.computer.introduced ? (typeof this.state.computer.introduced === "string" ? this.state.computer.introduced : this.state.computer.introduced.toISOString().split("T")[0]) : "" }
      </TableCell>
       <TableCell>
          { this.state.editMode ? 
            <TextField
                  id="discontinuedDate"
                  label={<I18n t="discontinuedDate" />}
                  type="date"
                  onChange={this.updateDiscontinued}
                  className="textField"
                  value={this.state.computer.discontinued ? (typeof this.state.computer.discontinued === "string" ? this.state.computer.discontinued : this.state.computer.discontinued.toISOString().split("T")[0]) : ""}
                  InputLabelProps={{
                    shrink: true,
                  }}
                /> 
            : this.state.computer.discontinued ? (typeof this.state.computer.discontinued === "string" ? this.state.computer.discontinued : this.state.computer.discontinued.toISOString().split("T")[0]) : "" }
        </TableCell>
        <TableCell>
          { this.state.editMode ? 
            <TextField 
              id="companyId" select label="Company" className="textField" onKeyPress={this.keyHandler}
              value={this.state.computer.company.id ? this.state.computer.company.id : ""} onChange={this.updateCompany}
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