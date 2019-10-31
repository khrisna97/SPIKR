import React from "react";
import {Input} from "reactstrap"
import {faEnvelope, faKey, faUser} from "@fortawesome/free-solid-svg-icons";
import SimpleReactValidator from 'simple-react-validator';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Form from "./Form";

const Config = [
    {
        icon : faKey,
        label :'Password lama',
        name:'password',
        validators:'required|min:6',
        type:'password',
    },
    {
        type:'password',
        icon : faKey,
        label :'Password baru',
        name:'new_pass',
        validators:'required|min:6',
    },
    {
        icon:faKey,
        label:'Konfirmasi password baru',
        name:'new_pass_confirmation',
        type:'password',
        validators:'required|min:6'
    }
];

export default ()=><Form id={window.userdata.id} Config={Config} CurrentValue={{}}  />