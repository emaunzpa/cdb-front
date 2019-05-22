import React,{ Component } from "react";
import {TableCell,TableRow }from '@material-ui/core';

class Company{

}

class CompanyDetails extends Component{

    render() {
        return(
        <TableRow key ={this.props.company.id}>
            <TableCell> {this.props.company.id} </TableCell>
            <TableCell> {this.props.company.name} </TableCell> 
        </TableRow>
        )
            

    }
}

class CompanyHeader extends Component{

    render(){
        return(
        <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>NAME </TableCell>
        </TableRow>
        )
    }
}
export default Company;
export { CompanyDetails,CompanyHeader};