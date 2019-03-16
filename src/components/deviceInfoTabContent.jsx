import React from 'react';

const DeviceInfoTabContent = (props) => {
    return (
        <div className="card-body">
            <h5 className="card-title">Device Information:</h5>
            <div className="card">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Address: {`${props.currentDeviceData['ip']}:${props.currentDeviceData['port']}`}</li>
                    <li className="list-group-item">Manufacturer: {props.currentDeviceData['Manufacturer']}</li>
                    <li className="list-group-item">Model: {props.currentDeviceData['Model']}</li>
                    <li className="list-group-item">Firmware Version: {props.currentDeviceData['Firmware Version']}</li>
                    <li className="list-group-item">Serial Number: {props.currentDeviceData['Serial Number']}</li>
                    <li className="list-group-item">Hardware ID: {props.currentDeviceData['Hardware ID']}</li>
                </ul>
            </div>
        </div>
    )
}

export default DeviceInfoTabContent;