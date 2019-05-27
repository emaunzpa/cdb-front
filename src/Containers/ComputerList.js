import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
import I18n from '../config/i18n';
import Snackbar from '@material-ui/core/Snackbar';
import './computerList.css';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';

class ComputerList extends Component {

  addComputer = React.createRef();

  state = {
    page: 1,
    computers: [],
    search: "",
    open: false,
    defaultCompanyID: 0,
    companies: [],
    computer: new Computer({ name: "", introduced: "", discontinued: "", companyId: "", companyName: "" }),
    validField: { computerName: false, introduced: true, discontinued: true, companyId: true },
    company: new Company({ id: "", name: "" }),
    snackbar: false
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
      this.state.computer.name = event.target.value;
      this.setState({ ...this.state, validField: { ...this.state.validField, computerName: true } });
    } catch (err) {
      console.log(err);
      this.setState({ ...this.state, validField: { ...this.state.validField, computerName: false } });
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
      this.state.computer.introduced = new Date(event.target.value);
      this.setState({ ...this.state, validField: { ...this.state.validField, introduced: true } });
    } catch (err) {
      console.log(err);
      this.setState({ ...this.state, validField: { ...this.state.validField, introduced: false } });
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
      this.state.computer.discontinued = new Date(event.target.value);
      this.setState({ ...this.state, validField: { ...this.state.validField, discontinued: true } });
    } catch (err) {
      console.log(err);
      this.setState({ ...this.state, validField: { ...this.state.validField, discontinued: false } });
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
      this.state.company = this.state.companies.find(obj => obj.id === event.target.value);
      this.state.defaultCompanyID = this.state.company.id;
      this.setState({ ...this.state, validField: { ...this.state.validField, companyId: true } });
    } catch (err) {
      console.log(err);
      this.setState({ ...this.state, validField: { ...this.state.validField, companyId: false } });
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
      computerService.create(computer)
        .then(this.handleOpen)
        .then(this.handleSnack({ vertical: 'bottom', horizontal: 'right' }))
        .catch(err => console.log(err))
    }
  }

  async componentWillMount() {
    var companyList = await companyService.getAll();
    companyList.splice(0, 0, new Company({ id: 0, name: <I18n t="chooseCompany" /> }));
    this.setState({ companies: companyList });
  }

  updateComputer = async (options) => {
    this.setState({
      page: options.page,
      itemPerPage:options.itemPerPage,
      search: options.search,
      computers: await computerService.list(options)
        .catch(err => console.log(err)),
      size: await computerService.count(options.search)
        .catch(err => console.log(err))

    })
    this.forceUpdate();
  }

  componentDidMount() {
    let options = {
      page: 1,
      itemPerPage: this.props.itemPerPage || 10,
      search: this.props.search || ""
    }
    this.updateComputer(options)
  }

  orderBy = async (column) => {
    this.setState({ orderBy: column });
    let options = {
      page: 1,
      itemPerPage: 10,
      orderBy: column,
      search: this.state.search || ""
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
      search: this.state.search || ""
    }
    this.updateComputer(options)
  }

  keyHandler = (event) => {
    if (event.key === 'Enter') {
      this.searchByName(this.state.search || "");
    }
  }

  deleteById = async (idToDelete) => {
    let isSuccess = await computerService.delete(idToDelete)
      .catch(err => console.log(err));
    this.updateComputer(this.state.options);
  }

  handleOpen = () => {
    this.setState({ ...this.state, open: !this.state.open })
  }

  submitNewComputer = () => {
    this.addComputer.addNewComputer();
  }

  handleSnack = () => {
    this.setState({ ...this.state, snackbar: !this.state.snackbar })
  };

  render() {
    return (
      <div>
        <div>
          <Button onClick={this.handleOpen}>
            <AddCircle fontSize="large" /><I18n t="addNewComputer" />
          </Button>

          <Dialog fullWidth={"sm"} open={this.state.open} onClose={this.handleOpen} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title"><I18n t="addNewComputer" /></DialogTitle>
            <DialogContent>
              <div className="container">

                <TextField
                  id="computerName"
                  label={<I18n t="computerName" />}
                  className="textField"
                  onChange={this.handleChangeComputerName}
                  margin="normal"
                />
                {
                  this.state.validField.computerName ?
                    <span id="computerNameValidator" className="spanValidator valid"></span> :
                    <span id="computerNameValidator" className="spanValidator invalid">{<I18n t="required" />}</span>
                }
                <TextField
                  id="introducedDate"
                  label={<I18n t="introducedDate" />}
                  type="date"
                  onChange={this.handleChangeIntroduced}
                  className="textField"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                {
                  this.state.validField.introduced ?
                    <span id="introducedDateValidator" className="spanValidator valid"></span> :
                    <span id="introducedDateValidator" className="spanValidator invalid">{<I18n t="invalidDates" />}</span>
                }

                <TextField
                  id="discontinuedDate"
                  label={<I18n t="discontinuedDate" />}
                  type="date"
                  onChange={this.handleChangeDiscontinued}
                  className="textField"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                {
                  this.state.validField.discontinued ?
                    <span id="discontinuedDateValidator" className="spanValidator valid"></span> :
                    <span id="discontinuedDateValidator" className="spanValidator invalid">{<I18n t="invalidDates" />}</span>
                }

                <TextField
                  id="companyId"
                  select
                  label={<I18n t="company" />}
                  className="textField"
                  value={this.state.defaultCompanyID}
                  onChange={this.handleChangeCompany}
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
                {<I18n t="add" />}
              </button>
            </DialogActions>
          </Dialog>
          <Snackbar
            bodyStyle={{ backgroundColor: 'green', color: 'coral' }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            key={`${'bottom'},${'right'}`}
            open={this.state.snackbar}
            onClose={this.handleSnack}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            autoHideDuration={2000}
            message={<span id="message-id">I love snacks</span>}
          >
            <SnackbarContent
              className="snackbar-success"
              aria-describedby="client-snackbar"
              message={
                <span id="client-snackbar" className="snackbarMessage">
                  <CheckCircleIcon className="snackbarIcon"/>
                  <I18n t="snackbarSuccessMessage" />
                </span>
              }
              action={[
                <IconButton key="close" aria-label="Close" color="inherit" onClick={this.handleSnack}>
                  <CloseIcon/>
                </IconButton>,
              ]}
            />
          </Snackbar>
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

        <Pagination options={{ page: this.state.page, itemPerPage: this.state.itemPerPage }} otherOptions={{ orderBy: this.state.orderBy, search: this.state.search }} size={this.state.size} update={(options) => this.updateComputer(options)}/>
      </div>
    )

  }
}
export default ComputerList;