import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRedo, faUsersCog} from "@fortawesome/free-solid-svg-icons";
import Config from  "../../FormConfig/EditKelompok";
import Forms from "../../Component/Form";
import {EditKelompokBTN, EditKelompokBTNLoading} from "../../Component/FormButton";
import {Collapse} from "reactstrap";
import Drawer from "@material-ui/core/Drawer";
import {KonselorEditKelompok} from "../../Api/KonselorAdminApi";
import FormSuccess from "../../Component/FormSuccess";

const FormEditKelopok = ({data}) =>{
    const { id} = data;
    const [open, SetOpen] = useState(false);
    const [status, SetStatus] = useState('normal');
    const [error, SetError] = useState('normal');

    const FormHandler = data =>{
        if (Object.keys(data).length){
            KonselorEditKelompok(id,data, SetStatus, ()=>{}, SetError);
        }
    };

    const SubmitBtn = (prop) =>{
        switch (status) {
            case 'normal' : return <EditKelompokBTN {...prop}/>;
            case 'process' : return <EditKelompokBTNLoading {...prop}/>;
        }
    };

    return (
        <div>
            <div className="text-right">
                <button  onClick={()=>SetOpen(!open)} className="btn btn-sm btn-warning">
                    <FontAwesomeIcon className='mr-2' icon={faUsersCog} />
                    Edit kelompok
                </button>
            </div>
            <Drawer PaperProps={{style:{backgroundColor:'var(--primary)',padding:'1rem'}}} BackdropProps={{
                onClick :()=>{
                    SetOpen(!open);
                    if (status === "success"){
                        window.location.reload();
                    }
                },
            }} anchor="right" open={open}>
                <div className="">
                    {
                        status === "success" ?

                            <div className='text-center'>
                                <FormSuccess text={'Perubahan berhasil di simpan'}/>
                                <button onClick={()=>window.location.reload()} className="btn btn-success">
                                    <FontAwesomeIcon icon={faRedo} className='mr-2' />
                                    Refresh halaman
                                </button>
                            </div>
                            :
                            <Forms Handler={FormHandler}
                                   Config={Config}
                                   Button={(prop) =>
                                       <div className="">
                                           {SubmitBtn(prop)}
                                       </div>
                                   }
                                   Errors={error}
                                   Wrapper={({children}) => <div className=''>{children}</div>}/>
                    }
                </div>
            </Drawer>
            <Collapse isOpen={open}>
            </Collapse>
        </div>
    )
};
export default FormEditKelopok