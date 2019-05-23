import React,{ Component } from "react";
import {TableCell,TableRow,TextField ,Button }from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import DeleteIcon from '@material-ui/icons/Delete'

class Company{

}

class CompanyDetails extends Component{

    render() {
        return(
        <TableRow key ={this.props.company.id}>
            <TableCell> {this.props.company.id} </TableCell>
            <TableCell> {this.props.company.name} </TableCell> 
            <TableCell> <Button onClick={() => this.props.delete(this.props.company.id)}><DeleteIcon/></Button> </TableCell>
        </TableRow>

        )
            

    }
}

class CompanyHeader extends Component{

    state ={
        search: "",
        searchMode:false
    }
    
    buttonSearch = () => {
        console.log("click")
        if(this.state.searchMode){
            this.props.search(this.state.search);
        }else{
            this.setState({
                searchMode:true
            })
        }
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
            <TableCell>ID</TableCell>
            <TableCell display="inline-block">
                Name
            </TableCell>
            <TableCell display="in-line">
                <Button id="searchButton"  onClick={() => this.buttonSearch()} variant="outlined"  ><SearchIcon/></Button>
                {
                    this.state.searchMode ?
                    <TextField id="searchField" display="right" label="Search name"  type="search" onChange={this.updateSearch} onKeyPress={this.keyHandler}></TextField>
                    : <div/>
                }
            </TableCell>
        </TableRow>
        )
    }
}
export default Company;
export { CompanyDetails,CompanyHeader};