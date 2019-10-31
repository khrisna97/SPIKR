import React, {useState} from "react";
import {Drawer} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan} from "@fortawesome/free-solid-svg-icons";
import {Collapse, Input} from "reactstrap";
import {DeleteAccount} from '../../Api/allroles';
import Forms from "../../Component/Form";
import DeleteAccountCOnfig from "../../FormConfig/DeleteAccount";
import {HapusAkun, HapusAkunLoading} from "../../Component/FormButton";

const KonselorText="Penting ! Apabila anda menghapus akun semua data anda tidak akan terhapus oleh sistem hanya akun anda yang kami hapus";

const Form = ({showForm})=>{
    const [status, setstatus ] = useState('normal');
    const [timer, setTimer ] = useState(0);
    const [errors, seterrors ] = useState({});
    const FormHandler = (data) =>{
        setstatus('process');
        DeleteAccount(data, ({errors})=>{
            console.log(errors);
            if (errors){
                seterrors(errors);
            }
            setstatus('normal');
        });

    };
    const SubmitBtn = (prop) =>{
        switch (status) {
            case 'normal' : return <HapusAkun {...prop}/>;
            case 'process' : return <HapusAkunLoading {...prop}/>;
        }
    };
    return (
        <Collapse isOpen={showForm}>
            <div className="row mt-5">
                {
                    showForm ?

                        <Forms
                            Handler={FormHandler}
                            Config={DeleteAccountCOnfig}
                            Button={(prop)=><div className="col-sm-6 d-flex align-items-center"><SubmitBtn {...prop} /></div>}
                            Errors={errors}
                            Wrapper={({children})=><div className='col-md-6' children={children} />}
                        /> :""
                }
            </div>
        </Collapse>

    )
};

export default  ()=>{
    const [modalOpen , setModalOpen] = useState(false);
    const [showForm , setShowForm] = useState(false);

    const Reset = ()=>{
        setModalOpen(false);
        setShowForm(false);
    };
    return <div>
        <Drawer keepMounted
                PaperProps={{style:{backgroundColor:'var(--danger)'}}}
                open={modalOpen}
                BackdropProps={{onClick:Reset}}
                anchor={'bottom'}
        >
            <div className="p-5">
                <h1 className='text-white border-bottom'>Hapus akun</h1>
                <div className=''>
                    <p className='font-weight-900'>
                        {KonselorText}
                    </p>
                    <h2 className={'text-white'}>
                        Apakah anda yakin ?
                    </h2>
                    <button disabled={showForm} className="btn" onClick={()=>setShowForm(!showForm)}>
                        Ya
                    </button>
                    <button onClick={Reset} className="btn btn-primary">
                        Tidak
                    </button>
                    <Form showForm={showForm} />
                </div>
            </div>
        </Drawer>
        <button onClick={()=>setModalOpen(!modalOpen)} className="btn btn-danger">
            <FontAwesomeIcon icon={faBan} className='mr-2'/>
            Hapus akun
        </button>
    </div>
};
