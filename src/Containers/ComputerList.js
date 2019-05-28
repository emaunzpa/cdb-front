import React, { Component } from 'react';
import computerService from '../services/ComputerService';
import ComputerDetail from '../components/ComputerDetail';
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
import SortByAlpha from '@material-ui/icons/SortByAlpha';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import MySnackbar from "../components/MySnackbar";

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
    snackbar: false,
    snackbardelete: false,
    reverse: false
  };

  checkValidField = () => {
    var fields = Object.values(this.state.validField);
    var result = true;
    fields.forEach(function (field) {
      if (field === false) {
        result = false;
      }
    });
    return result;
  };

  checkDates = (introduced, discontinued) => {
    if (introduced !== "" & discontinued !== "" & introduced > discontinued) {
      return false;
    }
    else {
      return true;
    }
  }

  finishUpdate = () => {
    document.getElementById('submitBtn').disabled = !this.checkValidField();
    document.getElementById("submitBtn").addEventListener("click", this.addNewComputer);
  }

  handleChangeComputerName = (event) => {
    var fieldName = true;
    if (event.target.value === "") {
      fieldName = false;
    }
    let computer = this.state.computer;
    computer.name = event.target.value;
    this.setState({ ...this.state, computer: computer, validField: { ...this.state.validField, computerName: fieldName } }, this.finishUpdate)
  };

  handleChangeIntroduced = (event) => {
    var fieldDate = true;
    this.checkDates(event.target.value, this.state.computer.discontinued)
    if (!this.checkDates(event.target.value, this.state.computer.discontinued)) {
      fieldDate = false;
    }
    let computer = this.state.computer;
    computer.introduced = new Date(event.target.value);
    this.setState({ ...this.state, computer: computer, validField: { ...this.state.validField, introduced: fieldDate } }, this.finishUpdate)
  };

  handleChangeDiscontinued = (event) => {
    var fieldDate = true;
    this.checkDates(event.target.value, this.state.computer.discontinued)
    if (!this.checkDates(this.state.computer.introduced, event.target.value)) {
      fieldDate = false;
    }
    let computer = this.state.computer;
    computer.discontinued = new Date(event.target.value);
    this.setState({ ...this.state, computer: computer, validField: { ...this.state.validField, discontinued: fieldDate } }, this.finishUpdate)
  };

  handleChangeCompany = (event) => {
    this.setState({ ...this.state, company: this.state.companies.find(obj => obj.id === event.target.value), defaultCompanyID: this.state.companies.find(obj => obj.id === event.target.value).id, validField: { ...this.state.validField, companyId: true } });
  }

  addNewComputer = async () => {
    if (this.checkValidField) {

      let computer = new Computer({
        name: this.state.computer.name,
        introduced: this.state.computer.introduced,
        discontinued: this.state.computer.discontinued,
        companyId: this.state.company.id,
        companyName: this.state.company.name
      });
      await computerService.create(computer)
        .catch(err => console.log(err));
      
      this.setState({...this.state, computer : new Computer({ name: "", introduced: "", discontinued: "", companyId: "", companyName: "" }), validField : { computerName: false, introduced: true, discontinued: true, companyId: true }});
      this.handleOpen();
      this.handleSnack({ vertical: 'bottom', horizontal: 'right' });
    }
  }

  async componentWillMount() {
    let companyList = await companyService.getAll();
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
    this.setState({ orderBy: column, reverse: !this.state.reverse });
    let options = {
      page: 1,
      itemPerPage: 10,
      orderBy: column,
      search: this.state.search || "",
      reverse: this.state.reverse || ""
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
    await computerService.delete(idToDelete)
    .then(this.handleSnackDelete())
      .catch(err => console.log(err));
      let options = {
      page: 1,
      itemPerPage: 10,
      search: this.state.search || ""
    }
    this.updateComputer(options);
  }

  handleOpen = () => {
    this.setState({ ...this.state, open: !this.state.open })
  }

  submitNewComputer = () => {
    this.addComputer.addNewComputer();
  }

  snackbar = () => {
    return this.state.snackbar;
  }

  handleSnack = () => {
    this.setState({ ...this.state, snackbar: !this.state.snackbar })
  };

  snackbarDelete = () => {
    return this.state.snackbarDelete;
  }

  handleSnackDelete = () => {
    this.setState({ ...this.state, snackbardelete: !this.state.snackbardelete })
  };

  render() {
    return (
      <div>
        <div>
          <Button onClick={this.handleOpen} className="textfield-align">
            <AddCircle fontSize="large" /><I18n t="addNewComputer" />
          </Button>
          <TextField
            id="standard-search"
            label="Search"
            type="search"
            margin="normal"
            onKeyPress={this.keyHandler}
            onChange={this.handleChange}
          />
          <Button onClick={() => this.searchByName(this.state.search)} className="textfield-align">Search</Button>
        </div>
        <Dialog fullWidth={true} open={this.state.open} onClose={this.handleOpen} aria-labelledby="form-dialog-title">
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
              <button id="submitBtn" onClick={this.addNewComputer} disabled>
                {<I18n t="add" />}
              </button>
            </DialogActions>
          </Dialog>
          <MySnackbar open={this.snackbar} close={this.handleSnack} variant="success" message={<I18n t="snackbarSuccessMessage" />} />
          <MySnackbar open={this.snackbarDelete} close={this.handleSnackDelete} variant="success" message={<I18n t="snackbarSuccessMessageDelete" />} />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Tooltip title="Sort" enterDelay={300}>
                  <TableSortLabel onClick={() => this.orderBy("name")}>Name<SortByAlpha className="az-icon"/></TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell >
                <Tooltip title="Sort" enterDelay={300}>
                  <TableSortLabel onClick={() => this.orderBy("introduced")}>Introduced<UnfoldMore className="az-icon"/></TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title="Sort" enterDelay={300}>
                  <TableSortLabel onClick={() => this.orderBy("discontinued")}>Discontinued<UnfoldMore className="az-icon"/></TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title="Sort" enterDelay={300}>
                  <TableSortLabel onClick={() => this.orderBy("company")}>Company<SortByAlpha className="az-icon"/></TableSortLabel>
                </Tooltip>
              </TableCell>
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