import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TestAction from '../actions/testActions';
import '../styles/horizontal-loader.css';
import { apiUrl } from '../config';


function mapStateToProps(state) {
	return {
		currentDevice: state.dashboardReducer.currentDevice.data,
        testsList: state.testReducer.currentTest.tests,
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

    downloadReport = () => {
    	const deviceData = { ...this.props.currentDevice };
    	const testsList = this.props.testsList
    		.filter(item => !item.pending);

    	const data = {
    		camInfo: {...deviceData},
    		runnedTests: [testsList]
    	}

    	fetch(`${apiUrl}/api/report`, {
    	 	method: 'POST',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
    		body: JSON.stringify(data) })
    	.then(resp => resp.json())
    	.then(console.log)
    	// console.log(reportUrl)
    }

    returnBack = () => {
    	this.props.testActions.closeTestAction();
    }

    render() {

        const downloadBtn = (
            <button className="ml-3 btn btn-primary" onClick={() => { this.downloadReport() }}>
              Download Report
            </button>)

        const backBtn = (
            <button className="ml-3 btn btn-primary" onClick={() => { this.returnBack() }}>
              Back
            </button>)

        const listItems = this.props.testsList.map((item, index) => (
            <div className="card" key={index}>
              <div className="card-header" id={`heading${index}`}>
                <h5 className="mb-0 d-flex justify-content-between align-items-center">
                  <button className="btn btn-link" style={{color: 'black'}} data-toggle="collapse" data-target={`#collapse${index}`} aria-expanded="true" aria-controls={`#collapse${index}`}>
                      {item.name} ({item.service})                
                  </button>
                  <div className="d-inline-block">
                  	{item.pending ? (<div className="typing_loader"></div>) : null }
                  	{item.error ? 'error' : null}
                  </div>
                </h5>
              </div>
              <div id={`collapse${index}`} className="collapse" aria-labelledby={`#heading${index}`} data-parent="#accordion">
                <div className="card-body">
                  {item.data.result ? <p>{item.data.result.supported?"supported":"not supported"}</p>: (null)} 
                </div>
              </div>
            </div>            
        ));
        
        return (
            <React.Fragment>
              <h5>Report:</h5>
              <div className="card">
                <div className="card-body">
                    <div id="accordion">
                      {listItems}
                    </div>
                    <div className="form-group d-flex justify-content-end mt-4">
                      {downloadBtn}
                      {backBtn}
                    </div>
                </div>
              </div>
            </React.Fragment>
            
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Report)