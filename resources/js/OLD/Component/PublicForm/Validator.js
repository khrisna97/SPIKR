import React from "react";
import {ValidatorComponent} from "react-form-validator-core";
import PropTypes from "prop-types";

class ValidatorInput extends ValidatorComponent{
    render() {
        const {Input} = this.props;
        const InputProp = {
            ...this.props,
            isValid:this.isValid,
        };
        return (
            <div className='form-group'>
                <Input {...InputProp} >
                    {
                        !this.isValid()?<span className='text-danger'>{this.getErrorMessage()}</span> :""
                    }
                </Input>
            </div>
        );
    }
}
ValidatorInput.PropTypes = {
    Input:PropTypes.element.isRequired,
    Validators:PropTypes.array.isRequired,
    errorMessages:PropTypes.array.isRequired
};
export default ValidatorInput;