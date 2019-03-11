import React from 'react';
import { apiUrl } from '../config';
import '../styles/switch.css';
import '../styles/style.css';


export default class DeviceStreamTabContent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tab: 'snapshot'
		}
	}

	togglePicture = () => {
		if (this.state.tab === 'snapshot') {
			this.setState({tab: 'stream'});
		} else {
			this.setState({tab: 'snapshot'});
		}
	}

	render() {
		let url = apiUrl + (this.state.tab === 'snapshot' ? this.props.snapshot_url : this.props.stream_url);
		url = url + (~url.indexOf('?')?'&':'?') + `t=${Date.now()}`; 
		
		const toggler = (
			<div className="switch-wrapper">
				Show snapshot
		        <label className="switch">
		            <input type="checkbox" checked={this.state.tab === 'stream'} onClick={this.togglePicture}/>
		            <span className="slider"></span>
		        </label>
		        Show Stream
		    </div>
		)
		const image = (
			<img src={url} className="stream-image"/>
		)
		return (
			<>
				{toggler}
				{image}
			</>
		);
	}
}
