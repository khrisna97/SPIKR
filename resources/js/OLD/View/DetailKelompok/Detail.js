import React, {useState} from "react";
import {faCogs, faEdit, faSyncAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {GET} from "../../api";
import {Link} from "react-router-dom";
export const Loader =()=><FontAwesomeIcon icon={faSyncAlt} className='fa-spin' />;

const DetailKelompok=({id,anggota, ketua, tipe, kasus, nama})=>{
    const toLoop = {
        anggota,ketua,tipe,kasus
    };
    return <div className="row">
        {Object.keys(toLoop).map((name, key)=>{
            return (
                <div className='col-6' key={key}>
                    <p className='text-capitalize font-weight-bold border-bottom'>
                        {name}
                    </p>
                    <p>{toLoop[name]}</p>
                </div>
            )
        })
        }
        <div className="col-12">
            <div className="text-right">
                <Link to={`edit?id=${id}&nama=${nama}`}>
                    <button className="btn btn-primary">
                        <FontAwesomeIcon icon={faEdit} className='mr-2' />
                        Edit kelompok
                    </button>
                </Link>
            </div>
        </div>
    </div>;
};

export default ({KelompokId})=>{
    const [data, setdata] = useState(null);
    const datasetter = ()=>{
        GET('api/kelompok/'+KelompokId).then(data=>{
            setdata(data);
        })
    };
    if (data === null)
        datasetter();
    return data === null? <Loader/> : <DetailKelompok {...data} />
}