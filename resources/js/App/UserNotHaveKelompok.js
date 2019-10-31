import React, {createContext, useContext} from "react";
import ReactDOM from 'react-dom';
import init from "../bootstrap";
import Layout from '../Layout/UserNotHaveKelompok';
import { Route} from "react-router-dom";
import AppRouter from "../BrowserRouter";
import '../index.scss';
import {Webproperty} from "../Hooks/Webprop";
const App =  ()=>{
    const WebProp = {
        anggota : window.kelompokdata,
        personal : window.personaldata,
    };

    return <AppRouter >
        <Route render={prop=>{
            const Context = createContext(prop);
            return (
                <Webproperty.Provider value={WebProp}>
                        <Layout Context={Context}> </Layout>
                </Webproperty.Provider>
            )
        }}/>
    </AppRouter>
};
init().then(()=>{
    document.querySelector('html').classList.add('nice-scrollbar');
    document.querySelector('body').classList.remove('hidden');

    ReactDOM.render(<><App type={'user'} /></>, document.getElementById('root'));
});