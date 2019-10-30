import React, {useState} from "react";
// reactstrap components
import {Buttons, Register_Config} from '../../FormsConfig';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PublicForm from "../../Component/PublicForm";
import Modal from "../../Component/Modal";
import {Redirect} from "react-router-dom";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {Userregistration} from "../../api";
const {  LoadingBtn, DisabledBtn, NormalRegisterBTN, SuccessBTN, InfoText} = Buttons;
const Register = () =>{
    // status "loading", "disabled","normal","success"
    const [status, setStatus] = useState("normal");
    const [info, setInfo] = useState("");
    const [success, setSuccess] = useState(false);
    const FormHandler = async (data) =>{
        Userregistration(data).then(res=>{
            setSuccess(true)
        }).catch(error=>{
            const {status, data} = error;
            const {username, email} = data.errors;
            const nomorktp = data.errors['nomor-ktp'];
            if (status){
                const Message =nomorktp? nomorktp : username ? username[0]: email[0];
                if (status === 429){
                    let i = parseInt(Message);
                    setInterval(()=>{
                        console.log(i);
                        if (i !== 0){
                            console.log("called");
                            i--;
                            setInfo(`Silahkan mendaftar lagi dalam ${i} detik`);
                        }else {
                            clearInterval(this);
                            setStatus("normal");
                            setInfo("");
                        }
                    }, 1000);
                }else {
                    setInfo(Message);
                }
                setStatus(status === 422 ? "normal" : status === 429 ? "disabled" : "normal");
            }
        });
    };
    return (
        <div className='p-2'>
            {
                success ?
                    <Modal isOpen={true} onClosed={()=>{
                        window.location = '/login'}
                    }  header={'Pendaftaran berhasil'} >
                        <h3 className="h3-responsive">
                            Silahkan login dengan akun baru anda
                        </h3>
                    </Modal> : ""
            }
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card">
                        <div className="card-header text-center">
                            <h2 className="h2-responsive">
                                <FontAwesomeIcon icon={faUserPlus} className={"mr-2" } /> Pendaftaran
                            </h2>
                        </div>
                        <div className="card-body">
                            <PublicForm printHeader SubmitButton={()=>{
                                switch (status) {
                                    case "loading": return <>{
                                        info ? InfoText(info) : ""
                                    }{LoadingBtn()}</>;
                                    case "disabled": return <>{
                                        info ? InfoText(info) : ""
                                    }{DisabledBtn()}</>;
                                    case "normal": return <>{
                                        info ? InfoText(info) : ""
                                    }{NormalRegisterBTN()}</>;
                                    case "success": return <>{
                                        info ? InfoText(info) : ""
                                    }{SuccessBTN()}</>;
                                }}
                            } FormProp={Register_Config} Handler={FormHandler}>
                            </PublicForm>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Register;