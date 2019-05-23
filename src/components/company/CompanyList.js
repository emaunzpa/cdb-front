import React,{Component} from 'react';
import companyService from '../../services/CompanyService';
import userService from '../../services/UserService';
import Pagination from '../pagination';
import {CompanyDetails,CompanyHeader} from './CompanyDetails'
import {Table,TableBody,TableHead}from '@material-ui/core';

class CompanyList extends Component {

    state = {
        companies :[]
    }

    search = (value) => {
        let options = {page:1,itemPerPage:10,search:value};
        this.updateList(options);
    }

    updateList = async (options) => {
        let isSuccess = await userService.login({login : "lolo", password : "coucou" })
            .catch(err => console.log(err));
        if(isSuccess) {
            this.setState({
              companies : await companyService.list(options)
              .catch(err => console.log(err)),
              size : await companyService.count(options.search)
              .catch(err => console.log(err))
            })       
        }
    }

    componentDidMount() {
        let options = {
            page : this.props.page || 1,
            itemPerPage: this.props.itemPerPage || 10,
            search: this.props.search || ""
        }
        this.updateList(options)
    }

    render(){
        return (
        <div className="tableContainer">
            <Table className = "companyTable">
                <TableHead className ="tableHeader">
                    <CompanyHeader search={(value) => this.search(value)}/>
                </TableHead>
                <TableBody className="tableBody">
                        {
                            this.state.companies.map( company =>
                               <CompanyDetails company={company}/>
                            )
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