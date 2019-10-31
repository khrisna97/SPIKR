import propTypes from "prop-types";
import {getInitState} from "../../View/Login/formConfig";
const PropInitState = getInitState();
const {arrayOf, instanceOf, bool, object, func, string} = propTypes;
Object.keys(PropInitState).forEach((key)=>{
    PropInitState[key] = string.isRequired
});

console.log(PropInitState);
const Types = {
    Handler:func.isRequired,
    FormProp:arrayOf(object).isRequired,
    loading:bool,
};
const RequiredProp = (Component)=>{
    Component.propTypes = Types;
};
export default RequiredProp;