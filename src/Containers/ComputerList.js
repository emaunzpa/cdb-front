import React, {Component} from 'react';
import computerService from '../services/ComputerService';
import ComputerDetail from '../components/ComputerDetail';

const API = 'http://10.0.1.229:8080/api/v1/recipes';
const UPDATE = 'http://10.0.1.229:8080/api/v1/recipes/';

class ComputerList extends Component {

  state = {
    computers : [],
    add : false
  };


  componentDidMount() {
    /*fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ computers: data }));*/
      this.computers = computerService.list({ page: "1", itemPerPage : "100" })
        .catch(err => console.log(err));
  }

  toggleAdd = () => {
    this.setState({add: !this.state.add})
  }

  delete = (id) => {
    this.deleteFetch(id);
    this.setState({computers : this.state.computers.filter(item => item.id !== id)})
  }

  deleteFetch = (id) => {
    var toSend = JSON.stringify({"id" : id});
    console.log(toSend);
    fetch(UPDATE, {
        method: 'DELETE',
        body: toSend,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
        }
    }).then(res => {
      console.log("res : " + JSON.stringify(res));
        return res;
    }).catch(err => {console.log("error : " + err)});
}

  addInBack = (data) => {
    console.log("add", JSON.stringify(data));
    var toSend = JSON.stringify(
{
  "description": data.description,
  "id": data.id,
  "ingredients": [
    {
      "ingredientId": 1,
      "name": "string",
      "quantity": 0,
      "recipeId": 0,
      "unit": "string"
    }
  ],
  "instructions": "string",
  "name": data.name,
  "picture": data.picture
}
      );
    console.log(toSend);
    fetch(UPDATE, {
        method: 'POST',
        body: toSend,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
        }
    }).then(res => {
      console.log("res : " + JSON.stringify(res));
        return res;
    }).catch(err => {console.log("error : " + err)});
}



  render () {  
    return (
      <div>
        {
          this.state.computers.map(computer => 
            <div md={3} key={computer.id}>
              <ComputerDetail computer={computer} delete={this.delete} />
            </div>
            )
        }
          
            <ComputerDetail addRecipe={this.addRecipe} add={this.add}/>
             
      </div>
    )

  }
}


export default ComputerList;