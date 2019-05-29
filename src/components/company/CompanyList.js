import React, { Component } from 'react';
import companyService from '../../services/CompanyService';
import userService from '../../services/UserService';
import Pagination from '../pagination';
import { CompanyDetails, CompanyHeader } from './CompanyDetails'
import { Table, TableBody, TableHead, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, SnackbarContent } from '@material-ui/core';
import DialogContentText from '@material-ui/core/DialogContentText';
import Plus from '@material-ui/icons/Add'
import Company from '../../models/Company'
import AddCircle from '@material-ui/icons/AddCircle';
import Snackbar from '@material-ui/core/Snackbar';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import I18n from '../../config/i18n';



class CompanyList extends Component {

    state = {
        companies: [],
        openSnack: false,
        reverse: false
    }



    updateNewName = (event) => {
        this.setState({ newName: event.target.value });
    }

    addCompany = async () => {
        let company = new Company({ id: undefined, name: this.state.newName });
        await companyService.create(company)
            .catch(err => console.log(err));
        this.setState({
            newName: '',
            snackMessage: <I18n t='companyAdded' />,
            snackColor: 'green',
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
        if (event.key === 'Enter') {
            this.searchByName();
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
        console.log(this.state.deleteId)
        await companyService.delete(this.state.deleteId)
            .catch(err => console.log(err));
        let options = {
            page: this.state.page || 1,
            itemPerPage: this.state.itemPerPage || 10,
            search: this.state.search || ""
        };
        this.updateList(options);
        this.setState({
            snackMessage: <I18n t='companyDelete' />,
            snackColor: 'green',
            openSnack: true,
            deleteId: '',
            deleteName: '',
        })
        this.closeDeleteDialog()
    }

    updateList = async (options) => {
        this.setState({
            page: options.page,
            itemPerPage: options.itemPerPage,
            search: options.search,
            orderBy: options.orderBy,
            companies: await companyService.list(options)
                .catch(err => console.log(err)),
            size: await companyService.count(options.search)
                .catch(err => console.log(err))
        })
        this.forceUpdate();
    }

    componentDidMount() {
        let options = {
            page: this.props.page || 1,
            itemPerPage: this.props.itemPerPage || 10,
            search: this.props.search || ""
        };
        this.updateList(options);
    }

    closeSnack = () => {
        this.setState({
            openSnack: false
        })
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

    emptyName = () => {
        this.setState({
            snackMessage: <I18n t="emptyName" />,
            snackColor: "red",
            openSnack: true
        })
    }

    handleChange = (event) => {
        this.setState({ search: event.target.value });
    };

    searchByName = () => {
        console.log("search " + this.state.search)
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
                            <TextField id="AddField" align-self="left" onKeyPress={(event) => event.key === 'Enter' ? this.state.newName ? this.addCompany(this.state.newName) : this.emptyName() : ({})} label={<I18n t='newName' />} onChange={this.updateNewName} />
                        </DialogContent>
                        <DialogActions>
                            {
                                this.state.newName ?
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
                <Snackbar
                    bodyStyle={{ backgroundColor: this.state.snackColor, color: 'coral' }}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    key={`${'bottom'},${'right'}`}
                    open={this.state.openSnack}
                    onClose={this.closeSnack}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    autoHideDuration={2000}
                >
                    <SnackbarContent
                        className="snackbar-success"
                        aria-describedby="client-snackbar"
                        message={
                            <span id="client-snackbar" className="snackbarMessage">
                                {
                                    this.state.snackColor === 'green' &&
                                    <CheckCircleIcon className="snackbarIcon" />
                                }
                                {this.state.snackMessage}
                            </span>
                        }
                        action={[
                            <IconButton key="close" aria-label="Close" color="inherit" onClick={this.closeSnack}>
                                <CloseIcon />
                            </IconButton>,
                        ]}
                    />
                </Snackbar>
                <div class="tableHeader">
                    {userService.isAdmin() &&
                        <Button onClick={() => this.addDialog()} className="textfield-align">
                            <AddCircle fontSize="large" /><I18n t="addCompany" />
                        </Button>}
                    <div class="tableSearch">
                        <TextField
                            label={<I18n t="search" />}
                            type="search"
                            margin="normal"
                            onKeyPress={this.keyHandler}
                            onChange={this.handleChange}
                        />
                        <Button onClick={() => this.searchByName()} className="textfield-align"><I18n t="search" /></Button>
                    </div>
                </div>

                <Table className="companyTable">
                    <TableHead>
                        <CompanyHeader search={(value) => this.search(value)} orderBy={(value) => this.orderBy(value)} />
                    </TableHead>
                    <TableBody>
                        {
                            this.state.companies ?
                                this.state.companies.map(company =>
                                    <CompanyDetails company={company} delete={(id, name) => this.deleteDialog(id, name)} />
                                )
                                : <div> <I18n t="errorNoCompanies" /></div>
                        }
                    </TableBody>
                </Table>
                <Pagination otherOptions={{ search: this.state.search, orderBy: this.state.orderBy }}
                    options={{ page: this.state.page, itemPerPage: this.state.itemPerPage }}
                    size={this.state.size}
                    update={(options) => this.updateList(options)}
                />
            </div>
        )
    }

}

export default CompanyList;