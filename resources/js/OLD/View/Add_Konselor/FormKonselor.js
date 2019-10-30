import React, {Component, useState} from 'react';
import PublicForm from "../../Component/PublicForm";
import {Buttons, Register_Config} from "../../FormsConfig";
import {Konselorregistration} from "../../api";
import Modal from "../../Component/Modal";

const {  LoadingBtn, DisabledBtn, NormalRegisterKelompokBTNDisabled,NormalRegisterKonselorBTN, SuccessBTN, InfoText} = Buttons;
const SubmitButton = (status, info)=>{
    switch (status) {
        case "loading": return <>{
            info ? InfoText(info) : ""
        }{LoadingBtn()}</>;
        case "disabled": return <>{
            info ? InfoText(info) : ""
        }{DisabledBtn()}</>;
        case "normal": return <>{
            info ? InfoText(info) : ""
        }{NormalRegisterKonselorBTN()}</>;
        case "success": return <>{
            info ? InfoText(info) : ""
        }{SuccessBTN()}</>;
    }
};

const FormKonselor = ()=>{
    const [status, setStatus] = useState("normal");
    const [info, setInfo] = useState("");
    const [success, setSuccess] = useState(false);
    const FormHandler = async (data) =>{
        return new Promise(resolve => {
            Konselorregistration(data).then(()=>{
                setSuccess(true);
                setStatus('success');
                resolve()
            }).catch(error => {
                const {status, data} = error;
                const {username, email} = data.errors;
                const {password, password_confirmation} = data.errors;
                const nomorktp = data.errors['nomor-ktp'] ?data.errors['nomor-ktp'][0]: "";
                if (status){
                    const Message =
                        username || email ?
                            username ? username[0] : email[0] :
                            password || password_confirmation ?
                                password ? password[0] : password_confirmation[0]:
                                nomorktp;
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
                resolve()
            });
        });
    };
    return (
        <div>
            {
                success ?
                    <Modal open={true} isOpen={true} onClosed={()=>{}
                    }  header={'Pendaftaran kelompok berhasil'} >
                        <h3 className="h3-responsive">
                            Silahkan tambahkan kelompok baru
                        </h3>
                    </Modal> : ""
            }
            <PublicForm disabled={success} printHeader Handler={FormHandler} FormProp={Register_Config} SubmitButton={()=>SubmitButton(status, info)}  />
        </div>
    )

};
export default FormKonselor;