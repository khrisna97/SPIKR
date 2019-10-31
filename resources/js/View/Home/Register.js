import React, {useState} from 'react';
import Forms from "../../Component/Form";
import {RegisterBTN, RegisterBTNLoading} from "../../Component/FormButton";
import RegisterConfig from "../../FormConfig/register";
import RegisterApi from "../../Api/RegisterApi";
import FormSuccess from "../../Component/FormSuccess";
import AnimatedDiv from "../../Component/AnimatedDiv";
const Register = () => {
    const [status, setstatus ] = useState('normal');
    const [timer, setTimer ] = useState(0);
    const [errors, seterrors ] = useState({});
    const SubmitBtn = (prop) =>{
        switch (status) {
            case 'normal' : return <RegisterBTN {...prop}/>;
            case 'process' : return <RegisterBTNLoading {...prop}/>;
        }
    };
    const FormHandler= (data)=>{
        RegisterApi(data, setstatus, setTimer, seterrors);
    };
    return (
        <AnimatedDiv className='mt-4'>
            {
                status !== "success" ?<React.Fragment>
                        <h3 className=" text-white bg-transparent text-uppercase">
                            Pendaftaran
                        </h3>
                        <div className="">
                            <div className="row">
                                <Forms
                                    Handler={FormHandler}
                                    Config={RegisterConfig}
                                    Button={(prop)=><div className="col-sm-6 d-flex align-items-center"><SubmitBtn {...prop} /></div>}
                                    Errors={errors}
                                    Wrapper={({children})=><div className='col-sm-6' children={children} />}
                                />
                            </div>
                            {
                                timer ? <p>
                                    Anda dapat mendaftar dalam {timer} detik
                                </p> : null
                            }
                        </div>
                    </React.Fragment> :
                    <FormSuccess text={'pendaftaran berhasil silahkan login'} />
            }
        </AnimatedDiv>
    )
};
export default Register