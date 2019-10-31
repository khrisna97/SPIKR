import React, {useState, useContext} from 'react';
import Actions from "./Actions";
import Stats from "./Stats";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSyncAlt} from "@fortawesome/free-solid-svg-icons";
import {GET} from "../../api";
export const BigLoader = ()=>(<div className='d-flex justify-content-center align-items-center text-white' style={{mingHeight:'100vh'}}>
    <FontAwesomeIcon icon={faSyncAlt} className='fa-spin fa-5x' />
</div>);


export default ({Consumer})=>{
    const kelompok = window.userdata.kelompok;
    return (
        kelompok === null ? <BigLoader/>:
            <div>
                <div className='row'>
                    <div className="col-md-6 mb-5">
                        <Consumer>{({kelompok}) =><Stats {...kelompok}/>}</Consumer>
                    </div>
                    <div className="col-md-6 mb-5">
                        <Consumer>{(prop) =><Actions {...prop}/>}</Consumer>
                    </div>
                </div>
            </div>
    )
}