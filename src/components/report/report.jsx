import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Summary from './summary.jsx'
import * as TestAction from '../../actions/testActions';
import '../../styles/horizontal-loader.css';
import { apiUrl } from '../../config';
import errorImg from '../../assets/letter-x.png'
import fetchedImg from '../../assets/tick.png'
import Modal from './modal.jsx'
import $ from 'jquery';


function mapStateToProps(state) {
    return {
        currentDevice: state.dashboardReducer.currentDevice.data,
        testsList: state.testReducer.tests,
        testsFetched: state.testReducer.testInProgress,
        testsDone: state.testReducer.done,
        currTestIndex: state.testReducer.currIndex,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        testActions: bindActionCreators(TestAction, dispatch)
    }
}



export class Report extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isReportReady: false
      }
    }

    handleDownload = (value) => {
        this.setState(
          {
            isReportReady: value
          }
        )
    }

    componentDidMount() {
        this.runTest()
    }
    componentDidUpdate() {
        this.runTest()
    }

    runTest() {
        const currTest = this.props.testsList[this.props.currTestIndex];
        if (!this.props.testsDone 
            && currTest
            && !currTest.pending
            && Object.entries(currTest.data).length === 0
            && !this.state.showModal) {

            if (~currTest.name.indexOf('Interactive')) {
                $('#streamModal').modal('show')
            } else {
                $('#streamModal').modal('hide')
               this.props.testActions.runTest() 
            }
        }
    }

    resolveTestManually(resolution, index) {
        this.props.testActions.nextTest()
        this.props.testActions.resolveTestManually(resolution, index)
    }

    downloadReport = () => {
      this.handleDownload(true);
    	const deviceData = { ...this.props.currentDevice };
    	const testsList = this.props.testsList
        .filter(item => !item.pending && !item.error);

      const result = testsList.reduce((summary, item) => {
        summary[item.service] = summary[item.service] || [];
        summary[item.service].push(item);
        return summary;
      }, {});

    	const data = {
    		camInfo: {...deviceData},
    		runnedTests: {...result}
      }

      console.log(data);

    	fetch(`${apiUrl}/api/report`, {
    	 	method: 'POST',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
    		body: JSON.stringify(data) })
      .then(resp => resp.json())
      .then(json => {
        window.open(`${apiUrl}/${json.response}`, '_blank');
        this.handleDownload(false);
        }
      )
    }

    returnBack = () => {
        fetch(`${apiUrl}/api/stop_stream?ip=${this.props.currentDevice.ip}&port=${this.props.currentDevice.port}`)
        .then(() =>{})
        .catch(() =>{})
        this.props.testActions.closeTestAction();
    }

    render() {
        const downloadBtn = !this.state.isReportReady ? (
          <button className="ml-3 btn btn-primary" onClick={() => { this.downloadReport() }}>
            Download Report
          </button>) : (
          <button className="ml-3 btn btn-primary" type="button" disabled>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true">
            </span>
            {'    Loading...'}
          </button>
          )

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
                    {item.error ? (<img src={ errorImg } alt="error"/>) : null }
                    {item.data.result ? (<img src={ fetchedImg }/>) : null }
                  </div>
                </h5>
              </div>
              <div id={`collapse${index}`} className="collapse" aria-labelledby={`#heading${index}`} data-parent="#accordion">
                <div className="card-body">
                  {item.data.result ? <p>{item.data.result.supported?`${item.name} is supported`:`${item.name} is not supported`}</p>: (null)}
                  {item.data.result ? <p>{item.data.result.extension?`Test Feature: ${item.data.result.extension}`:(null)}</p>: (null)}
                  {item.data.result ? <pre>{item.data.result.response?`Response: ${item.data.result.response}`:(null)}</pre>: (null)}
                </div>
              </div>
            </div>
        ));

        const tCurrTest = this.props.testsList[this.props.currTestIndex];
        const currIndex = this.props.currTestIndex
        const modalTitle = tCurrTest ? tCurrTest.name : "N/A";
        const testInProgress = tCurrTest && tCurrTest.pending;
        const testIsDone = tCurrTest && Object.entries(tCurrTest.data).length !== 0

        return (
            <React.Fragment>
              <h5>Report:</h5>
              <div className="card">
                <div className="card-body">
                    <button className="m-1 btn btn-primary" data-toggle="collapse" data-target="#summary">Summary</button>
                    <div id="summary" className="m-2 collapse">
                      <Summary testResponse = { this.props.testsList } />
                    </div>
                    <div id="accordion">
                      {listItems}
                    </div>
                    <div className="form-group d-flex justify-content-end mt-4">
                      {downloadBtn}
                      {backBtn}
                    </div>
                </div>
              </div>
              {<Modal 
                id={'streamModal'} 
                title={modalTitle}
                ip={this.props.currentDevice.ip}
                port={this.props.currentDevice.port}
                testInProgress={testInProgress}
                testIsDone={testIsDone}
                onStart={() => {this.props.testActions.runTest()}}
                onClose={() => {this.props.testActions.nextTest()}}
                onTestFailed={()=>{this.resolveTestManually(false, currIndex)}}
                onTestPassed={()=>{this.resolveTestManually(true, currIndex)}}
                />}
            </React.Fragment>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Report)
