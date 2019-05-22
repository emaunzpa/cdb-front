import React,{Component} from 'react';
import companyService from '../../services/CompanyService';
import userService from '../../services/UserService';
import Pagination from '../pagination';

class CompanyList extends Component {

    state = {
        companies :[],
        options: Pagination
        
    }

     updateList = async (options) => {
        let isSuccess = await userService.login({login : "lolo", password : "coucou" })
          .catch(err => console.log(err));
        if(isSuccess) {
            console.log(options)
            this.setState({
              companies : await companyService.list(options)
              .catch(err => console.log(err)),
              size : await companyService.count()
              .catch(err => console.log(err))
              
          }) 
        }
        this.forceUpdate();
    }

    componentDidMount() {
        let options = {
            page : 1,
            itemPerPage:10
        }
        this.updateList(options)
    }


    render(){
        return (
            <div className ="container">
                <div className = "companyList">
                    <ul>
                        {
                            this.state.companies.map( company =>
                                <li key ={company.id}>
                                    Id : {company.id} Name : {company.name}
                                </li>
                            )
                        }
                    </ul>
                </div>
                <Pagination size={this.state.size} update={(options)=> this.updateList(options)}></Pagination>
            </div>
        )
    }

}

export default CompanyList