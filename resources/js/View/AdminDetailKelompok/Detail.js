import React from "react";
import {faBookMedical, faLocationArrow, faMapPin, faUserMd, faUsers} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
const Detail = ({nama, kasus, anggota, ketua, kecamatan})=>{

    const Details = {
        "Konselor / Ketua kelompok":{
            icon : faUserMd,
            text : ketua
        }
        ,"Jumlah anggota":{
            icon : faUsers,
            text : anggota
        }
        ,"Kasus di laporkan":{
            icon : faBookMedical,
            text : kasus
        }
        ,"Alamat":{
            icon : faMapPin,
            text : kecamatan
        }
    };

    return (
        <div>
            <h1 className='border-bottom'>{nama}</h1>
            <div className="row mt-5">
                {
                    Object.keys(Details).map((key, index)=>{


                        return <div key={index} className="col-6">
                            <h4><FontAwesomeIcon className={'mr-2'} icon={Details[key].icon} />  {key}</h4>
                            <p>
                                {Details[key].text}
                            </p>
                        </div>
                    })
                }
            </div>
        </div>
    )
};
export default Detail