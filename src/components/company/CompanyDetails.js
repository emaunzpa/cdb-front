import React,{ Component } from "react";
import {TableCell,TableRow,TextField ,Button }from '@material-ui/core';
import userService from '../../services/UserService'

import DeleteIcon from '@material-ui/icons/Delete'

class Company{

}

class CompanyDetails extends Component{

    render() {
        return(
        <TableRow key ={this.props.company.id}>
            <TableCell align="left"> {this.props.company.id} </TableCell>
            <TableCell align="left"> {this.props.company.name} </TableCell> 
        <TableCell align="right"> { userService.isAdmin() && <Button onClick={() => this.props.delete(this.props.company.id)}><DeleteIcon/></Button> }</TableCell>
        </TableRow>
        )
    }
}

class CompanyHeader extends Component{

    state = {
        search: ""
    }
    
    updateSearch = (event) => {
        this.setState({search:event.target.value})
    }

    keyHandler = (event) => {
        if(event.key === 'Enter'){
            this.props.search(this.state.search);
        }
    }

    render(){
        return(
        <TableRow >
            <TableCell align="left">ID</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="right"/>
        </TableRow>
        )
    }
}
export default Company;
export { CompanyDetails,CompanyHeader};