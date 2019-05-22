import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm'
import Header from './components/header/header';
import { BrowserRouter as Router, Route } from "react-router-dom";

export default class App extends React.Component {

  render() {
    return (
      <div className="App">
          <Router>
            <Route path="/**" component={Header} />
            <Route path="/login" component={LoginForm} />
          </Router>
      </div>
    );
  }

}