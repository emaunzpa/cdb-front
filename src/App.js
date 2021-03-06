import React from 'react';
import './App.css';
import CompanyList from './Containers/CompanyList';
import ComputerList from './Containers/ComputerList'
import LoginForm from './components/forms/LoginForm'
import Header from './components/header/header';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import UserService from './services/UserService';
import AdminSignUpForm from './components/forms/AdminSignUp';
const langUri = '/:locale(en|fr)?';

export default class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <Route path={`${langUri}/login`} component={LoginForm} />

          <Route path={`${langUri}`} exact
            render={() => (UserService.isAuthenticated() ? (
              <ComputerList></ComputerList>
            ) : <Redirect to={`/login`}></Redirect>
            )} />

          <Route path={`${langUri}/computers`}
            render={() => (UserService.isAuthenticated() ? (
              <ComputerList></ComputerList>
            ) : <Redirect to={`/login`}></Redirect>
            )} />

          <Route path={`${langUri}/companies`}
            render={() => (UserService.isAuthenticated() ? (
              <CompanyList></CompanyList>
            ) : <Redirect to={`/login`}></Redirect>

            )} />

          <Route path={`${langUri}/users`}
            render={() => (UserService.isAdmin() ? (
              <AdminSignUpForm></AdminSignUpForm>
            ) : <Redirect to={`/computers`}></Redirect>

            )} />
        </Router>
      </div>
    );
  }

}
