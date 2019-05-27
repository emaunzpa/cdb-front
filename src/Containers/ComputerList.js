import React, { Component } from 'react';
import computerService from '../services/ComputerService';
import ComputerDetail from '../components/ComputerDetail';
import userService from '../services/UserService';
import Pagination from '../components/pagination';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import AddCircle from '@material-ui/icons/AddCircle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Company from "../models/Company";
import Computer from "../models/Computer";
import companyService from '../services/CompanyService';
import MenuItem from '@material-ui/core/MenuItem';
import './computerList.css';

class ComputerList extends Component {

  addComputer = React.createRef();

  state = {
    computers: [],
    options: Pagination,
    search: "",
    open: false,
    defaultCompanyID: 0,
    companies: [],
    computer: new Computer({ name: "", introduced: "", discontinued: "", companyId: "", companyName: "" }),
    validField: { computerName: false, introduced: true, discontinued: true, companyId: true },
    company: new Company({ id: "", name: "" }),
  };

  checkValidField = () => {
    Object.keys(this.state.validField).map(function (key) {
      var field = this.state.validField[key];
      if (field === false) {
        return false;
      }
      return true;
    });
  };

  handleChangeComputerName = (event) => {
    try {
      this.setState({ ...this.state, computer: { ...this.state.computer, name: event.target.value}})
      this.setState({ ...this.state, validField: { ...this.state.validField, computerName: true } });
    } catch (err) {
      console.log(err);
      this.setState({ ...this.state, validField: { ...this.state.validField, computerName: false } });
    } finally {
      this.forceUpdate();
    }

    if (this.checkValidField) {
      document.getElementById("submitBtn").disabled = false;
    }
    else {
      document.getElementById("submitBtn").disabled = true;
    }
  };

  handleChangeIntroduced = (event) => {
    try {
      this.setState({ ...this.state, computer: { ...this.state.computer, introduced: new Date(event.target.value)}})
      this.setState({ ...this.state, validField: { ...this.state.validField, introduced: true } });
    } catch (err) {
      console.log(err);
      this.setState({ ...this.state, validField: { ...this.state.validField, introduced: false } });
    } finally {
      this.forceUpdate();
    }

    if (this.checkValidField) {
      document.getElementById("submitBtn").disabled = false;
    }
    else {
      document.getElementById("submitBtn").disabled = true;
    }
  };

  handleChangeDiscontinued = (event) => {
    try {
      this.setState({ ...this.state, computer: { ...this.state.computer, discontinued: new Date(event.target.value)}})
      this.setState({ ...this.state, validField: { ...this.state.validField, discontinued: true } });
    } catch (err) {
      console.log(err);
      this.setState({ ...this.state, validField: { ...this.state.validField, discontinued: false } });
    } finally {
      this.forceUpdate();
    }

    if (this.checkValidField) {
      document.getElementById("submitBtn").disabled = false;
    }
    else {
      document.getElementById("submitBtn").disabled = true;
    }
  };

  handleChangeCompany = (event) => {
    try {
      this.setState({ ...this.state, company: this.state.companies.find(obj => obj.id === event.target.value)})
      this.setState({ ...this.state, defaultCompanyID: this.state.company.id})
      this.setState({ ...this.state, validField: { ...this.state.validField, companyId: true } });
    } catch (err) {
      console.log(err);
      this.setState({ ...this.state, validField: { ...this.state.validField, companyId: false } });
    } finally {
      this.forceUpdate();
    }
    
    if (this.checkValidField) {
      document.getElementById("submitBtn").disabled = false;
    }
    else {
      document.getElementById("submitBtn").disabled = true;
    }
  };

  addNewComputer = () => {
    if (this.state.validField.computerName || this.state.validField.introduced
      || this.state.validField.discontinued || this.state.validField.companyId) {

      var computer = new Computer({
        name: this.state.computer.name,
        introduced: this.state.computer.introduced,
        discontinued: this.state.computer.discontinued,
        companyId: this.state.company.id,
        companyName: this.state.company.name
      })
      console.log(computer);
      // computerService.create(computer)
      //     .then(this.props.history.push("/"))
      //     .catch(err => console.log(err))
    }
  }

  async componentWillMount() {
    var companyList = await companyService.getAll();
    companyList.splice(0, 0, new Company({ id: 0, name: "Choose a company" }))
    this.setState({ companies: companyList })
  }

  updateComputer = async (options) => {
      this.setState({
        computers: await computerService.list(options)
          .catch(err => console.log(err)),
        size: await computerService.count()
          .catch(err => console.log(err))

      })
    this.forceUpdate();
  }

