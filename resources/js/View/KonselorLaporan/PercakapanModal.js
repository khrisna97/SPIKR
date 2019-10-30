import React from "react";
import {GetPatientApi} from "../../Api/KonselingApi";
import PersonalChat from "../../Websocket/PersonalChat";
import ChatWrapper from "../../Component/ChatWrapper";
import {Webproperty} from "../../Hooks/Webprop";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import MessageBox from "../../Component/MessageBox";

class PercakapanModal extends React.Component{

    state = {
        modalopen : false,
        user : null,
    };


    componentDidMount() {
        console.log("mounted")
    }

    Setup = ({id, name})=>{
        console.log(id);
        this.setState({
            modalopen:true,
        })
    };

    render() {

        const {selectedUser, personal, anggota} = this.props;

        let MessageBoxProp = null;

        if (selectedUser){
            MessageBoxProp = {
                api:{
                    method : GetPatientApi,
                    param : {patient_id: selectedUser.id},
                },
                userid: personal.id,
                Container : (prop)=><div {...prop} className='py-3 rounded border' style={{height:"60vh",overflow:'auto'}} />,
                ItemWrapper : (prop)=> ChatWrapper(prop, personal),
            };
        }

        console.log(selectedUser);

        return (
            <div>
                <button disabled={!selectedUser}
                        onClick={()=>{
                            if (selectedUser){
                                this.Setup(selectedUser)
                            }
                        }}
                        className="btn btn-primary">
                    Tampilkan percakapan
                </button>
                <Modal isOpen={this.state.modalopen} toggle={()=>this.setState({
                    modalopen : !this.state.modalopen
                })} >
                    <h3 className="modal-header border-bottom">
                        {
                            selectedUser? 'Percakapan anda dengan '+ selectedUser.name : ""
                        }
                    </h3>
                    <ModalBody className={'mt-0 pt-0'}>
                        {
                            MessageBoxProp ?
                                <MessageBox {...MessageBoxProp} /> : ""
                        }
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default (prop)=> <Webproperty.Consumer >
    {
        ({personal, anggota})=> <PercakapanModal personal={personal} anggota={anggota} {...prop} />
    }
</Webproperty.Consumer>  ;