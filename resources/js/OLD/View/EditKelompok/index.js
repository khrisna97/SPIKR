import React, {useState} from "react";
import AdminHeaderLayout from "../../Component/AdminHeaderLayout";
import {Buttons, EditKelompok_Config} from "../../FormsConfig";
import PublicForm from "../../Component/PublicForm";
import {Edit_kelompok, GET} from "../../api";
import querystring from "querystring";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faSyncAlt} from "@fortawesome/free-solid-svg-icons";
import Modal from "../../Component/Modal";
import {Link} from "react-router-dom";

const Loader = ()=><div className='text-center'>
    <FontAwesomeIcon icon={faSyncAlt} className={'fa-spin fa-5x text-white'} />
</div>;
const {  LoadingBtn,NormalEditKelompokBTN ,DisabledBtn,  SuccessBTN, InfoText} = Buttons;
const SubmitButton = (status, info )=>{
    switch (status) {
        case "loading": return <>{
            info ? InfoText(info) : ""
        }{LoadingBtn()}</>;
        case "disabled": return <>{
            info ? InfoText(info) : ""
        }{DisabledBtn()}</>;
        case "normal": return <>{
            info ? InfoText(info) : ""
        }{NormalEditKelompokBTN()}</>;
        case "success": return <>{
            info ? InfoText(info) : ""
        }{SuccessBTN()}</>;
    }
};


export default (prop)=>{
    const {nama, id} = querystring.parse(prop.location.search.replace('?',''));
    const [status, setStatus] = useState('normal');
    const [info, setInfo] = useState('');
    const [success, setSuccess] = useState(false);
    const [config, setConfig] = useState(null);
    const [Redirect, setRedirect] = useState(null);
    const configSetter = ()=>{
        GET('api/kelompok/'+id+'?detail=true').then(res=>{
            let Inputs = EditKelompok_Config.Inputs.map((prop)=>{
                prop.value = res[prop.name];
                return prop;
            });
            const newConfig = {
                Header:"Edit kelompok",
                Inputs
            };
            setConfig(newConfig);
        });
    };
    const formHandler = async data =>{
        return new Promise(resolve => {
            Edit_kelompok(id, data).then(()=>{
                setSuccess(true);
                setStatus('success');
                setRedirect(`detail?nama=${data.nama?data.nama:nama}&id=${id}`);
                resolve()
            }).catch(res=>{
                alert("Please see the console");
                console.log(res);
            });
        })
    };


    if (config === null){
        configSetter();
    }
    return (
        <AdminHeaderLayout>
            {
                success ? <Modal open={success} header='Kelompok berhasil di update'>
                    <div className="text-center">
                        <Link to={Redirect?Redirect:""} >
                            <button className="btn btn-primary">
                                Klik di sini untuk ke detail kelompok
                            </button>
                        </Link>
                    </div>
                </Modal> : null
            }
            {
                config !== null ?
                    <div className="card">
                        <div className="card-body">
                            <Link to={`detail?nama=${nama}&id=${id}`}>
                                <button className="btn btn-default btn-sm">
                                    <FontAwesomeIcon icon={faChevronLeft} className={'mr-2'} />
                                    Kembali
                                </button>
                            </Link>
                            <PublicForm
                                printHeader
                                disabled={success}
                                FormProp={[config]}
                                SubmitButton={()=>SubmitButton(status, info)}
                                Handler={formHandler}  />
                        </div>
                    </div>
                    :
                    Loader()
            }
        </AdminHeaderLayout>
    )
}