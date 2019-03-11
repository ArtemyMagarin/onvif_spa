import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import bootstrap from 'bootstrap';

import './styles/common.css';

import Dashboard from './components/dashboard.jsx'
import Navbar from './components/navbar.jsx'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        <div className="container">
          <Dashboard/>
        </div> 
      </div>
    );
  }
}

export default App;
