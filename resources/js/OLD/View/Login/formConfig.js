import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
const Accountdata = {
    "Header":()=><><FontAwesomeIcon className={'mr-3'} icon={faUserCircle} />Login</>,
    "Inputs":[
        {
            "name":"credential",
            "label":" Username atau email",
            "value":"imandidikr",
            "col":"12",
            "validators":['required','trim'],
            "errorMessages":['Wajib di isi','Tidak boleh terdapat spasi'],
        },
        {
            "name":"password",
            "label":"Password",
            "col":"12",
            "type":"password",
            "value":"1q2w3e4r",
            "validators":['required','minStringLength:6'],
            "errorMessages":['Wajib di isi','Minimal 6 karaker'],
        },
    ]
};
const config = [Accountdata];
const initState = {};
config.forEach(({Inputs})=>{
    Inputs.forEach(({name,value})=>{
        initState[name] = value;
    })
});
export const getInitState = ()=>initState;
export default config;