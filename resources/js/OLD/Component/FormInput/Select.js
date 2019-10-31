import React from "react";
import {FormGroup, Input} from "reactstrap";
export default ({children,disabled,isValid,datasource, value,onChange,name, label}) =>{
    const isInvalid = isValid()!== undefined && isValid()===false;
    const InputProp = {
        className:"form-control-alternative " + (isInvalid ? "is-invalid":""),
        onChange, name,disabled
    };
    return (<>
            <label>
                {label}
            </label>
            <FormGroup className={isInvalid?"has-danger":""} >
                <Input defaultValue={"-1"} type={"select"} {...InputProp} >
                    <option disabled value={"-1"}>Pilih salah satu</option>
                    {
                        datasource.map(({label, value}, key)=> <option key={key} value={value}>{label}</option>)
                    }
                </Input>
                {children}
            </FormGroup>
        </>
    )
}