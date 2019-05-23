import React, {Component} from 'react';
import computerService from '../services/ComputerService';
import ComputerDetail from '../components/ComputerDetail';
import userService from '../services/UserService';
import Pagination from '../components/pagination';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

class ComputerList extends Component {

  state = {
    computers : [],
    options: Pagination,
    search: ""
  };
     updateComputer = async (options) => {
        let isSuccess = await userService.login({login : "lolo", password : "coucou" })
          .catch(err => console.log(err));
        if(isSuccess) {
            this.setState({
              computers : await computerService.list(options)
              .catch(err => console.log(err)),
              size : await computerService.count()
              .catch(err => console.log(err))
              
          }) 
        }
        this.forceUpdate();
    }

    searchByName = async () => {
    this.setState({search:this.state.search});
      let options = {
            page : 1,
            itemPerPage:10,
            search: this.state.search
        }
        this.updateComputer(options)
    }


    componentDidMount() {
        let options = {
            page : 1,
            itemPerPage:10
        }
        this.updateComputer(options)
}

  orderBy = async (column) => {
    this.setState({orderBy:column});
      let options = {
            page : 1,
            itemPerPage:10,
            orderBy: column
        }
        this.updateComputer(options)
  }

   handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ search: event.target.value });
  };

  deleteById = async (idToDelete) =>{
    console.log(idToDelete)
   let isSuccess = await computerService.delete(idToDelete)
          .catch(err => console.log(err));
          this.updateComputer(this.state.options);
  }

  render () {
    return (
      <div>
      <TextField
          id="standard-search"
          label="Search"
          type="search"
          margin="normal"
          onChange={ this.handleChange }
        />
        <Button onClick={() => this.searchByName(this.state.search)}>Search</Button>
      <Table>
         <TableHead>
         <TableRow>
              <TableCell>
                <Tooltip title="Sort" enterDelay={300}>
                  <TableSortLabel onClick={() => this.orderBy("name")}>Name</TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell >
                <Tooltip title="Sort" enterDelay={300}>
                  <TableSortLabel onClick={() => this.orderBy("introduced")}>Introduced</TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title="Sort" enterDelay={300}>
                  <TableSortLabel onClick={() => this.orderBy("discontinued")}>Discontinued</TableSortLabel>
                </Tooltip>
              </TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Edit</TableCell>
         </TableRow>
      </TableHead>
      <TableBody>
       {
          this.state.computers.map(computer => 
              <ComputerDetail key={computer.id} deleteById={this.deleteById} computer={computer} />
            )
        }
      </TableBody>
      </Table>

          <Pagination options={{page:this.props.page,itemPerPage:this.props.itemPerPage}} otherOptions={{orderBy:this.state.orderBy, search:this.state.search}} size={this.state.size} update={(options)=> this.updateComputer(options)}></Pagination>
      </div>
    )

  }
}


export default ComputerList;