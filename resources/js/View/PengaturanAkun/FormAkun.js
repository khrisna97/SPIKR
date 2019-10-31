import React from "react";
import {faEnvelope, faUser} from "@fortawesome/free-solid-svg-icons";
import Form from "./Form";
const {username, email, id} = window.userdata;
const {nama} = window.personaldata;

const Config = [
    {
        icon : faUser,
        label :'Nama lengkap',
        name:'nama',
        validators:'required|min:6',
    },
    {
        icon : faUser,
        label :'Username',
        name:'username',
        validators:'required|min:6',
    },
    {
        icon:faEnvelope,
        label:'Email',
        name:'email',
        type:'email',
        validators:'required|email|min:6',
    }
];

export default ()=><Form id={id} Config={Config} CurrentValue={{
    email, nama, username
}} />