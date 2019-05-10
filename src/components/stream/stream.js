import React from 'react';
import { apiUrl } from '../../config';
import Hls from 'hls.js';
	
export default class StreamContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ip: props.ip,
			port: props.port,
			hls: (new Hls()),
			loaded: false,
			supported: Hls.isSupported()
		}
	}

	componentDidMount() {
		if (this.state.supported) {
			const video = document.getElementById(`${this.state.ip}${this.state.port}`);
			console.log(video)
			this.state.hls.attachMedia(video);
			this.state.hls.loadSource(`${apiUrl}/livestream?ip=${this.state.ip}&port=${this.state.port}`);
			this.state.hls.on(Hls.Events.MANIFEST_PARSED, () => { 
				this.setState({loaded: true})
				video.play() 
			})
		}
	}

	componentWillUnmount() {
		!this.props.dontkill && fetch(`${apiUrl}/api/stop_stream?ip=${this.state.ip}&port=${this.state.port}`)
		.then(() =>{})
		.catch(() =>{})
		!this.props.dontkill && this.state.hls.stopLoad()
	}

	render() {
		const video = (<video controls="true" className="w-100" id={`${this.state.ip}${this.state.port}`} 
			style={{'display': (this.state.loaded ? 'block': 'none')}}/>);

		const spinner = this.props.spinner;

		return this.state.supported ? ( 
			<div className="position-relative">
				{video}
				{!this.state.loaded ? (spinner) : (null)}
			</div>
		) : (<p>Stream is not supported on your device.</p>);
	}
}
	