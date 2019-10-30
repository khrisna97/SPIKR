import React, {useState} from "react";
import {RegisterBTN, RegisterBTNLoading} from "../../Component/FormButton";
import Config from '../../FormConfig/register';
import AnimatedDiv from "../../Component/AnimatedDiv";
import Forms from "../../Component/Form";
import FormSuccess from "../../Component/FormSuccess";
import {KonselorAddApi} from "../../Api/AdminAPI";

const DaftarKonselor=()=>{
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
        KonselorAddApi(data, setstatus, setTimer, seterrors);
    };
    return (
        <AnimatedDiv className='mt-4'>
            {
                status !== "success" ?<React.Fragment>
                        <h3 className=" text-white bg-transparent mt-4 text-uppercase">
                            Pendaftaran konselor
                        </h3>
                        <div className="">
                            <div className="row">
                                <Forms
                                    Handler={FormHandler}
                                    Config={Config}
                                    Button={(prop)=><div className="col-sm-6 d-flex align-items-center"><SubmitBtn {...prop} /></div>}
                                    Errors={errors}
                                    Wrapper={({children})=><div className='col-sm-6' children={children} />}/>
                            </div>
                            {
                                timer ? <p>
                                    Anda dapat mendaftar dalam {timer} detik
                                </p> : null
                            }
                        </div>
                    </React.Fragment> :
                    <FormSuccess text={'pendaftaran konselor silahkan buat kelompok baru'} />
            }
        </AnimatedDiv>
    )
};

export default DaftarKonselor