import React from 'react';
import StreamContainer from '../stream/stream'
// Modal for ClassInteractiveTest with snapshots

const Modal = (props) => {
	return (
        <div className="modal fade" id={props.id} tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-scrollable" role="document">
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
                <button type="button" className="btn btn-secondary" onClick={()=>{props.onClose && props.onClose()}} data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={()=>{props.onStart && props.onStart()}}>Start test</button>
            </div>
            </div>
        </div>
        </div>
	)
}

export default Modal;
