import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm'
import Header from './components/header/header';
<<<<<<< HEAD
import ComputerList from './Containers/ComputerList';
=======
import { BrowserRouter as Router, Route } from "react-router-dom";
>>>>>>> develop

export default class App extends React.Component {

<<<<<<< HEAD
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
=======
  render() {
    return (
      <div className="App">
          <Router>
            <Route path="/**" component={Header} />
            <Route path="/login" component={LoginForm} />
          </Router>
>>>>>>> develop
      </div>
    );
  }

}