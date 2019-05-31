import React, { Component } from "react";
import { TableCell, TableRow, Button, TextField } from '@material-ui/core';
import userService from '../../services/UserService';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SortByAlpha from '@material-ui/icons/SortByAlpha';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import I18n from "../../config/i18n";
import MySnackbar from '../utils/MySnackbar';
import companyService from '../../services/CompanyService'
import Company from "../../models/Company";



class CompanyDetails extends Component {

    state = {
        editMode: false,
        name: this.props.company.name
    }

    toggleEditMode = async () => {
        if (this.state.editMode) {
            if (this.state.newName && this.state.newName.trim() !== "") {
                await companyService.update(new Company({ id: this.props.company.id, name: this.state.newName }))
                .catch(err => this.changeSnackbar("fail", ""+err.message));
                this.setState({
                    editMode: false,
                    name: this.state.newName
                })
                this.changeSnackbar("success", <I18n t="companyEdited" />);
            } else {
                this.changeSnackbar("fail", <I18n t="emptyName" />);
            }
        } else {

            this.setState({
                editMode: true,
                newName: this.state.name,
            })
        }
    }

    updateName = (event) => {
        this.setState({
            newName: event.target.value
        })
    }

    keyHandler = (event) => {
        if (event.key === 'Enter') {
            this.toggleEditMode();
        }
    }

    closeSnack = () => {
        this.setState({
            openSnack: false
        })
    }

    changeSnackbar = (variant, message) => {
        this.setState({ openSnack : true, snackMessage : message, snackMode : variant })
    }

    render() {
        return (
            <TableRow key={this.props.company.id} hover={true} >
                <TableCell align="left">
                    {
                        this.state.editMode ?
                            <TextField
                                autoFocus
                                id="nameInput"
                                value={this.state.newName}
                                onChange={this.updateName}
                                onKeyPress={this.keyHandler}
                                margin="dense"
                                fullWidth
                            />
                            : this.state.name
                    }

                </TableCell>
                {
                    userService.isAdmin() &&
                    <TableCell align="right">
                        <Button onClick={() => this.props.delete(this.props.company.id, this.props.company.name)}>
                            <DeleteIcon />
                        </Button>
                        <MySnackbar open={() => this.state.openSnack} close={this.closeSnack} variant={this.state.snackMode} message={this.state.snackMessage} />
                        <Button onClick={() => this.toggleEditMode()}>
                            <EditIcon />
                        </Button>
                    </TableCell>
                }
            </TableRow>
        )
    }
}

class CompanyHeader extends Component {

    state = {
        search: ""
    }

    updateSearch = (event) => {
        this.setState({ search: event.target.value })
    }

    keyHandler = (event) => {
        if (event.key === 'Enter') {
            this.props.search(this.state.search);
        }
    }

    render() {
        return (
            <TableRow key="head">
                <TableCell align="left"><I18n t="name" />
                    <TableSortLabel onClick={() => this.props.orderBy("name")}><SortByAlpha className="az-icon" /></TableSortLabel>
                </TableCell>
                <TableCell align="right" />
            </TableRow>
        )
    }
}
export default CompanyDetails;
export { CompanyDetails, CompanyHeader };