import React, { Component } from 'react';
import computerService from '../services/ComputerService';
import ComputerDetail from '../components/details/ComputerDetail';
import Pagination from '../components/pagination/pagination';
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
import './computerList.css';
import SortByAlpha from '@material-ui/icons/SortByAlpha';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import MySnackbar from "../components/utils/MySnackbar";
import userService from '../services/UserService';
import Footer from '../components/utils/Footer';


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
    validField: { computerName: true, introduced: true, discontinued: true, companyId: true },
    company: new Company({ id: "", name: "" }),
    snackbar: false,
    reverse: false,
    openDeleteDialog:false
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
    try {
      let computer = this.state.computer;
      computer.name = event.target.value;
      this.setState({ ...this.state, computer: computer, validField: { ...this.state.validField, computerName: true } }, this.finishUpdate)
    } catch (err) {
      this.setState({ ...this.state, validField: { ...this.state.validField, computerName: false } }, this.finishUpdate)
    }
  };

  handleChangeIntroduced = (event) => {
    try {
      let computer = this.state.computer;
      computer.introduced = new Date(event.target.value);
      this.setState({ ...this.state, computer: computer, validField: { ...this.state.validField, introduced: true } }, this.finishUpdate)
    } catch (err) {
      this.setState({ ...this.state, validField: { ...this.state.validField, introduced: false } }, this.finishUpdate)
    }

  };

  handleChangeDiscontinued = (event) => {
    try {
      let computer = this.state.computer;
      computer.discontinued = new Date(event.target.value);
      this.setState({ ...this.state, computer: computer, validField: { ...this.state.validField, discontinued: true } }, this.finishUpdate)
    } catch (err) {
      this.setState({ ...this.state, validField: { ...this.state.validField, discontinued: false } }, this.finishUpdate)
    }
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
        .catch(err => this.changeSnackbar("fail", "Something wrong happened, try later"));

      this.setState({ ...this.state, computer: new Computer({ name: "", introduced: "", discontinued: "", companyId: "", companyName: "" }) });
      this.handleOpen();
      this.handleSnack({ vertical: 'bottom', horizontal: 'right' });
      this.changeSnackbar("success", <I18n t="snackbarSuccessMessage" />);
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
      itemPerPage: options.itemPerPage,
      search: options.search,
      computers: await computerService.list(options)
      .catch(err => this.changeSnackbar("fail", ""+err.message)),
      size: await computerService.count(options.search)
      .catch(err => this.changeSnackbar("fail", ""+err.message))
    })
    this.forceUpdate();
  }

  componentDidMount() {
    let options = {
      page: 1,
      itemPerPage: this.props.itemPerPage || 10,
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
      itemPerPage: this.state.itemPerPage,
      search: this.state.search || ""
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
      .then(this.changeSnackbar("success", <I18n t="snackbarSuccessMessageDelete" />))
      .catch(err => this.changeSnackbar("fail", ""+err.message));
    let options = {
      page: 1,
      itemPerPage: 10,
      search: this.state.search || ""
    }
    this.updateComputer(options);
    this.closeDeleteDialog();
  }

  handleOpen = () => {
    this.setState({ ...this.state, open: !this.state.open, validField: { computerName: true, introduced: true, discontinued: true, companyId: true } })
  }

  submitNewComputer = () => {
    this.addComputer.addNewComputer();
  }

  handleSnack = () => {
    this.setState({ snackbar: !this.state.snackbar })
  };

  changeSnackbar = (variant, message) => {
    this.setState({ snackbar : true, snackMessage : message, snackVariant : variant })
  }

  closeDeleteDialog = () => {
    this.setState({
        openDeleteDialog: false
    })
  }

  deleteDialog = (id,name) => {
    this.setState({
      openDeleteDialog:true,
      deleteId:id,
      deleteName:name
    })
  }

  render() {
    return (
      <div className="tableContainer">
        <div className="tableHeader">
          {
                    userService.isAdmin() &&
          <Button onClick={this.handleOpen} className="textfield-align">
            <AddCircle fontSize="large" id="addCircleBtn"/><I18n t="addNewComputer" />
          </Button>
          }
          <div className="tableSearch">
          <TextField
            label={<I18n t="search" />}
            type="search"
            margin="normal"
            onKeyPress={this.keyHandler}
            onChange={this.handleChange}
          />
          <Button variant="outlined" color="primary" onClick={() => this.searchByName(this.state.search)} className="textfield-align"><I18n t="search" /></Button>
          </div>
        </div>
        <Dialog
                    open={this.state.openDeleteDialog}
                    onClose={this.closeDeleteDialog}
                >
                    <DialogTitle> <I18n t='delete' /> : {this.state.deleteName} ?</DialogTitle>
                    <DialogContent>
                        <I18n t='ConfirmationDelete' />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.deleteById(this.state.deleteId)}>
                            <I18n t="yes" />
                        </Button>
                        <Button onClick={() => this.closeDeleteDialog()}>
                            <I18n t="no" />
                        </Button>
                    </DialogActions>
                </Dialog>
        <Dialog fullWidth={true} open={this.state.open} onClose={this.handleOpen} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title"><I18n t="addNewComputer" /></DialogTitle>
            <DialogContent>
              <div className="container">

                <TextField
                  autoFocus
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
          <MySnackbar open={() => this.state.snackbar} close={this.handleSnack} variant={this.state.snackVariant} message={this.state.snackMessage} />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Tooltip title="Sort" enterDelay={300}>
                  <TableSortLabel onClick={() => this.orderBy("name")}><I18n t="computerName" /><SortByAlpha className="az-icon" /></TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell >
                <Tooltip title="Sort" enterDelay={300}>
                  <TableSortLabel onClick={() => this.orderBy("introduced")}><I18n t="introducedDate" /><UnfoldMore className="az-icon" /></TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title="Sort" enterDelay={300}>
                  <TableSortLabel onClick={() => this.orderBy("discontinued")}><I18n t="discontinuedDate" /><UnfoldMore className="az-icon" /></TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title="Sort" enterDelay={300}>
                  <TableSortLabel onClick={() => this.orderBy("company")}><I18n t="company" /><SortByAlpha className="az-icon" /></TableSortLabel>
                </Tooltip>
              </TableCell>{
                    userService.isAdmin() &&
              <TableCell><I18n t="edit" /></TableCell>
            }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              this.state.computers ?
              this.state.computers.map(computer =>
                <ComputerDetail companies={this.state.companies} snackbar={this.changeSnackbar} key={computer.id} delete={this.deleteDialog} computer={computer} />
              )
              : <div> <I18n t="errorNoComputers"/></div>
            }
          </TableBody>
        </Table>
        <Footer content={<Pagination 
                          options={{ page: this.state.page, itemPerPage: this.state.itemPerPage }}
                          otherOptions={{ orderBy: this.state.orderBy, search: this.state.search }} 
                          size={this.state.size} update={(options) => this.updateComputer(options)} 
                          />}
               
        />
        
              </div>
    )

  }
}
export default ComputerList;