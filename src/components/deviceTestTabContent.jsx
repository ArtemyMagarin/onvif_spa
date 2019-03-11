import React, { Component } from 'react';
import Table from './table.jsx'

export default class DeviceTestTabContent extends Component {
    
    render() {
        const { currentDeviceData } = this.props;
        const dropdownItems = currentDeviceData['Supported Services'].map((device, id) =>                 
          <a className="dropdown-item" href="#" key={ id }>{device}</a>
        )       

        return (
            <div className="card-body">
              <h5 className="card-title">Device Test</h5>
              <div class="container">
                <div class="row">
                  <div class="col-sm-12 col-md-4">
                    <div className="dropdown">
                      <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Choose Test
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
                  { <Table currentDeviceData = {currentDeviceData}/> }
                </div>
              </div>
            </div>
        )
    }
}

