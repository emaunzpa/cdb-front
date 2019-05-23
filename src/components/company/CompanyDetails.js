import React,{ Component } from "react";
import {TableCell,TableRow,TextField ,Button }from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete'

class Company{

}

class CompanyDetails extends Component{

    render() {
        return(
        <TableRow key ={this.props.company.id}>
            <TableCell align="left"> {this.props.company.id} </TableCell>
            <TableCell align="left"> {this.props.company.name} </TableCell> 
            <TableCell align="right"> <Button onClick={() => this.props.delete(this.props.company.id)}><DeleteIcon/></Button> </TableCell>
        </TableRow>

        )
            

    }
}

class CompanyHeader extends Component{


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