import React from 'react';
import StreamContainer from '../stream/stream'
// Modal for ClassInteractiveTest with snapshots

const Modal = (props) => {
	return (
        <div className="modal fade" id={props.id} tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-lg modal-dialog-scrollable" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" onClick={()=>{props.onClose && props.onClose()}}>{`${props.title}`}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <StreamContainer dontkill={true} ip={props.ip} port={props.port}/>
            </div>
            <div className="modal-footer">
                {props.testIsDone && <React.Fragment>
                    <button type="button" className="btn btn-danger" onClick={()=>{props.onTestFailed && props.onTestFailed()}}>Failed</button>
                    <button type="button" className="btn btn-success" onClick={()=>{props.onTestPassed && props.onTestPassed()}}>Passed</button>
                </React.Fragment>}
                {(props.testInProgress && !props.testIsDone) ? (<span>Test in progress...</span>) : (null)}
                {(!props.testInProgress && !props.testIsDone) ? (<button type="button" className="btn btn-primary" onClick={()=>{props.onStart && props.onStart()}}>Start the test</button>) : (null)}
                
            </div>
            </div>
        </div>
        </div>
	)
}

export default Modal;
