import React,{ Component } from "react";
import {TableCell,TableRow,TextField ,Button }from '@material-ui/core';

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

    state ={
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
        <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>
                Name
                <TextField id="searchField" display="right" label="Search name"  type="search" onChange={this.updateSearch} onKeyPress={this.keyHandler}></TextField>
                <Button id="searchButton"  onClick={() => this.props.search(this.state.search)} variant="outlined"  >Search</Button>
            </TableCell>
        </TableRow>
        )
    }
}
export default Company;
export { CompanyDetails,CompanyHeader};