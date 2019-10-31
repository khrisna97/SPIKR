import React from "react";
import Common from "./Common";
import Radio from "./Radio";
import Select from "./Select";
import {ValidatorComponent, ValidatorForm} from 'react-form-validator-core';

export default class ValidatorInput extends ValidatorComponent{
    constructor(props, context) {
        super(props, context);
        this.state = {value:""};
    }
    render() {
        const {type, validators} = this.props;
        if (validators.find((item)=>item === "CheckUsername")){
        }
        if (validators.find((item)=>item === "CheckEmail")){

        }
        let InputComponent = Common;
        if (type !== undefined){
            switch (type) {
                case "radio":{InputComponent = Radio;break}
                case "textarea":{InputComponent = Common;break}
                case "select":{InputComponent = Select;break}
            }
        }
        return (
            <div>
                <InputComponent value={this.state.value} {...this.props} {...{isValid:this.isValid}} >
                    {
                        !this.isValid() && this.isValid()!== undefined && <small className={"text-danger"}>{this.getErrorMessage()}</small>
                    }
                </InputComponent>
            </div>
        )
    }
}