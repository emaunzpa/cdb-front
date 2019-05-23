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

class ComputerList extends Component {

  state = {
    computers : [],
    options: Pagination
  };
     updateComputer = async (options) => {
        console.log(options);
        let isSuccess = await userService.login({login : "lolo", password : "coucou" })
          .catch(err => console.log(err));
        if(isSuccess) {
            console.log(options)
            this.setState({
              computers : await computerService.list(options)
              .catch(err => console.log(err)),
              size : await computerService.count()
              .catch(err => console.log(err))
              
          }) 
        }
        this.forceUpdate();
        console.log(this.state.computers)
        console.log(this.state.size)
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


  render () {  
    return (
      <div>
      <Table>
         <TableHead>
         <TableRow>
            <TableCell>Checkbox</TableCell>
            <TableCell
              >
                <Tooltip
                  title="Sort"
                  enterDelay={300}
                >
                  <TableSortLabel
                    onClick={() => this.orderBy("name")}
                  >
                    Name
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            <TableCell>Introduced</TableCell>
            <TableCell>Discontinued</TableCell>
            <TableCell>Company</TableCell>
         </TableRow>
      </TableHead>
      <TableBody>
       {
          this.state.computers.map(computer => 
              <ComputerDetail key={computer.id} computer={computer} />
            )
        }
      </TableBody>
      </Table>

          <Pagination otherOptions={{orderBy:this.state.orderBy}} size={this.state.size} update={(options)=> this.updateComputer(options)}></Pagination>
      </div>
    )

  }
}


export default ComputerList;