import React from 'react';
import FormGroup from "reactstrap/es/FormGroup";


const Radio =({children,disabled,datasource,onChange ,name, value,label, isValid})=> {
    const isInvalid = isValid()!== undefined && isValid()===false;
    const _value = value;
    const InputProp = {
        onChange, name,disabled,
        className:`custom-control-input ${isInvalid? "is-invalid":""}`
    };
    return (
        <FormGroup className={isInvalid?"":""}>
            <label className={"d-block"}>
                {label}
            </label>
            <div>
                {
                    datasource.map(({label, value}, key)=>{
                        return (
                            <div key={key} className="custom-control custom-radio custom-control-alternative custom-control-inline">
                                <input
                                    id={key+"radio"}
                                    type="radio"
                                    value={value}
                                    defaultChecked={value === _value }
                                    {
                                        ...InputProp
                                    }
                                />
                                <label className="custom-control-label" htmlFor={key+"radio"}>
                                    {label}
                                </label>
                            </div>
                        )
                    })
                }
            </div>
            {children}
        </FormGroup>
    );
};

export default Radio;