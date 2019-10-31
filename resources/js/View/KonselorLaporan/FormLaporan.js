import React, {useState} from "react";
import {LaporanBTN, LaporanBTNLoading} from "../../Component/FormButton";
import Forms from "../../Component/Form";
import BuatLaporam from "../../FormConfig/BuatLaporam";
import {ReportingCase} from "../../Api/KonselingApi";
import FormSuccess from "../../Component/FormSuccess";

export default ({name, id, kelompok})=>{

    const [status, setStatus] = useState('normal');

    const SubmitBtn = (prop) =>{
        switch (status) {
            case 'normal' : return <LaporanBTN {...prop}/>;
            case 'process' : return <LaporanBTNLoading {...prop}/>;
        }
    };


    const FormHandler = data =>{
        setStatus('process');
        ReportingCase({...data,user:id,kelompok}).then(_=>{
            setStatus('success');
        });
    };


    return <div>
        <h1 className='text-white'>{name}</h1>
        <div className="row justify-content-center">
            {
                status!== "success" ? <Forms
                        Handler={FormHandler}
                        Config={BuatLaporam}
                        Button={(prop)=><div className="col-12 d-flex align-items-center">
                            <SubmitBtn {...prop} />
                        </div>}
                        Errors={{}}
                        Wrapper={({children})=><div className='col-12' children={children} />}
                    /> :
                    <div className="col text-center">
                        <FormSuccess text={'Laporan berhasil di kirim'}/>
                    </div>
            }
        </div>
    </div>
};