import React, {useState} from "react";
import Filter from "./Filter";
import AnimatedDiv from "../../Component/AnimatedDiv";
import LaravelMUITable from "../../Component/MuiTableLaravel";
import {KonselorListAPI} from "../../Api/AdminAPI";
import {Columns} from "../AdminUserList/StaticVar";
import useRouter from "../../Hooks/Router";
import QueryString from "querystring";

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

const Setactions =(Hook)=>{

    const PUSH = (type, params)=>{
        Hook.push(`../${type}?${QueryString.stringify(params)}`);
    };

    return [
        {
            tooltip:'Detail kelompok',
            icon:'supervised_user_circle',
            onClick: (e,{kelompok_id,kelompok})=>PUSH('kelompok/detail', {kelompok:kelompok.replaceAll(" ","."),kelompok_id:kelompok_id }),
        },
        {
            tooltip:'Laporan kasus',
            icon:'eventnote',
            onClick: (e,{kelompok_id,kelompok})=>PUSH('laporan', {kelompok:kelompok.replaceAll(" ","."),kelompok_id:kelompok_id }),
        },
    ];
};

const ListKonselor=()=>{

    const [Query, setQuery] = useState({});
    const {history} = useRouter();
    const actions = Setactions(history);

    return(
        <AnimatedDiv>
            <div className='card mt-5'>
                <div className="card-body">
                    <Filter QuerySetter={setQuery} />
                    <LaravelMUITable actions={actions} Query={Query} API={KonselorListAPI} Columns={Columns}/>
                </div>
            </div>
        </AnimatedDiv>
    )
};

export default ListKonselor