import React from 'react';
import logo from './logo.svg';
import './App.css';
import userService from './services/UserService';
import computerService from './services/ComputerService';

export default  class App extends React.Component {


  async componentDidMount() {
    let isSuccess = await userService.login({login : "lolo", password : "coucou" })
      .catch(err => console.log(err));
    if(isSuccess) {
      let computers = await computerService.list({ page: "1", itemPerPage : "10", search : "Apple"})
        .catch(err => console.log(err));
      console.log(computers);
    }
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }

}