import React, {useEffect, useRef, useState} from "react";
import useRouter from "../../Hooks/Router";
import querystring from 'querystring';
import {Redirect} from "react-router-dom";
import {DetailKelompokAPI} from "../../Api/KonselorAdminApi";
import BIGLoader from "../../Component/BIGLoader";
import Detail from "./Detail";
import Anggota from "./Anggota";
import DataKasus from "./DataKasus";
import {Input} from "reactstrap";
const Render = (kelompok) =>{

    const Components = [
        {
            header: 'Anggota kelompok',
            Component : Anggota,
        },
        {
            header: '50 Kasus terbaru',
            Component : DataKasus,
        }
    ];

    return (
        <div className='pt-5'>
            <div className="row">
                <div className="col-12">
                    <div className="bg-white shadow-lg">
                        <div className="card-body">
                            <Detail {...kelompok} />
                        </div>
                    </div>
                </div>
                {
                    Components.map(({header, Component}, key)=>{

                        const Refs = useRef(null);
                        return  (
                            <div className="col-md-6 mt-4" key={key}>
                                <div className="card border-0 bg-white" style={{height:'75vh', overflowY:'auto',borderRadius:0}}>
                                    <div style={{borderRadius:0}} className="card-header  bg-gradient-blue position-sticky">
                                        <h3 className='text-white font-weight-bolder'>
                                            {header}
                                        </h3>
                                        <Input innerRef={Refs} className={'form-control-alternative form-control-sm'} placeholder={'Cari anggota'} />
                                    </div>
                                    <div className="card-body nice-scrollbar">
                                        {
                                            <Component {...kelompok} REF={Refs} />
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};


export const Main = (kelompok, id, getDetail)=>{

    const [state, stateSetter] = useState(true);

    if (state.kelompok === null){
        return <Redirect to='/'/>
    }

    useEffect(()=>{
        DetailKelompokAPI(id).then(kelompok=>{
            stateSetter({...kelompok});
            getDetail && getDetail({...kelompok});
        });
    }, []);

    return typeof state.kelompok === 'boolean' && state.kelompok ?
        <BIGLoader/> : <Render {...state}/>
};


const DetailKelompok = ()=>{
    const {history} = useRouter();
    const {location} = history;
    const {kelompok_id , kelompok} = querystring.parse(location.search.replace('?',''));

    // Check query exist
    if (!kelompok_id || !kelompok){
        return <Redirect to={'/'} />
    }
    return Main(kelompok,kelompok_id);
};
export default DetailKelompok