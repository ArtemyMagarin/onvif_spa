import React, { Component } from 'react';
import Table from './table.jsx'


const ListItem = ({id, text, onClick}) => {
    return (
        <button key={id} type="button" onClick={onClick} className={`list-group-item d-flex justify-content-between list-group-item-action`}>
            {text}
        </button>
    )
}

const flatten = list => list.reduce(
    (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
);


export default class DeviceTestTabContent extends Component {

    state = {
      selected_test_type: null,
      left_column: [],
      right_column: []
    }

    chooseTestType = (event) => {
      let current_test = this.props.currentDeviceData.avaliable_tests.filter(test_type => test_type.service === event.target.value);
      let available_tests = current_test.length > 0 ? current_test[0].available_tests : [];
      
      this.setState({
        selected_test_type: event.target.value,
        left_column: available_tests
          .filter(test => (this.state.right_column.filter(test => test.name === test && test.service === event.target.value).length === 0))
          .map(test_name => ({ name: test_name, service: event.target.value }))
      });
    }

    addToRightColumn = (name, service) => {
      if (this.state.right_column.filter(test => test.name === name && test.service === service).length === 0) {
        this.setState({
          right_column: [ { name, service }, ...this.state.right_column ]
        })
      }
    }

    removeFromRightColumn = (name, service) => {
      this.setState({
          right_column: this.state.right_column.filter(item => !(item.name === name && item.service === service))
      })
    }

    getAddFullListBtn = () => {
      let avaliable_tests = this.props.currentDeviceData.avaliable_tests;
      let allTests = flatten(avaliable_tests.map(test_service => test_service.available_tests.map(name => ({name, service: test_service.service}))));
      return (<button className="ml-3 btn btn-primary" onClick={() => { this.setState({right_column: [...allTests]}) }}>{`Add all ${allTests.length} tests`}</button>) 
    }




    render() {
        const { currentDeviceData } = this.props;
        const dropdownItems = currentDeviceData['Supported Services'].map((device, id) =>                 
          <option
            key={id}>
            {device}
          </option>
        ) 

        const leftItems = this.state.left_column
        .filter(item => (this.state.right_column.filter(test => test.name === item.name && test.service === item.service).length === 0))
        .map((item, id) => (
            <ListItem 
                key={id} 
                text={`${item.name} (${item.service})`} 
                onClick={() => { this.addToRightColumn(item.name, item.service) }}
            />
        ))  

        const rightItems = this.state.right_column.map((item, id) => (
            <ListItem 
                key={id} 
                text={`${item.name} (${item.service})`} 
                onClick={() => { this.removeFromRightColumn(item.name, item.service) }}
            />
        ))  

        const runBtn = (<button className="ml-3 btn btn-primary" onClick={() => {}}>{`Run ${rightItems.length} test${rightItems.length===1?'':'s'}`}</button>)     
        const addAll = leftItems.length > 0 ? (<button className="mb-3 btn btn-success" onClick={() => { this.setState({right_column: [...this.state.left_column, ...this.state.right_column]})}}>Add all to the right</button>) : (null); 
        const removeAll = rightItems.length > 0 ? (<button className="mb-3 btn btn-danger" onClick={() => { this.setState({right_column: []}) }}>Empty list</button>) : (null);    
        const addFullList = this.getAddFullListBtn();

        return (
          <React.Fragment>
            <div className="card-body">
              <h5 className="card-title">Device Test</h5>
              <p className="small text-muted">
                Select test type. 
                Choose tests and add them into right column. 
                When Run button pressed, tests from the right column
                will be executed. Click on the test name to add or remove from the list.
              </p>
              <div className="form-inline">
                <div className="form-group">
                  <label className="my-1 mr-2" htmlFor="selectTestDropdown">Test type:</label>
                  <select 
                    id="selectTestDropdown"
                    value={this.state.selected_test_type ? this.state.selected_test_type : ''} 
                    className="form-control"
                    onChange={this.chooseTestType}
                  >
                    <option value="">not selected</option>
                    { dropdownItems }
                  </select>
                </div>
                <div className="form-group d-flex justify-content-between">
                  {addFullList}
                  {runBtn}
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col">
                    {addAll}
                    <div className="list-group">
                        {leftItems}
                    </div>
                </div>
                <div className="col">
                    {removeAll}
                    <div className="list-group">
                        {rightItems}
                    </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        )
    }
}

