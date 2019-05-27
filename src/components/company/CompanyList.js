import React, { Component } from 'react';
import companyService from '../../services/CompanyService';
import userService from '../../services/UserService';
import Pagination from '../pagination';
import { CompanyDetails, CompanyHeader } from './CompanyDetails'
<<<<<<< HEAD
import { Table, TableBody, TableHead, TextField, Button, Dialog, DialogTitle, DialogContent,DialogActions} from '@material-ui/core';
=======
import { Table, TableBody, TableHead, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
>>>>>>> b0bf08475ad75ff54be9d47344c14a42d1f90378
import Plus from '@material-ui/icons/Add'
import Company from '../../models/Company'
import SearchIcon from '@material-ui/icons/Search'
import Snackbar from '@material-ui/core/Snackbar';



class CompanyList extends Component {

    state = {
        companies: [],
        openSnack: false
    }

    toggleAdd = () => {
        this.setState({ toggleAdd: !this.state.toggleAdd });
    }

    updateNewName = (event) => {
        this.setState({ newName: event.target.value });
    }

    addCompany = async () => {
        let company = new Company({ id: undefined, name: this.state.newName });
        await companyService.create(company)
            .catch(err => console.log(err));
        this.setState({
            snackMessage: "Company Added",
<<<<<<< HEAD
=======
            snackColor: 'green',
>>>>>>> b0bf08475ad75ff54be9d47344c14a42d1f90378
            openSnack: true
        })
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
        let options = { page: 1, itemPerPage: 10, search: value };
        this.updateList(options);
    }

<<<<<<< HEAD
    deleteDialog = (id,name) => {
        this.setState({
            openDeleteDialog:true,
            deleteName:name,
            deleteId:id
=======
    deleteDialog = (id, name) => {
        this.setState({
            openDeleteDialog: true,
            deleteName: name,
            deleteId: id
>>>>>>> b0bf08475ad75ff54be9d47344c14a42d1f90378
        })
    }


    delete = async () => {
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
<<<<<<< HEAD
            openSnack: true
=======
            snackColor: 'green',
            openSnack: true,
            deleteId: '',
            deleteName: '',
>>>>>>> b0bf08475ad75ff54be9d47344c14a42d1f90378
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
        }
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
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.openSnack}
                    autoHideDuration={2000}
                    onClose={this.closeSnack}
                    color={this.state.snackColor}
                    message={<span id="message-id">{this.state.snackMessage}</span>}
                    action={[
                        <Button onClick={() => this.closeSnack()}>
                            Ok
                        </Button>
                    ]}
                />
                <div>{
                    userService.isAdmin() &&
                    <Button variant="outlined" align-self="left" onClick={() => this.toggleAdd()}>
                        ADD A COMPANY
                </Button>
                }
                    {
                        this.state.toggleAdd && userService.isAdmin() &&
                        <TextField id="AddField" align-self="left" label="Name new company" onChange={this.updateNewName} />
                    }
                    {
                        this.state.toggleAdd && userService.isAdmin() &&
                        <Button align-self="left" onClick={() => this.addCompany()}><Plus /></Button>
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
                <Pagination otherOptions={{ search: this.state.search }}
                    options={{ page: this.state.page, itemPerPage: this.state.itemPerPage }}
                    size={this.state.size}
                    update={(options) => this.updateList(options)}
                />
            </div>
        )
    }

}

export default new CompanyList();