import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TestAction from '../actions/testActions';
import '../styles/horizontal-loader.css';


function mapStateToProps(state) {
	return {
		currentDevice: state.dashboardReducer.currentDevice.data,
		testsList: state.testReducer.currentTest.tests
	}
}

function mapDispatchToProps(dispatch) {
    return {
        testActions: bindActionCreators(TestAction, dispatch)
    }
}

export class Report extends Component {

    componentDidMount() {
    	const { ip, port } = this.props.currentDevice;
    	this.props.testsList.forEach(
    		item => this.props.testActions.runSingleTestAction({...item, ip, port})
    	)
    }

    render() {
        const listItems = this.props.testsList.map((item, index) => (
        	<li key={index}>
        		<p>{item.name}</p>
        		<p>{item.service}</p>
        		<p>{item.pending?'pending':''}</p>
        		<p>{item.error?'error':''}</p>
        	</li>
        ));

        return (
            <React.Fragment>
              <ul>
              	{listItems}
              </ul>
            </React.Fragment>
            
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Report)