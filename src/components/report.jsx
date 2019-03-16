import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TestAction from '../actions/testActions';
import '../styles/horizontal-loader.css';


function mapStateToProps(state) {

}

function mapDispatchToProps(dispatch) {

}


export class Report extends Component {

    componentDidMount() {

    }

    render() {
        const listItems = null;

        return (
            <React.Fragment>
              
            </React.Fragment>
            
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Report)