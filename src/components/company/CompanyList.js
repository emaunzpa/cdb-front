import React, { Component } from 'react';
import companyService from '../../services/CompanyService';
import userService from '../../services/UserService';
import Pagination from '../pagination';
import { CompanyDetails, CompanyHeader } from './CompanyDetails'
import { Table, TableBody, TableHead, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, SnackbarContent } from '@material-ui/core';
import DialogContentText from '@material-ui/core/DialogContentText';
import Plus from '@material-ui/icons/Add'
import Company from '../../models/Company'
import SearchIcon from '@material-ui/icons/Search'
import Snackbar from '@material-ui/core/Snackbar';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';



class CompanyList extends Component {

    state = {
        companies: [],
        openSnack: false
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
            snackMessage: "Company Added",
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
            this.search(this.state.search || "");
        }
    }

    search = (value) => {
        let options = { page: 1, itemPerPage: this.state.itemPerPage || 10, search: value };
        this.updateList(options);
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
            snackMessage: "Company deleted",
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
            companies: await companyService.list(options)
                .catch(err => console.log(err)),
            size: await companyService.count(options.search)
                .catch(err => console.log(err))
        })
        console.log(this.state.companies)
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
        this.setState({ orderBy: column });
        let options = {
            page: 1,
            itemPerPage: 10,
            orderBy: column
        }
        this.updateList(options)
    }

    render() {
        return (
            <div className="tableContainer">
                <Dialog
                    open={this.state.openDeleteDialog}
                    onClose={this.closeDeleteDialog}
                >
                    <DialogTitle>Delete : {this.state.deleteName} ?</DialogTitle>
                    <DialogContent>
                        Are you sure to delete this company ?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.delete()}>
                            Yes
                        </Button>
                        <Button onClick={() => this.closeDeleteDialog()}>
                            No
                        </Button>
                    </DialogActions>
                </Dialog>
                {
                    userService.isAdmin() &&
                    <Dialog
                        open={this.state.openAddDialog}
                        onClose={this.closeAddDialog}
                    >
                        <DialogTitle> Add Company</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Enter the new company's name</DialogContentText>
                            <TextField id="AddField" align-self="left" label="Name new company" onChange={this.updateNewName} />
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
                    bodyStyle={{ backgroundColor: 'green', color: 'coral' }}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    key={`${'bottom'},${'right'}`}
                    open={this.state.openSnack}
                    onClose={this.closeSnack}
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
                                <CheckCircleIcon className="snackbarIcon" />
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
                <div>{
                    userService.isAdmin() &&
                    <Button variant="outlined" align-self="left" onClick={() => this.addDialog()}>
                        ADD A COMPANY
                    </Button>
                }
                    <Button id="searchButton" align-self="right" onClick={() => this.buttonSearch()} variant="outlined"  ><SearchIcon /></Button>
                    {
                        this.state.searchMode ?
                            <TextField id="searchField" align-self="right" label="Search name" type="search" onChange={this.updateSearch} onKeyPress={this.keyHandler}></TextField>
                            : <div />
                    }
                </div>
                <Table className="companyTable">
                    <TableHead className="tableHeader">
                        <CompanyHeader search={(value) => this.search(value)} orderBy={(value) => this.orderBy(value)} />
                    </TableHead>
                    <TableBody className="tableBody">
                        {
                            this.state.companies ?
                                this.state.companies.map(company =>
                                    <CompanyDetails company={company} delete={(id, name) => this.deleteDialog(id, name)} />
                                )
                                : <div> ERROR NO COMPANIES FOUND</div>
                        }
                    </TableBody>
                </Table>
                <Pagination otherOptions={{ search: this.state.search,orderBy:this.state.orderBy }}
                    options={{ page: this.state.page, itemPerPage: this.state.itemPerPage }}
                    size={this.state.size}
                    update={(options) => this.updateList(options)}
                />
            </div>
        )
    }

}

export default CompanyList;