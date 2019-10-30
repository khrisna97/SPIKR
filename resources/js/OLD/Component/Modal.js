import React, {useState} from 'react';
import {Button, Modal} from "reactstrap";
export default  ({header, children, onClosed, open}) => {
    const [_open, setOpen] = useState(open);
    return (
        <Modal
            className="modal-dialog-centered"
            isOpen={_open}
            toggle={() => setOpen(!_open)}
            onClosed={onClosed}
        >
            <div className="modal-header">
                <h2 className="modal-title">
                    {header}
                </h2>
                <button
                    aria-label="Close"
                    className="close"
                    data-dismiss="modal"
                    type="button"
                    onClick={() => setOpen(!_open)}
                >
                    <span aria-hidden={true}>×</span>
                </button>
            </div>
            <div className="modal-body">
                {children}
            </div>
        </Modal>
    );
};