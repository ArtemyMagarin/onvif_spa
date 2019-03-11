import React, { Component } from 'react';

export default class Table extends Component {
    render() {
    //     const { currentDeviceData } = this.props;
    //     const rowItem = currentDeviceData['Supported Services'].map((device, id) =>                 
    //     <tr key = { id }>
    //       <th scope="row"></th>
    //       <td></td>
    //       <td></td>
    //       <td></td>
    //     </tr>
    //   )      
       
	return (
		<table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Select</th>
              <th scope="col">#</th>
              <th scope="col">Test</th>
              <th scope="col">Service</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
    )
}
}

