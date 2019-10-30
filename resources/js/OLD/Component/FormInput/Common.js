import React from 'react';
import {
    FormGroup,
    Input,
} from "reactstrap";

export default ({children,disabled,isValid, type,value,onChange,name, label}) =>{
    const isInvalid = isValid()!== undefined && isValid()===false;
    const InputProp = {
        className:"form-control-alternative " + (isInvalid ? "is-invalid":""),
        onChange, name, value,disabled
    };
    if (disabled){
        InputProp.className += " disabled"
    }
    return (<>
            <label>
                {label}
            </label>
            <FormGroup className={isInvalid?"has-danger":""} >
                <Input type={type} {...InputProp} />
                {children}
            </FormGroup>
        </>
    )
}