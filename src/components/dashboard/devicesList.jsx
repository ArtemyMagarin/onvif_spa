import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as DashboardAction from '../../actions/dashboardActions';
import '../../styles/horizontal-loader.css';


function mapStateToProps(state) {
    return {
        list: state.dashboardReducer.list.devices,
        devices: state.dashboardReducer.list,
        currentDevice: state.dashboardReducer.currentDevice,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dashboardActions: bindActionCreators(DashboardAction, dispatch)
    }
}

const ListItem = ({id, text, onClick, active, pending}) => {
    return (
        <button key={id} type="button" onClick={onClick} className={`list-group-item d-flex justify-content-between list-group-item-action${active?" active":""}`}>
            {text}
            {pending?(<div className="typing_loader"></div>):(null)}
        </button>
    )
}

export class DevicesList extends React.Component {

    componentDidMount() {
        this.props.dashboardActions.getDevicesList();
    }

    render() {
        const listItems = this.props.list.map((item, id) => (
            <ListItem
                key={id}
                text={`${item.ip}:${item.port}`}
                onClick={() => {this.props.dashboardActions.getDevice(item.ip, item.port)}}
                active={this.props.currentDevice.data.ip === item.ip
                        && this.props.currentDevice.data.port === item.port
                        && this.props.currentDevice.show}
                pending={this.props.currentDevice.data.ip === item.ip
                        && this.props.currentDevice.data.port === item.port
                        && this.props.currentDevice.pending}
                />
        ))

        return (
            <React.Fragment>
                <div className="row mb-2">
                    <div className={'col d-flex align-items-baseline justify-content-between'}>
                        <span className="h5 m-0">
                          Devices
                          <i className="d-sm-inline-block d-md-none small align-middle material-icons ml-1"
                            data-toggle="collapse" href="#collapseDevicesList" role="button" 
                            aria-expanded="false" aria-controls="collapseDevicesList" style={{'cursor': 'pointer'}}>
                            radio_button_checked
                          </i>
                        </span>
                        {this.props.devices.pending ? (
                        <div className="typing_loader"></div>):(
                          <span className="m-0">
                            <i className="align-middle material-icons" style={{'cursor': 'pointer'}}
                            onClick={ () => {this.props.dashboardActions.getDevicesList()}}>refresh</i>
                          </span>)}
                    </div>
                </div>
                <div className="collapse show" id="collapseDevicesList">
                    <div className="row">
                        <div className="col">
                            <div className="list-group">
                                {listItems}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
            
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DevicesList)
