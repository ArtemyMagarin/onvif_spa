import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as DashboardAction from '../actions/dashboardActions';


function mapStateToProps(state) {
	return {
		dashboard: state.dashboardReducer
	};
}

function mapDispatchToProps(dispatch) {
    return {
        dashboardActions: bindActionCreators(DashboardAction, dispatch)
    }
}


export class Dashboard extends React.Component {

	componentDidMount() {
        this.props.dashboardActions.getDevicesList();
    }

	render() {
		const { devices, pending, error } = this.props.dashboard;
		let camerasList = devices.map(camera => (
			<li key={camera.id}>{`${camera.ip}:${camera.port}`}</li>
		))

		if (pending || error) {
			return (
				<React.Fragment>
					<h1>{`${pending ? "Pending..." : "Error!"}`}</h1>
				</React.Fragment>
			)	
		}
		return (
			<React.Fragment>
				<ul>
					{camerasList}
				</ul>
			</React.Fragment>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard)
