import React from 'react';
import { apiUrl } from '../../config';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as DashboardAction from '../../actions/dashboardActions';
import StreamContainer from '../stream/stream';
import '../../styles/switch.css';
import '../../styles/style.css';


function mapStateToProps(state) {
    return {
        currentSnapshot: state.dashboardReducer.currentDevice.currentSnapshot,
        snapshotsList: state.dashboardReducer.snapshotsList.snapshots
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dashboardActions: bindActionCreators(DashboardAction, dispatch)
    }
}

class DeviceStreamTabContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 'snapshot',
            prevSnapshot: props.snapshot_url
        }
    }

    componentDidMount() {
        console.log(this.props.currentDeviceData.ip)
        console.log(this.props.currentDeviceData.port)
        this.props.dashboardActions.getDeviceSnapshots(this.props.currentDeviceData.ip, this.props.currentDeviceData.port);
        this.props.dashboardActions.refreshImage(this.props.currentDeviceData.ip, this.props.currentDeviceData.port)
        console.log(this.props)
    }

    togglePicture = () => {
        if (this.state.tab === 'snapshot') {
            this.setState({tab: 'stream'});
        } else {
            this.setState({tab: 'snapshot'});
        }
    }

    refreshImage = () => {
      this.setState({prevSnapshot: this.props.currentSnapshot ? (this.props.currentSnapshot.url || this.state.prevSnapshot) : this.state.prevSnapshot})
      this.props.dashboardActions.refreshImage(
        this.props.currentDeviceData.ip,
        this.props.currentDeviceData.port)
    }

    render() {
        let url = apiUrl + (this.state.tab === 'snapshot' ? ((this.props.currentSnapshot && this.props.currentSnapshot.url) ? this.props.currentSnapshot.url : this.state.prevSnapshot): this.props.stream_url);
        url = url + (~url.indexOf('?')?'&':'?') + `t=${Date.now()}`;

        const snapshot_avaliable = this.props.private_snapshot_url ? !(this.props.private_snapshot_url.includes("rtsp")) : null;

        const carouselItems = this.props.snapshotsList ? this.props.snapshotsList.map((item, id) => (
            <div key={id} className={`carousel-item ${id === 0 ? 'active': ''}`}>
              <img src={`${apiUrl}${item.url}`} className="d-block w-100" alt={`Snapshot${id}`}/>
              <div className="carousel-caption">
                <h5>{item.camera}</h5>
                <p>{item.datetime}</p>
              </div>
            </div>
        )) : []

        const toggler = (
            <div className="switch-wrapper">
                Show snapshot
                <label className="switch">
                    <input type="checkbox" checked={this.state.tab === 'stream'} onChange={this.togglePicture}/>
                    <span className="slider"></span>
                </label>
                Show Stream
            </div>
        )
        
        const spinner = (<div style={{'top': 0, 'pointerEvents': 'none'}} className="d-flex justify-content-center align-items-center w-100 h-100 position-absolute">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>)

        const image = (this.state.tab === 'snapshot') ? (<div className="position-relative">
          {<img src={url} alt="snapshot" className="stream-image" onClick={() => {this.refreshImage()}}/>}
          {(!this.props.currentSnapshot || this.props.currentSnapshot.pending) ? spinner : (null)}
        </div>) : (<StreamContainer spinner={spinner} ip={this.props.currentDeviceData.ip} port={this.props.currentDeviceData.port}/>)


        return (
            <div className="card-body">
                <h5 className="card-title">RTSP Stream:</h5>
                <div className="card snapshot-card">
                <div className="row align-items-center">
                  <div className="col-sm-12 col-md-6">{toggler}</div>
                  <div className="col-sm-12 col-md-6">
                    <div>
                      <button type="button" className="btn btn-sm mr-2 btn-secondary"
                        type="button" data-toggle="collapse" data-target="#showRtspUrl"
                        aria-expanded="false" aria-controls="showRtspUrl">
                        RTSP Url
                      </button>
                      <button type="button" className="btn btn-sm mr-2 btn-secondary"
                        type="button" data-toggle="collapse" data-target="#showSnapshotUrl"
                        aria-expanded="false" aria-controls="showSnapshotUrl">
                        Snapshot Url
                      </button>
                      <button type="button" className="btn btn-sm btn-primary"
                        data-toggle="modal" data-target=".bd-slideshow-modal-lg">
                        Slideshow
                      </button>
                    </div>
                  </div>
                </div>
                    {image}
                </div>
                <div className="collapse" id="showRtspUrl">
                  RTSP avaliable at:
                  <a href={this.props.private_stream_url}>
                    {' ' + this.props.private_stream_url}
                  </a>
                </div>
                <div className="collapse" id="showSnapshotUrl">
                  {!this.props.private_snapshot_url ? ('Device does not support Snapshot or Snapshot Url content is not valid') : (!snapshot_avaliable ? 'Device does not support Snapshot or Snapshot Url content is not valid'
                  : 'Snapshot avaliable at:')}
                  {!this.props.private_snapshot_url ? (null) : (!snapshot_avaliable ? (null) :
                    <a href={this.props.private_snapshot_url} target="_blank" rel="noopener noreferrer">
                      {' ' + this.props.private_snapshot_url}
                    </a>
                  )}
                </div>
                <div className="modal fade bd-slideshow-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div id="carousel-slideshow" className="carousel" data-ride="carousel">
                            <div className="carousel-inner">
                              {carouselItems}
                            </div>
                            <a className="carousel-control-prev" href="#carousel-slideshow" role="button" data-slide="prev">
                              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                              <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#carousel-slideshow" role="button" data-slide="next">
                              <span className="carousel-control-next-icon" aria-hidden="true"></span>
                              <span className="sr-only">Next</span>
                            </a>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceStreamTabContent);
