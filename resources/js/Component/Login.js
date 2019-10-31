import React, {useState} from 'react';
import LoginConfig from "../FormConfig/login";
import NavItem from "reactstrap/es/NavItem";
import Forms from "./Form";
import {LoginBTN, LoginLoading} from "./FormButton";
import LoginApi from "../Api/loginApi";
import Alerts from "./Alerts";
const Login = () => {
  const [status, setstatus ] = useState('normal');
  const [timer, setTimer ] = useState(0);
  const [errors, seterrors ] = useState([]);
  const SubmitBtn = (prop) =>{
    switch (status) {
      case 'normal' : return <LoginBTN {...prop}/>;
      case 'process' : return <LoginLoading {...prop}/>;
    }
  };
  const FormHandler = data => {
    LoginApi(data,setstatus, setTimer, seterrors);
  };
  return (
    status!== 'ban' ? <Forms
      Config={LoginConfig}
      Handler={FormHandler}
      Wrapper={({children})=><NavItem >{children}</NavItem>}
      Button={(prop)=><NavItem> {<SubmitBtn {...prop} />} </NavItem>}
      Errors={{}}
    >
          {
            errors.length ?
                <Alerts alert={errors} MessageSetter={seterrors} /> :
                ""
          }
    </Forms> :
      <NavItem> <small className='text-white'>Anda tidak dapat login dalam {timer} detik</small> </NavItem>
  )
};
export default Login