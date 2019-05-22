import React from 'react';
import './App.css';
import userService from './services/UserService';
import LoginForm from './components/LoginForm'
import computerService from './services/ComputerService';
import Header from './components/header/header';
import ComputerList from './Containers/ComputerList';

export default  class App extends React.Component {

  async componentDidMount() {

    let isSuccess = await userService.login({login : "lolo", password : "coucou" })
      .catch(err => console.log(err));
  }

  render () {
    return (
      <div className="App">
        <Header/>
        <LoginForm/>
      <ComputerList/>
      </div>
    );
  }

}