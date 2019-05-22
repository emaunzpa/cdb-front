import React from 'react';
import './App.css';
import userService from './services/UserService';
// import LoginForm from './components/LoginForm'
import computerService from './services/ComputerService';
import Header from './components/header/header';
import AddComputer from './components/addComputer/AddComputer';

export default  class App extends React.Component {

  async componentDidMount() {

    let isSuccess = await userService.login({login : "lolo", password : "coucou" })
      .catch(err => console.log(err));
    if(isSuccess) {
      let computers = await computerService.list({ page: "1", itemPerPage : "100" })
        .catch(err => console.log(err));
      console.log(computers);
    }

  }

  render () {
    return (
      <div className="App">
        <Header/>
        <AddComputer/>
      </div>
    );
  }

}