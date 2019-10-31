import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTable, faUserMd, faUsers} from "@fortawesome/free-solid-svg-icons";
import List from '../AdminKelompokList';
import Form from "../AdminAddKelompok";
const AdminKelompok = ()=>{

    const [active , setActive] = useState('list');
    const ActiveSetter = ({target})=>{
        const {name} = target;
        setActive(name);
    };

    return <div>
        <div className="row mt-2">
            <div className="col-md-6">
                <button  onClick={ActiveSetter} name={'list'} className={`btn btn-lg w-100 mt-2 ${active === "list" ? "btn-primary":""}`}>
                    <FontAwesomeIcon icon={faTable} className='mr-2' />
                    Data kelompok terdaftar
                </button>
            </div>
            <div className="col-md-6">
                <button onClick={ActiveSetter} name={'form'} className={`btn btn-lg w-100 mt-2 ${active === "form" ? "btn-primary":""}`}>
                    <FontAwesomeIcon icon={faUsers} className='mr-2' />
                    Tambah kelompok KR
                </button>
            </div>
        </div>
        <div className="mt-5">
            {
                active === "list" ?
                    <List/> : <Form/>
            }
        </div>
    </div>
};
export default AdminKelompok