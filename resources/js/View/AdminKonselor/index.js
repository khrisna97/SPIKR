import React, {useState} from "react";
import ListKonselor  from './ListKonselor';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTable, faUserMd} from "@fortawesome/free-solid-svg-icons";
import useRouter from "../../Hooks/Router";

const AdminKonselor = ()=>{

    const {history} = useRouter();

    const [active, setActive] = useState('list');

    const BtnHandler = ({target})=>{
        const {name} = target;
        if (name === 'list'){
            history.push('../list/konselor');
        }else{
            history.push('../tambah/konselor');
        }
    };

    return (
        <div>
            <div className="row mt-2">
                <div className="col-md-6">
                    <button  onClick={BtnHandler} name={'list'} className={`btn btn-lg w-100 mt-2 ${active === "list" ? "btn-primary":""}`}>
                        <FontAwesomeIcon icon={faTable} className='mr-2' />
                        Data konselor terdaftar
                    </button>
                </div>
                <div className="col-md-6">
                    <button onClick={BtnHandler} name={'form'} className={`btn btn-lg w-100 mt-2 ${active === "form" ? "btn-primary":""}`}>
                        <FontAwesomeIcon icon={faUserMd} className='mr-2' />
                        Tambah konselor
                    </button>
                </div>
            </div>
            <div>
                <ListKonselor/>
            </div>
        </div>
    )
};

export default AdminKonselor