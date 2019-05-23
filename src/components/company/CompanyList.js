import React,{Component} from 'react';
import companyService from '../../services/CompanyService';
import userService from '../../services/UserService';
import Pagination from '../pagination';
import {CompanyDetails,CompanyHeader} from './CompanyDetails'
import {Table,TableBody,TableHead, TextField,Button}from '@material-ui/core';
import Plus from '@material-ui/icons/Add'
import Company from '../../models/Company'

class CompanyList extends Component {

    state = {
        companies :[]
    }

    toggleAdd = ( ) => {
        this.setState({toggleAdd:!this.state.toggleAdd});
    }

    updateNewName = (event) => {
        this.setState({newName:event.target.value});
    }

    addCompany = async() => {
        let company = new Company({id:undefined,name: this.state.newName});
        console.log(company)
        await companyService.create(company)
            .catch(err => console.log(err));
    }

    search = (value) => {
        let options = {page:1,itemPerPage:10,search:value};
        this.updateList(options);
    }

    delete = async (id) => {
        await companyService.delete(id)
            .catch(err => console.log(err));
        let options = {
            page : this.props.page || 1,
            itemPerPage: this.props.itemPerPage || 10,
            search: this.props.search || ""
        };
        this.updateList(options);
    }

    updateList = async (options) => {
        this.setState({
            companies : await companyService.list(options)
                .catch(err => console.log(err)),
            size : await companyService.count(options.search)
                .catch(err => console.log(err))
        })       
    }

    componentDidMount() {
        let options = {
            page : this.props.page || 1,
            itemPerPage: this.props.itemPerPage || 10,
            search: this.props.search || ""
        }
        this.updateList(options);
    }

    render(){
        return (
        <div className="tableContainer">
            <div display="in-line-left">
                <Button onClick={()=> this.toggleAdd()}>
                    ADD A COMPANY
                </Button>
                {
                    this.state.toggleAdd ?
                        <div>
                            <TextField id="AddField" label="Name new company" onChange={this.updateNewName}/>
                            <Button onClick={() => this.addCompany()}><Plus/></Button>
                        </div>
                    : <div/>
                }
            </div>
            <Table className = "companyTable">
                <TableHead className ="tableHeader">
                    <CompanyHeader search={(value) => this.search(value)}/>
                </TableHead>
                <TableBody className="tableBody">
                        {
                            this.state.companies ? 
                                this.state.companies.map( company =>
                                    <CompanyDetails company={company} delete={(id) => this.delete(id)}/>
                                )
                            : <div> ERROR NO COMPANIES FOUND</div>
                        }
                </TableBody>
            </Table>
            <Pagination otherOptions={{search:this.state.search}} 
                        options={{page:this.props.page,itemPerPage:this.props.itemPerPage}}
                        size={this.state.size}
                        update={(options)=> this.updateList(options)}
                        />
        </div>
        )
    }

}

export default CompanyList