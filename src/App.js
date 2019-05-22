import React from 'react';
import './App.css';
import CompanyList from './components/company/CompanyList';
import LoginForm from './components/LoginForm'
import Header from './components/header/header';
import Footer from './components/footer/Footer';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import UserService from './services/UserService';

export default class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <Route path="/login" component={LoginForm} />

          <Route path="/" exact
            render={() => (UserService.isAuthenticated() ? (
              <h1>Vous êtes sur la page des computers</h1>
            ) : <Redirect to="/login"></Redirect>
            )} />

          <Route path="/computers"
            render={() => (UserService.isAuthenticated() ? (
              <h1>Vous êtes sur la page des computers</h1>
            ) : <Redirect to="/login"></Redirect>
            )} />

          <Route path="/companies"
            render={() => (UserService.isAuthenticated() ? (
              <h1>Vous êtes sur la page des companies</h1>
            ) : <Redirect to="/login"></Redirect>
            )} />

          <Footer />
        </Router>
      </div>
    );
  }

}