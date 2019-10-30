import ReactDOM from 'react-dom';
import '../index.scss';
import init from "../bootstrap";
import React, {createContext} from "react";
import Layout from '../Layout/Admin';
import { Route} from "react-router-dom";
import AppRouter from "../BrowserRouter";
const App = ()=>{

    document.querySelector('html').classList.add('nice-scrollbar');
    document.querySelector('body').classList.remove('hidden');
    return <AppRouter >

        <Route render={prop=>{
            const Context = createContext(prop);
            return <Layout Context={Context}> </Layout>
        }}/>

    </AppRouter>
};
init().then(()=>{
    ReactDOM.render(<><App type={'admin'} /></>, document.getElementById('root'));
});
