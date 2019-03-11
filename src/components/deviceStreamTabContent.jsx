import React from 'react';
import { apiUrl } from '../config';

const DeviceStreamTabContent = ({snapshot_url, stream_url}) => {
	return (
		<p>{`${apiUrl}${snapshot_url}, ${apiUrl}${stream_url}`}</p>
	)
}

export default DeviceStreamTabContent;