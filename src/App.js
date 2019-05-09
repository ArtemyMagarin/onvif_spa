import React, { Component } from 'react';
import { connect } from 'react-redux';

import $ from 'jquery';
import Popper from 'popper.js';
import bootstrap from 'bootstrap';

import 'bootstrap/dist/css/bootstrap.css';
import 'material-icons/iconfont/material-icons.css';
import './styles/common.css';

import Dashboard from './components/dashboard/dashboard.jsx'
import Navbar from './components/navbar/navbar.jsx'
import Report from './components/report/report.jsx'

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
