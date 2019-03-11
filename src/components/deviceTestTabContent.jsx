import React, { Component } from 'react';
import Table from './table.jsx'

export default class DeviceTestTabContent extends Component {

    state = {
      selected_test: null
    }

    chooseTestType = (device) => {
      this.setState({selected_test: device});
    }


    render() {
        const { currentDeviceData } = this.props;
        const dropdownItems = currentDeviceData['Supported Services'].map((device, id) =>                 
          <a 
            className={`dropdown-item${this.state.selected_test === device ? " active" : ""}`} 
            href="#" 
            key={ id }
            onClick={() => {this.chooseTestType(device)}}
            >
              {device}
            </a>
        )       

        return (
            <div className="card-body">
              <h5 className="card-title">Device Test</h5>
              
              <div className="container">
                <div className="row">
                  <div className="col-sm-12 col-md-4">
                    <div className="dropdown">
                      <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.state.selected_test?this.state.selected_test:"Choose test"}
                      </button>
                      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      { dropdownItems }
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-4">
                    <button className="btn btn-secondary" type="button">
                      About Test
                      </button>
                  </div>
                  <div className="col-sm-12 col-md-4"></div>
                </div>
              </div>
              <div className="container">
                <div className="row mt-1">
                  { <Table currentDeviceData={this.props.currentDeviceData} selected_test={this.state.selected_test}/> }
                </div>
              </div>
            </div>
        )
    }
}

