import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Input} from "reactstrap";
import SimpleReactValidator from "simple-react-validator";
import {UpdateAccountData} from "../../Api/allroles";
import {faCheck, faSyncAlt} from "@fortawesome/free-solid-svg-icons";

export default ({id,Config, CurrentValue})=>{
    const Validator = new SimpleReactValidator({
        locale:'id'
    });
    const [values, setValues] = useState(CurrentValue);
    const [status, setStatus] = useState('normal');
    const [errors, setErrors] = useState({});


    const Handler = ({target})=>{

        setValues({
            ...values,[target.name]:target.value,
        })

    };

    const SubmitForm = ()=>{
        if (Validator.allValid()) {

            if (CurrentValue !== values){
                UpdateAccountData(id, values, setStatus, setErrors)
            }

        } else {
            Validator.showMessages();
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
        }
    };

    return (
        <div>
            {
                Config.map(({icon, label, name, type,validators,value}, key)=>{
                    return (
                        <div key={key} className="form-group">
                            <label>
                                <FontAwesomeIcon className=' mr-2' icon={icon} />
                                <span className=' '>
                                {label}
                                </span>
                            </label>
                            <Input disabled={status === "updated"|| status==="loading" } name={name} onChange={Handler} value={values[name]?values[name]:""}  type={type?type:'text'} />
                            {Validator.message(name, values[name], validators)}
                            {!Validator.fieldValid(name) && CurrentValue[name]?<span>{Validator.getErrorMessages()[name]}</span>:""}
                            {errors[name]?<span>{errors[name]}</span>:""}
                        </div>
                    )
                })
            }
            {
                status === 'updated' ?
                    <p>
                        Perubahan berhasil di simpan
                    </p> :             <button disabled={status === 'loading'|| status === "updated" } onClick={SubmitForm} className="btn btn-primary">
                        {status === "normal" ? "Simpan" :
                            status === "updated" ?
                                <FontAwesomeIcon icon={faCheck} className='' />:
                                <FontAwesomeIcon icon={faSyncAlt} className='fa-spin' />
                        }
                    </button>
            }
        </div>
    )
};