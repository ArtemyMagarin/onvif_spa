export function getDevicesList() {
    return {
        type: 'GET_DEVICES_LIST',
        api: {
            url: '/api/devices',
            method: 'GET'
        },
    };
}

export function getDevice(ip, port) {
    return {
        type: 'GET_DEVICE',
        api: {
            url: '/api/device',
            method: 'GET',
            data : { ip, port }
        },
    };
}

export function showCurrentDevice() {
	return {
		type: 'HIDE_CURRENT_DEVICE',
	}
}