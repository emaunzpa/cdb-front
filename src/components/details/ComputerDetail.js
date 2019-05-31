import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import EditIcon from '@material-ui/icons/Edit';
import Button from "@material-ui/core/Button";
import ComputerService from '../../services/ComputerService';
import CompanyService from '../../services/CompanyService';
import Company from '../../models/Company';
import userService from '../../services/UserService'
import I18n from '../../config/i18n';

class ComputerDetail extends Component {
  state = {
    computer: this.props.computer,
    newName: this.props.computer.name,
    editMode: false,
    defaultCompanyID: 0,
  };

  keyHandler = (event) => {
    if (event.key === 'Enter' && this.state.editMode) {
      this.toggleEditMode();
    }
  }

  toggleEditMode = () => {
    if (this.state.newName.trim() !== "") {
      this.setState({ editMode: !this.state.editMode });
    }
    if (this.state.editMode) {
      this.update();
    }
  }

  updateName = (event) => {
    let name = event.target.value;
    let computer = this.state.computer;
    try {
      computer.name = name.trim();
      this.setState({ newName: name, computer: computer });
    } catch (error) {
      this.setState({ newName: name });
    }
  };

  updateIntroduced = (event) => {
    let computer = this.state.computer;
    try {
      computer.introduced = event.target.value;
    } catch (err) {
      console.log(err)
      this.props.snackbar("fail", <I18n t={err.message} />);
    }
    this.setState({ computer: computer })
  };

  updateDiscontinued = (event) => {
    let computer = this.state.computer;
    try {
      computer.discontinued = event.target.value;
    } catch (err) {
      console.log(err)
      this.props.snackbar("fail", <I18n t={err.message} />);
    }
    this.setState({ computer: computer })
  };

  updateCompany = (event) => {
    let newId = event.target.value;
    let computer = this.state.computer;
    computer.company = newId === 0 ? new Company({ id: "", name: "" }) : this.state.companies.find(obj => obj.id === newId);
    this.setState({ computer: computer })
  };

  update = async () => {
    if (this.state.newName.trim() === "") {
      this.props.snackbar("fail", <I18n t="nameEmpty" />);
      return;
    }
    let isSuccess = await ComputerService.edit(this.state.computer)
      .catch(err => console.log(err));
    isSuccess ? this.props.snackbar("success", <I18n t="successMessageEdit" />) : this.props.snackbar("fail", <I18n t="successMessageNoEdit" />);
  }

  async componentWillMount() {
    var companyList = await CompanyService.getAll();
    companyList.splice(0, 0, new Company({ id: 0, name: <I18n t="noCompany" /> }))
    this.setState({ companies: companyList })
  }

  render() {
    return (
      <TableRow key={this.state.computer.id}>
        <TableCell>
          {this.state.editMode ? <TextField
            autoFocus
            id="nameInput"
            value={this.state.newName}
            onChange={this.updateName}
            onKeyPress={this.keyHandler}
            margin="dense"
            fullWidth
          /> : this.state.newName}
        </TableCell>
        <TableCell>
          {this.state.editMode ? <TextField
            autoFocus
            id="introducedInput"
            type="date"
            value={this.state.computer.introduced ? this.state.computer.introduced : ""}
            onChange={this.updateIntroduced}
            onKeyPress={this.keyHandler}
            margin="dense"
            fullWidth
          /> : this.state.computer.introduced}
        </TableCell>
        <TableCell>
          {this.state.editMode ? <TextField
            autoFocus
            id="discontinuedInput"
            type="date"
            value={this.state.computer.discontinued ? this.state.computer.discontinued : ""}
            onChange={this.updateDiscontinued}
            onKeyPress={this.keyHandler}
            margin="dense"
            fullWidth
          /> : this.state.computer.discontinued}
        </TableCell>
        <TableCell>
          {this.state.editMode ? <TextField
            id="companyId"
            select
            label={<I18n t="company" />}
            className="textField"
            onKeyPress={this.keyHandler}
            value={this.state.computer.company && this.state.computer.company.id ? this.state.computer.company.id : this.state.defaultCompanyID}
            onChange={this.updateCompany}
            margin="normal" variant="outlined"
          >
            {this.state.companies.map(option => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>))
            }
          </TextField> : this.state.computer.company ? this.state.computer.company.name : ""}</TableCell>
        {
          userService.isAdmin() &&
          <TableCell>{
            userService.isAdmin() &&
            <Button><DeleteIcon onClick={() => this.props.deleteById(this.state.computer.id)}></DeleteIcon></Button>
          }
            {
              userService.isAdmin() &&
              <Button onClick={this.toggleEditMode}><EditIcon /></Button>
            }
          </TableCell>
        }
      </TableRow>

    )
  }
}

export default ComputerDetail;