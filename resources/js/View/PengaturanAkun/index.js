import React, {useState} from "react";
import Akun from "./FormAkun";
import Password from "./FormPassword";
import {faKey, faUsers} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import HapusAkun from "./HapusAkun"

const PengaturanAkun =()=>{

    const Forms = [
        {
            header : "Akun",
            icon: faUsers, Component : Akun,
        },
        {
            header : "Password",
            icon : faKey, Component: Password,
        },
    ];

    return <div>

        <HapusAkun/>

        <div className="row">
            {
                Forms.map(({header,icon,Component,col },key)=>(
                    <div key={key} className={`mt-4 col-md-${col?col:'6'}`}>
                        <div className="card ">
                            <h1 className="card-header">
                                <FontAwesomeIcon className='mr-2' icon={icon} />
                                {header}
                            </h1>
                            <div className="card-body">
                                <Component/>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
};

export default PengaturanAkun