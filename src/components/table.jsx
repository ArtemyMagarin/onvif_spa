import React, { Component } from 'react';

export default class Table extends Component {
    constructor(props) {
      super(props)
    }

    static getDerivedStateFromProps(props, state) {
      return {
        currentDeviceData: props.currentDeviceData,
        selected_test: props.selected_test
      }
    }

    render() {

      const row_data = this.props.currentDeviceData['avaliable_tests'].filter(test => (
        test.service === this.props.selected_test
      ))

      const rows = row_data.length ? (row_data[0].available_tests.map((name, id) => (
        <React.Fragment>
          <tr>
             <td>
               {`${id+1}`}  
             </td>  
             <td>
               <input type="checkbox"/>  
             </td>  
             <td>
               {`${name}`}  
             </td>  
          </tr>
        </React.Fragment>
      ))) : (null)

       
  	return (
  		<table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Select</th>
            <th scope="col">Test</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
}

