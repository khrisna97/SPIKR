import React, {useState} from "react";
// reactstrap components
import {Link} from "react-router-dom";
import {UserLogin} from "../../api";
import PublicForm from "../../Component/PublicForm";
import {Login_Config, Buttons} from "../../FormsConfig";
const {  LoadingBtn, DisabledBtn, NormalBtn, SuccessBTN, InfoText} = Buttons;
export default ()=>{
    // status "loading", "disabled","normal","success"
    const [status, setStatus] = useState("normal");
    const [info, setInfo] = useState("");
    const FormHandler = async (data) =>{
        UserLogin(data).then(res=>{
            window.location.reload();
        }).catch(error=>{
            const {status, data} = error;
            const {username, email} = data.errors;
            if (status){
                const Message = username? username[0]: email[0];
                if (status === 429){
                    let i = parseInt(Message);
                    setInterval(()=>{
                        console.log(i);
                        if (i !== 0){
                            console.log("called");
                            i--;
                            setInfo(`Silahkan login lagi dalam ${i} detik`);
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
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="h2-responsive text-center">
                                {
                                    Login_Config.Accountdata.Header()
                                }
                            </h2>
                        </div>
                        <div className="card-body">
                            <PublicForm Handler={FormHandler} disabled={status === "disabled" } FormProp={[Login_Config.Accountdata]} SubmitButton={()=>{
                                switch (status) {
                                    case "loading": return <>{
                                        info ? InfoText(info) : ""
                                    }{LoadingBtn()}</>;
                                    case "disabled": return <>{
                                        info ? InfoText(info) : ""
                                    }{DisabledBtn()}</>;
                                    case "normal": return <>{
                                        info ? InfoText(info) : ""
                                    }{NormalBtn()}</>;
                                    case "success": return <>{
                                        info ? InfoText(info) : ""
                                    }{SuccessBTN()}</>;
                                }
                            }
                            } >
                            </PublicForm>
                        </div>
                    </div>
                    <div className="row justify-content-end">
                        <div className="col-6 text-right">
                            <Link to={'/pendaftaran'} style={{color:"white"}}>
                                Belum punya akun ?
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};