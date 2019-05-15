import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as DashboardAction from '../../actions/dashboardActions';
import * as UserAction from '../../actions/userActions';
import DevicesList from './devicesList.jsx';
import DeviceInfo from './deviceInfo.jsx';


function mapStateToProps(state) {
	return {
		dashboard: state.dashboardReducer.list,
		currentDevice: state.dashboardReducer.currentDevice,
	};
}

function mapDispatchToProps(dispatch) {
    return {
        dashboardActions: bindActionCreators(DashboardAction, dispatch),
        userActions: bindActionCreators(UserAction, dispatch),

    }
}


export class Dashboard extends React.Component {

	componentDidMount() {
		this.props.userActions.fetchUser();
	}

	render() {
		return (
			<div className="row">
				<div className="col-sm-12 col-md-3  mb-3">
					<DevicesList/>
				</div>
				<div className="col-sm-12 col-md-9">
					<DeviceInfo/>
				</div>
			</div>			
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard)
