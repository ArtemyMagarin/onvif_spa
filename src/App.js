import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css';
import 'material-icons/iconfont/material-icons.css';

import $ from 'jquery';
import Popper from 'popper.js';
import bootstrap from 'bootstrap';

import './styles/common.css';

import Dashboard from './components/dashboard.jsx'
import Navbar from './components/navbar.jsx'
import Report from './components/report.jsx'

function mapStateToProps(state) {
  return {
    testInProgress: state.testReducer.currentTest.testInProgress
  };
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        <div className="container">
          {this.props.testInProgress ? <Report/> : <Dashboard/>}
        </div> 
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(App)
