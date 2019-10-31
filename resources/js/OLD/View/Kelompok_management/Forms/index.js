import React from "react";
import {Button, Modal} from "reactstrap";
import UserRegistration from './UserRegistration';
class MainModal extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            header : "1. Pendaftaran konselor",
            step:0,
        }
    }

    render() {
        const {toggle} = this.props;
        return (
            <Modal
                className="modal-dialog-centered"
                isOpen={true}
                toggle={toggle}
            >
                <div className="modal-header">
                    <h3 className="modal-title" id="modal-title-default">
                        {
                            this.state.header
                        }
                    </h3>
                    <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={toggle}
                    >
                        <span aria-hidden={true}>×</span>
                    </button>
                </div>
                <div className="modal-body">
                    {
                        !this.state.step && <UserRegistration />
                    }
                </div>
                <div className="modal-footer">
                    <Button color="primary" type="button">
                        Save changes
                    </Button>
                    <Button
                        className="ml-auto"
                        color="link"
                        data-dismiss="modal"
                        type="button"
                        onClick={toggle}
                    >
                        Tutup
                    </Button>
                </div>
            </Modal>
        )
    }
}
export default MainModal