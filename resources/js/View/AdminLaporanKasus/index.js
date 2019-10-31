import React, {useEffect, useState} from "react";
import LaravelMUITable from "../../Component/MuiTableLaravel";
import {Columns} from "./StaticVar";
import Filter from './filter';
import {LaporanKasusAPI} from "../../Api/AdminAPI";
import detailPanel from "./detailPanel";
import useRouter from '../../Hooks/Router';
import querystring from 'querystring';

const parseQuery = (search) =>{
    search = querystring.parse(search.replace('?',''));
    let parsed = {};
    Object.keys(search).forEach((key)=>{
       if (key.includes('_id')){
           const _key = key.replace('_id','');
           parsed[_key] = search[key];
       }
    });
    return parsed;
};

let test = {};

const LaporanKasus = () =>{
    const [Query, setQuery] = useState({});
    const {search} = useRouter().history.location;

    useEffect(()=>{
        if (search && ! Object.keys(Query).length){
            setQuery(parseQuery(search));
        }
    },[]);

    return (
        <div className={'card w-100'}>
            <div className="card-body">
                <div className="row justify-content-end">
                    <div className="col-md-12 text-center">
                        <h1 className='text-uppercase'>
                            Data kasus konseling SPIKR
                        </h1>
                    </div>
                    <div className="col-md-12">
                        <Filter QuerySetter={setQuery} />
                    </div>
                    <div className="col-md-12">
                        <LaravelMUITable detailPanel={detailPanel} Query={Query} API={LaporanKasusAPI} Columns={Columns}/>
                    </div>
                </div>
            </div>
        </div>
    ) ;
};
export default LaporanKasus