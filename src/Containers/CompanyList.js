import React, { Component } from 'react';
import companyService from '../services/CompanyService';
import userService from '../services/UserService';
import Pagination from '../components/pagination/pagination';
import { CompanyDetails, CompanyHeader } from './../components/details/CompanyDetails'
import { Table, TableBody, TableHead, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import DialogContentText from '@material-ui/core/DialogContentText';
import Plus from '@material-ui/icons/Add'
import Company from '../models/Company'
import AddCircle from '@material-ui/icons/AddCircle';
import I18n from '../config/i18n';
import Footer from '../components/utils/Footer'
import MySnackbar from '../components/utils/MySnackbar';

class CompanyList extends Component {

    state = {
        companies: [],
        reverse: false,
        openDeleteDialog: false,
        openAddDialog: false,
        openSnack: false,
    }

    updateNewName = (event) => {
        this.setState({ newName: event.target.value });
    }

    addCompany = async () => {
        let company = new Company({ id: undefined, name: this.state.newName });
        await companyService.create(company)
            .catch(err => this.changeSnackbar("fail", "Something wrong happened, try later"));
        this.setState({
            newName: '',
            snackMessage: <I18n t='companyAdded' />,
            snackVariant: 'success',
            openSnack: true
        })
        this.closeAddDialog();
    }

    buttonSearch = () => {
        if (this.state.searchMode) {
            this.search(this.state.search);
        } else {
            this.setState({
                searchMode: true
            })
        }
    }

    updateSearch = (event) => {
        this.setState({ search: event.target.value || "" })
    }

    keyHandler = (event) => {
        console.log(event.target.id)
        if (event.key === 'Enter') {
            
            switch (""+event.target.id){
                case 'searchField':
                        console.log("event.target.id")
                    this.searchByName();
                    break;
                case 'addField':
                        this.state.newName && (this.state.newName.trim() !=="") ? 
                        this.addCompany(this.state.newName) 
                        : this.changeSnackbar("fail", <I18n t="emptyName" />);
                    break;
            }
        }
    }


    deleteDialog = (id, name) => {
        this.setState({
            openDeleteDialog: true,
            deleteName: name,
            deleteId: id
        })
    }

    delete = async () => {
        await companyService.delete(this.state.deleteId)
            .catch(err => this.changeSnackbar("fail", ""+err.message));
        let options = {
            page: this.state.page || 1,
            itemPerPage: this.state.itemPerPage || 10,
            search: this.state.search || ""
        };
        this.updateList(options);
        this.setState({
            deleteId: '',
            deleteName: '',
        })
        this.changeSnackbar("success", <I18n t='companyDelete' />);
        this.closeDeleteDialog()
    }

    updateList = async (options) => {
        this.setState({
            page: options.page,
            itemPerPage: options.itemPerPage,
            search: options.search,
            orderBy: options.orderBy,
            companies: await companyService.list(options)
                .catch(err => this.changeSnackbar("fail", ""+err.message)),
            size: await companyService.count(options.search)
                .catch(err => this.changeSnackbar("fail", ""+err.message))
        })
        this.forceUpdate();
    }

    componentDidMount() {
        let options = {
            page: this.props.page || 1,
            itemPerPage: this.props.itemPerPage || 10,
            search: this.props.search || "",
        };
        this.updateList(options);
    }

    closeSnack = () => {
        this.setState({
            openSnack: false
        })
    }

    changeSnackbar = (variant, message) => {
        this.setState({ openSnack : true, snackMessage : message, snackVariant : variant })
    }

    closeDeleteDialog = () => {
        this.setState({
            openDeleteDialog: false
        })
    }

    addDialog = () => {
        this.setState({ openAddDialog: true });
    }

    closeAddDialog = () => {
        this.setState({
            newName: '',
            openAddDialog: false
        })
    }
    orderBy = async (column) => {
        this.setState({ orderBy: column, reverse: !this.state.reverse });
        let options = {
            page: 1,
            itemPerPage: 10,
            orderBy: column,
            reverse: this.state.reverse,
            search: this.state.search
        }
        this.updateList(options)
    }

    handleChange = (event) => {
        this.setState({ search: event.target.value });
    };

    searchByName = () => {
        let options = { page: 1, itemPerPage: this.state.itemPerPage || 10, search: this.state.search };
        this.updateList(options);
    }

    render() {
        return (
            <div className="tableContainer">
                <Dialog
                    open={this.state.openDeleteDialog}
                    onClose={this.closeDeleteDialog}
                >
                    <DialogTitle> <I18n t='delete' /> : {this.state.deleteName} ?</DialogTitle>
                    <DialogContent>
                        <I18n t='ConfirmationDelete' />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.delete()}>
                            <I18n t="yes" />
                        </Button>
                        <Button onClick={() => this.closeDeleteDialog()}>
                            <I18n t="no" />
                        </Button>
                    </DialogActions>
                </Dialog>
                {
                    userService.isAdmin() &&
                    <Dialog
                        open={this.state.openAddDialog}
                        onClose={this.closeAddDialog}
                    >
                        <DialogTitle><I18n t="addCompany" /></DialogTitle>
                        <DialogContent>
                            <DialogContentText><I18n t="enterNewCompanyName" /></DialogContentText>
                            <TextField id="addField" autoFocus align-self="left" onKeyPress={this.keyHandler} label={<I18n t='newName' />} onChange={this.updateNewName} />
                        </DialogContent>
                        <DialogActions>
                            {
                                this.state.newName && (this.state.newName.trim() !=="") ?
                                    <Button onClick={() => this.addCompany(this.state.newName)}>
                                        <Plus />
                                    </Button>
                                    :
                                    <Button disabled={true}>
                                        <Plus />
                                    </Button>
                            }
                        </DialogActions>
                    </Dialog>
                }
                <MySnackbar open={() => this.state.openSnack} close={this.closeSnack} variant={this.state.snackVariant} message = {this.state.snackMessage}/>
                <div className="tableHeader">
                    {userService.isAdmin() &&
                        <Button onClick={() => this.addDialog()} className="textfield-align">
                            <AddCircle fontSize="large" /><I18n t="addCompany" />
                        </Button>}
                    <div className="tableSearch">
                        <TextField
                            id="searchField"
                            label={<I18n t="search" />}
                            type="search"
                            margin="normal"
                            onKeyPress={this.keyHandler}
                            onChange={this.handleChange}
                        />
                        <Button variant="outlined" color="primary" onClick={() => this.searchByName()} className="textfield-align"><I18n t="search" /></Button>
                    </div>
                </div>

                <Table className="companyTable">
                    <TableHead>
                        <CompanyHeader search={(value) => this.search(value)} orderBy={(value) => this.orderBy(value)} />
                    </TableHead>
                    <TableBody>
                        {
                            this.state.companies && this.state.companies !== [] ?
                                this.state.companies.map(company =>
                                    <CompanyDetails key={company.id} company={company} delete={(id, name) => this.deleteDialog(id, name)} />
                                )
                                : <I18n t="errorNoCompanies" />
                        }
                    </TableBody>
                </Table>
                <Footer content={<Pagination
                    otherOptions={{ search: this.state.search, orderBy: this.state.orderBy }}
                    options={{ page: this.state.page, itemPerPage: this.state.itemPerPage }}
                    size={this.state.size}
                    update={(options) => this.updateList(options)}
                    />} 
                />
                
            </div>
        )
    }

}

export default CompanyList;