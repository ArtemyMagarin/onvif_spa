import React, {Component} from 'react';
import { apiUrl } from '../../config';

class DeviceDatabaseTabContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reports: [],
            isFetched: false
        }
    }

    componentDidMount() {
      fetch(`${apiUrl}/api/reports`, { method: 'GET'})
     .then(resp => resp.json())
     .then(json => this.setState({reports: json, isFetched: true})
     )
    }

    render() {
        const tableItems = this.state.reports && this.state.reports.map((item, id) => (
            <tr>
              <th className="col-1" scope="row">{id+1}</th>
              <td className="col-4">{ item.device && item.device.ip }</td>))
              <td className="col-4">{ item.created }</td>))
              <td className="col-3">
                <a className="btn btn-primary" target={"_blank"} href={`${apiUrl}/${item.url}`}>
                  Download
                </a>
              </td>
            </tr>))
    return (
        <div className="card-body">
            <h5 className="card-title">Previous reports:</h5>
            {this.state.isFetched ? (
            this.state.reports.length ? (<table className="table table-bordered table-responsive-md">
              <tbody>
                {tableItems}
              </tbody>
            </table>) : "No avaliable reports"):
            (<div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>)}
        </div>
    )
}
}

export default DeviceDatabaseTabContent;