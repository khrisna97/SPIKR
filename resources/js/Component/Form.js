import React,{useState} from 'react';
import SimpleReactValidator from "simple-react-validator";
import {Input} from "reactstrap";
import {Select as SELECT} from "@material-ui/core";
import "../i18n/form";
import ArrowTooltip from "./ArrotTooltip";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "./RadioGroup";
const Common = prop =>{
    const InpProp = {
        onChange:prop.onChange,
        onKeyDown:prop.onKeyDown,
        className : `form-control form-control-alternative`,
        bsSize:prop.size? prop.size : '',
        placeholder:prop.placeholder,
        type:prop.type,
        name:prop.name,
        value:prop.value
    };
    return <Input {...InpProp} />
};
export const Select = ({onChange, name, value, label, dataSource, size }) =>{
    const InpProp = {
        onChange,
        className : `form-control form-control-alternative ${size&& `form-control-${size}` }`,
        name:name,
        value:0,
    };
    if (dataSource.length){
        let check = dataSource.find((item)=>item.value === value);
        if (dataSource.find((item)=>item.value === value)){
            InpProp.value = check.value;
        }else{
            InpProp.value = 0;
        }
    }



    return (
        <SELECT {...InpProp} disableUnderline >
            <MenuItem disabled value={0} >{label?label:"Pilih salah satu"}</MenuItem>
            {
                dataSource.map(({label, value}, key)=><MenuItem key={key} value={value}>{label}</MenuItem>)
            }
        </SELECT>
    )
};

const Helper = ({Validator, name, children, valid}) =>{
    const message =   Validator.getErrorMessages()[name] ? Validator.getErrorMessages()[name] : "";
    return (
        <ArrowTooltip color={'primary'} open={! valid &&! Validator.fieldValid(name)} title={message}>
            {children}
        </ArrowTooltip>
    )
};

const Inputs = prop =>{
    const {Validator, onChange, onKeyDown,label, valid}  = prop;
    const ComponentProp = {
        onChange,onKeyDown,
        placeholder: prop.placeholder,
        size : prop.size ? prop.size : '',
        type:prop.type ? prop.type : "text",
        name : prop.name,
        value : prop.value,
    };
    let InputComponent = Common;
    switch (prop.type) {
        case "select": {
            ComponentProp.dataSource = prop.datasource;
            InputComponent = Select;break;
        }
        case "radio": {
            ComponentProp.dataSource = prop.datasource;
            InputComponent = Radio;break;
        }
    }
    return (
        <div className='form-group'>
            {
                Validator.message(prop.name, prop.value, prop.validators)
            }
            {label ? <label className={'text-white'}>{label}</label> : null}
            <Helper valid={valid} name={prop.name} Validator={Validator} >
                <div>
                    <InputComponent{...ComponentProp} />
                    {
                        prop.serverFeedback ?
                            <small className={'text-white'}>
                                {
                                    prop.serverFeedback
                                }
                            </small>   : ""
                    }
                </div>
            </Helper>
        </div>
    )
};

const Forms = ({Config, Wrapper, Button, Handler, children, Errors}) =>{
    let [Values, setValues] = useState({});
    let [valid, setValid] = useState(true);
    const Validator = new SimpleReactValidator({
        locale:'id'
    });
    const InputHandler = (e) =>{
        const name =  e.target.name;
        const value = e.target.value;
        let newval = Values;
        newval[name] = value;
        setValues({...newval});
    };
    const SubmitHandler=()=>{
        if (Validator.allValid()){
            Handler(Values);
        }else{
            setValid(false)
        }
    };

    const DetectEnter = (e)=>{
        const {keyCode} = e;
        if (keyCode === 13){
            e.preventDefault() || SubmitHandler();
        }
    };

    return (
        <React.Fragment>
            {Config.map((prop, key)=>{
                    const InputsProps = {
                        onChange: InputHandler,
                        onKeyDown: DetectEnter,
                        value : Values.hasOwnProperty(prop.name) ? Values[prop.name] : "",
                        Validator,
                        valid,
                        ...prop
                    };
                    if (Errors.hasOwnProperty(prop.name)){
                        InputsProps.serverFeedback = Errors[prop.name];
                    }
                    return Wrapper? <Wrapper key={key}><Inputs {...InputsProps}/> </Wrapper> : <Inputs key={key} {...InputsProps}/>
                }
            )}
            {
                Button? <Button onClick={SubmitHandler}/>:null
            }
            {children}
        </React.Fragment>
    )
};
export default Forms