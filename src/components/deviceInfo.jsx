import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as DashboardAction from '../actions/dashboardActions';
import '../styles/loader.css';

import DeviceInfoTabContent from './deviceInfoTabContent.jsx'
import DeviceStreamTabContent from './deviceStreamTabContent.jsx'
import DeviceSettingsTabContent from './deviceSettingsTabContent.jsx'
import DeviceDatabaseTabContent from './deviceDatabaseTabContent.jsx'
import DeviceTestTabContent from './deviceTestTabContent.jsx'

function mapStateToProps(state) {
    return {
        list: state.dashboardReducer.list,
        currentDevice: state.dashboardReducer.currentDevice,
        currentDeviceData: state.dashboardReducer.currentDevice.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dashboardActions: bindActionCreators(DashboardAction, dispatch)
    }
}


export class DeviceInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: 'testing'
        }
    }

    render() {
        let currentTabContent = (null);

        if (this.state.currentTab === 'info') {
            currentTabContent = (<DeviceInfoTabContent currentDeviceData={this.props.currentDeviceData}/>)
        }

        if (this.state.currentTab === 'stream') {
            currentTabContent = (<DeviceStreamTabContent
            snapshot_url={this.props.currentDeviceData['snapshot_url']}
            private_snapshot_url = {this.props.currentDeviceData['private_snapshot_url']}
            stream_url={this.props.currentDeviceData['stream_url']}
            private_stream_url = {this.props.currentDeviceData['private_stream_url']}
            currentDeviceData = {this.props.currentDeviceData} />);
        }

        if (this.state.currentTab === 'testing') {
            currentTabContent = (<DeviceTestTabContent currentDeviceData={this.props.currentDeviceData}/>);
        }

        if (this.state.currentTab === 'settings') {
            currentTabContent = (<DeviceSettingsTabContent currentDeviceData={this.props.currentDeviceData}/>);
        }

        if (this.state.currentTab === 'database') {
            currentTabContent = (<DeviceDatabaseTabContent currentDeviceData={this.props.currentDeviceData}/>);
        }

        if (this.props.currentDevice.show) {
            return (
                <div className="card text-left">
                  <div className="card-header">
                    <ul className="nav nav-pills card-header-tabs">
                      <li className="nav-item">
                        <a
                            className={`nav-link ${this.state.currentTab === 'info'?'active':''}`} 
                            onClick={()=>{this.setState({currentTab: 'info'})}}
                            href="#">
                                Information
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                            className={`nav-link ${this.state.currentTab === 'stream'?'active':''}`} 
                            onClick={()=>{this.setState({currentTab: 'stream'})}}
                            href="#">
                                Stream
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                            className={`nav-link ${this.state.currentTab === 'testing'?'active':''}`} 
                            onClick={()=>{this.setState({currentTab: 'testing'})}}
                            href="#">
                                Testing
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                            className={`nav-link ${this.state.currentTab === 'settings'?'active':''}`} 
                            onClick={()=>{this.setState({currentTab: 'settings'})}}
                            href="#">
                                Settings
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                            className={`nav-link ${this.state.currentTab === 'database'?'active':''}`} 
                            onClick={()=>{this.setState({currentTab: 'database'})}}
                            href="#">
                                Database
                        </a>
                      </li>
                    </ul>
                  </div>
                  {currentTabContent}
                </div>
            )
        } else {
            return (
                <div className="card text-center">
                  <div className="card-body d-flex align-items-center justify-content-center">
                    <h4 className="card-title text-center mb-0">{this.props.currentDevice.pending || this.props.list.pending ?'Loading...':'Choose device from the list'}</h4>
                    {this.props.currentDevice.pending || this.props.list.pending ? (<div className="loader"></div>):(null)}
                  </div>
                </div>
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceInfo)
