import React from "react";
import {Input} from "reactstrap"
import {faEnvelope, faUser} from "@fortawesome/free-solid-svg-icons";
import SimpleReactValidator from 'simple-react-validator';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const Config = [
    {
        icon : faUser,
        label :'Username',
        name:'username',
        validators:'required|min:6'
    },
    {
        icon:faEnvelope,
        label:'Email',
        name:'email',
        type:'email',
        validators:'required|email|min:6'
    }
];

export default ()=>{

    const Validator = new SimpleReactValidator();

    return (
        <div>
            {
                Config.map(({icon, label, name, type,validators,})=>{
                    return (
                        <div className="form-group">
                            <label>
                                <FontAwesomeIcon className=' mr-2' icon={icon} />
                                <span className=' '>
                                {label}
                                </span>
                            </label>
                            <Input  type={type?type:'text'} />
                            {Validator.message(name, '', validators)}
                        </div>
                    )
                })
            }
            <button className="btn btn-primary">Simpan</button>
        </div>
    )
}