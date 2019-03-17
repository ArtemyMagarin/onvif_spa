import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TestAction from '../actions/testActions';
import '../styles/horizontal-loader.css';


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

    downloadReport = () => {}
    returnBack = () => {}

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
            <div class="card">
              <div class="card-header" id={`#heading${index}`}>
                <h5 class="mb-0">
                  <button class="btn btn-link" data-toggle="collapse" data-target={`#collapse${index}`} aria-expanded="true" aria-controls={`#collapse${index}`}>
        	        <p>
                      Test: {item.name}
                      Service: {item.service}                
                    </p>
                    {item.pending?(<div className="typing_loader"></div>):(null)}
                    {item.error?'error':''}
                  </button>
                </h5>
              </div>
              <div id={`#collapse${index}`} class="collapse show" aria-labelledby={`#heading${index}`} data-parent="#accordion">
                <div class="card-body">
                  {item.data.result === undefined? <p>{item.data.result.supported}</p>: (null)} 
                </div>
              </div>
            </div>            
        ));
        
        return (
            <React.Fragment>
              <h5>Report:</h5>
              <div class="card">
                <div class="card-body">
                    <div id="accordion">
                      {listItems}
                    </div>
                    <div className="form-group d-flex justify-content-between">
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