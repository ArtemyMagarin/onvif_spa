import React, { useState, useEffect } from 'react';
import { apiUrl } from '../../config';
import Hls from 'hls.js';

const StreamContainer = (props) => {

	const [loaded, setLoaded] = useState(false);

	const hls = new Hls();
	const video = (<video id={`${props.ip}${props.port}`} 
		style={{'display': (loaded? 'block': 'none')}}/>);

	useEffect(() => {
		const v = document.getElementById(`${props.ip}${props.port}`);
		console.log(v)
		hls.attachMedia(v);
		hls.loadSource(`${apiUrl}/livestream?ip=${props.ip}&port=${props.port}`);
		hls.on(Hls.Events.MANIFEST_PARSED, () => { 
			setLoaded(true)
			v.play() 
		})
	});

	if(Hls.isSupported()) {
		return (<React.Fragment>
			{video}
			{!loaded ? (<p>Loading...</p>) : (null)}
		</React.Fragment>)
	} else {
		return <p>Stream is not supported on your device.</p>
	}
}

export default StreamContainer;