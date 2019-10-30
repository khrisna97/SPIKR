import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBriefcaseMedical} from "@fortawesome/free-solid-svg-icons";
import {Drawer} from "@material-ui/core";
import {LaporanBTN, LaporanBTNLoading} from "../../../Component/FormButton";
import {ReportingCase} from "../../../Api/KonselingApi";
import Forms from "../../../Component/Form";
import BuatLaporam from "../../../FormConfig/BuatLaporam";
import FormSuccess from "../../../Component/FormSuccess";
import UserHeader from '../UserHeader';

const FormLaporan = ({user}) =>{


    const [status, setStatus] = useState('normal');

    const [ddopen, setddopen] = useState(false);

    const SubmitBtn = (prop) =>{
        switch (status) {
            case 'normal' : return <LaporanBTN {...prop}/>;
            case 'process' : return <LaporanBTNLoading {...prop}/>;
        }
    };

    const FormHandler = data =>{
        setStatus('process');

        setTimeout(()=>{
            setStatus('success')
        }, 2000)
        let params = {...data,user:user.id};

        if (user.kelompok){
            params = {...params, kelompok : user.kelompok}
        }

        console.log(data);

        ReportingCase(params).then(_=>{
            setStatus('success');
        });
    };

    const PaperStyle = {
        background : 'var(--primary)'
    };

    const DrawerBackdropClick = () =>{

        const setter = async ()=>{
            setddopen(false);
        };
        setter().then(_=>{

            if (status === 'success'){

                setTimeout(_=>{
                    setStatus('normal')
                }, 500)

            }
        });
    };

    const drawerProp = {
        PaperProps : {style : PaperStyle},
        keepMounted : true,
        anchor : 'bottom',
        open : ddopen,
        onBackdropClick : status !== 'process' ?  DrawerBackdropClick : ()=>{}
    };

    return (
        <React.Fragment>
            <button onClick={_=>setddopen(true)} disabled={!user} className="btn btn-primary w-100">
                <FontAwesomeIcon icon={faBriefcaseMedical} className='mr-2'  />
                Laporkan kasus
            </button>
            <Drawer {...drawerProp}>
                <div className="p-3">
                    {
                        user ? user.name : ''
                    }

                    {
                        status!== "success" ?
                            ddopen ?
                                <Forms
                                Handler={FormHandler}
                                Config={BuatLaporam}
                                Button={(prop)=><div className="row justify-content-center">
                                    <div className="col-md-5">
                                        <SubmitBtn {...prop} />
                                    </div>
                                </div>}
                                Errors={{}}
                                Wrapper={({children})=><div className='' children={children} />}
                            /> : "" :
                            <div className="text-center">
                                <FormSuccess text={'Laporan berhasil di kirim'}/>
                                <button onClick={DrawerBackdropClick} className="btn mt-3 btn-success">
                                    Tutup
                                </button>
                            </div>
                    }
                </div>
            </Drawer>
        </React.Fragment>
    )
};
export default FormLaporan;