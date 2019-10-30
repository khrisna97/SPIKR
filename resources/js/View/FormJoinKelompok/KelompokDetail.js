import React from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import BigLoader from "../../Component/BIGLoader";
import {JoinGroup} from "../../Api/GroupApi";

const ConfirmInfo = ({nama})=><div>
    <h3 className='text-center'>
        Apakah anda yakin untuk join kelompok ini?
    </h3>
    <h3 className={'text-black text-center'}>
        {nama}
    </h3>
</div>;

const JoinedInfo =({nama})=><div className='text-center'>
    <h3 className='text-center'>
        Selamat anda telah bergabung dengan kelompok {nama}
    </h3>
    <p>
        Silahkan refresh halaman atau tekan tombol dibawah
    </p>
</div>;
class KelompokDetail extends React.Component{

    state = {
        open:true,
        status : 'info',
        text : 'Ya'
    };

    ConfirmHandler = ()=>{
        const {status} = this.state;
        const {id} = this.props;

        console.log(id);

        switch (status) {
            case "joined": {
                window.location.reload();
                break;
            }
            case 'info':{
                this.setState({
                    status:'loading'
                });
                setTimeout(()=>{
                    JoinGroup(id).then(_=>{
                        this.setState({
                            status:'joined',
                            text:'Refresh halaman'
                        });
                    })
                }, 1000);
                break;
            }
        }
    };

    render() {
        const {Reset, nama, ketua} = this.props;
        const {status, text} = this.state;
        console.log(this.props);
        return (
            <div>
                <Modal isOpen={this.state.open} toggle={Reset}>
                    <ModalHeader toggle={Reset}>
                    </ModalHeader>
                    <ModalBody>
                        {
                            status === 'info' ? <ConfirmInfo nama={nama} /> : ""
                        }
                        {
                            status === 'loading' ? <BigLoader /> : ""
                        }
                        {
                            status === 'joined' ? <JoinedInfo nama={nama} /> : ""
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button disabled={status==='loading'} onClick={this.ConfirmHandler}  color="primary" >{
                            text
                        }</Button>{' '}
                        {
                            status !== 'joined' ?
                                <Button disabled={status==='loading'} onClick={Reset} color="danger" >Tutup</Button>
                                :""
                        }
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default KelompokDetail;