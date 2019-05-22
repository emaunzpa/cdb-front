import React from 'react';
import './App.css';
import CompanyList from './components/company/CompanyList';

export default class App extends React.Component {

  render() {
    return (
      <div className="App">
          <CompanyList page={3}></CompanyList>
      </div>
    );
  }

}