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

    handleDownload = (uri) => {
      console.log(uri);
    }

    render() {
        const tableItems = this.state.reports && this.state.reports.map((item, id) => (
            <tr>
              <th className="col-1" scope="row">{id+1}</th>
              <td className="col-4">{ item.device.ip }</td>))
              <td className="col-4">{ item.created }</td>))
              <td className="col-3">
                <button className="btn btn-primary" onClick={() => this.handleDownload(item.url)}>
                  Download
                </button>
              </td>
            </tr>))
    return (
        <div className="card-body">
            <h5 className="card-title">Previous reports:</h5>
            {this.state.isFetched ? (
            <table className="table table-bordered table-responsive-md">
              <tbody>
                {tableItems}
              </tbody>
            </table>):
            (<div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>)}

        </div>
    )
}
}

export default DeviceDatabaseTabContent;