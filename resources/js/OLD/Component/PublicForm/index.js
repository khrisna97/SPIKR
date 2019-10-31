import React, {useState} from "react";
import propTypes from './proptypes';
import {ValidatorForm} from "react-form-validator-core";
import Validator from "./Validator";
import Common from "../FormInput/Common";
import Radio from "../FormInput/Radio";
import Select from "../FormInput/Select";
const PublicForm = ({children,FormProp, Handler, SubmitButton, disabled, printHeader}) =>{
    const [values, setValue] = useState({});
    const [loading, setLoading] = useState(false);
    const InputHandler = (e)=>{
        const name = e.target.getAttribute('name');
        values[name] = e.target.value;
        setValue({...values});
    };
    const FormHandler =()=>{
        setLoading(true);
        Handler(values).then(()=>{
            setLoading(false);
        })
    };
    const RenderInput = (Inputs)=>{
        return Inputs.map((item, key)=>{
            item.value = values.hasOwnProperty(item.name) ? values[item.name]:item.value;
            item.onChange = InputHandler;
            item.disabled = loading||disabled;
            if (["email","password","text","textarea"].find(_item=>_item===item.type )||!item.type){
                item.Input = Common;
            }else{
                switch (item.type) {
                    case "radio":item.Input = Radio;break;
                    case "select":item.Input = Select;break;
                }
            }
            return (
                <div key={key} className={`col-md-${item.col?item.col:"12"}`}>
                    <Validator {...item} />
                </div>
            )
        })
    };
    return (
        <ValidatorForm onSubmit={FormHandler}>
            {FormProp.map(({Header, Inputs},key)=>{
                return (
                    <div key={key} className="row py-3 justify-content-center">
                        {
                            printHeader ? <div className="col-md-10">
                                <h1 className="h1-responsive border-bottom">
                                    {typeof Header === "function"? Header(): Header}
                                </h1>
                            </div>:""
                        }
                        <div className="col-md-10">
                            <div className="row justify-content-center">
                                {RenderInput(Inputs)}
                                <div className="col-12 text-center">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            <div className='text-center'>
                <SubmitButton/>
            </div>
        </ValidatorForm>
    )
};
propTypes(PublicForm);
export default PublicForm