import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm'
import Header from './components/header/header';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import UserService from './services/UserService';
import AddComputer from './components/addComputer/AddComputer';
import CompanyList from './components/company/CompanyList';

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
              <h1>Vous êtes sur la page d'accueil</h1>
            ) : <Redirect to={`/login`}></Redirect>
            )} />

          <Route path={`${langUri}/computers`}
            render={() => (UserService.isAuthenticated() ? (
              <AddComputer/>
            ) : <Redirect to={`/login`}></Redirect>
            )} />

          <Route path={`${langUri}/companies`}
            render={() => (UserService.isAuthenticated() ? (
              <CompanyList></CompanyList>
            ) : <Redirect to={`/login`}></Redirect>

            )} />
        </Router>
      </div>
    );
  }

}