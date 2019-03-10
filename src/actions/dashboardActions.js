export function getDevicesList() {
    return {
        type: 'GET_DEVICES_LIST',
        api: {
            url: '/api/devices',
            method: 'GET'
        },
    };
}