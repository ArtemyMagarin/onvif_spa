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

export function getDeviceSnapshots(ip, port) {
    return {
        type: 'GET_DEVICE_SNAPSHOTS',
        api: {
            url: '/api/get_snapshots',
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

export function refreshImage(ip, port) {
    return {
        type: 'REFRESH_SNAPSHOT_IMAGE',
        api: {
            url: '/api/current_snapshot',
            method: 'GET',
            data : { ip, port }
        },
    };
}

export function killStream(ip, port) {
    return {
        type: 'KILL_STREAM',
        api: {
            url: '/api/stop_stream',
            method: 'GET',
            data : { ip, port }
        },
    };
}