  componentDidMount() {
    let options = {
      page: 1,
      itemPerPage: 10
    }
    this.updateComputer(options)
  }

  orderBy = async (column) => {
    this.setState({ orderBy: column });
    let options = {
      page: 1,
      itemPerPage: 10,
      orderBy: column
    }
    this.updateComputer(options)
  }

  handleChange = (event) => {
    this.setState({ search: event.target.value });
  };

  searchByName = async () => {
    this.setState({ search: this.state.search });
    let options = {
      page: 1,
      itemPerPage: 10,
      search: this.state.search
    }
    this.updateComputer(options)
  }

    keyHandler = (event) => {
        if(event.key === 'Enter'){
            this.searchByName(this.state.search || "");
        }
    }

  deleteById = async (idToDelete) => {
    console.log(idToDelete)
    let isSuccess = await computerService.delete(idToDelete)
      .catch(err => console.log(err));
    this.updateComputer(this.state.options);
  }

  handleOpen = () => {
    this.setState({ ...this.state, open: !this.state.open })
  }

  submitNewComputer = () => {
    console.log(this.addComputer)
    this.addComputer.addNewComputer();
  }

  render() {
    console.log(this.refs.addComputer)
    return (
      <div>
        <div>
          <Button onClick={this.handleOpen}>
            <AddCircle fontSize="large" />Create a new computer
          </Button>

          <Dialog fullWidth={"sm"} open={this.state.open} onClose={this.handleOpen} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add a new computer</DialogTitle>
            <DialogContent>
              <div className="container">

                <TextField
                  id="computerName"
                  label="Computer name"
                  className="textField"
                  onChange={this.handleChangeComputerName}
                  margin="normal"
                />
                {
                  this.state.validField.computerName ?
                    <span id="computerNameValidator" className="spanValidator valid">OK !</span> :
                    <span id="computerNameValidator" className="spanValidator invalid">This field is required</span>
                }
                <TextField
                  id="introducedDate"
                  label="Introduced date"
                  type="date"
                  onChange={this.handleChangeIntroduced}
                  className="textField"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                {
                  this.state.validField.introduced ?
                    <span id="introducedDateValidator" className="spanValidator valid">OK !</span> :
                    <span id="introducedDateValidator" className="spanValidator invalid">Invalid on unconsistend date</span>
                }

                <TextField
                  id="discontinuedDate"
                  label="Discontinued date"
                  type="date"
                  onChange={this.handleChangeDiscontinued}
                  className="textField"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                {
                  this.state.validField.discontinued ?
                    <span id="discontinuedDateValidator" className="spanValidator valid">OK !</span> :
                    <span id="discontinuedDateValidator" className="spanValidator invalid">Invalid on unconsistend date</span>
                }

                <TextField
                  id="companyId"
                  select
                  label="Company"
                  className="textField"
                  value={this.state.defaultCompanyID}
                  onChange={this.handleChangeCompany}
                  helperText="Please select the company"
                  margin="normal"
                  variant="outlined"
                >
                  {this.state.companies.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </DialogContent>
            <DialogActions>
              <button id="submitBtn" className="button" onClick={this.addNewComputer}>
                Create computer
                            </button>
            </DialogActions>
          </Dialog>

          <TextField
            id="standard-search"
            label="Search"
            type="search"
            margin="normal"
            onKeyPress={this.keyHandler}
            onChange={this.handleChange}
          />
          <Button onClick={() => this.searchByName(this.state.search)}>Search</Button>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Tooltip title="Sort" enterDelay={300}>
                  <TableSortLabel onClick={() => this.orderBy("name")}>Name</TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell >
                <Tooltip title="Sort" enterDelay={300}>
                  <TableSortLabel onClick={() => this.orderBy("introduced")}>Introduced</TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title="Sort" enterDelay={300}>
                  <TableSortLabel onClick={() => this.orderBy("discontinued")}>Discontinued</TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              this.state.computers.map(computer =>
                <ComputerDetail key={computer.id} deleteById={this.deleteById} computer={computer} />
              )
            }
          </TableBody>
        </Table>

        <Pagination options={{ page: this.props.page, itemPerPage: this.props.itemPerPage }} otherOptions={{ orderBy: this.state.orderBy, search: this.state.search }} size={this.state.size} update={(options) => this.updateComputer(options)}></Pagination>
      </div>
    )

  }
}


export default ComputerList;