import ReactDOM from 'react-dom';
import React,{createContext} from "react";
import Layout from '../Layout/Public';
import { Route} from "react-router-dom";

import AppRouter from "../BrowserRouter";
import '../index.scss';
import init from "../bootstrap";


const App =  ()=>{
    return <AppRouter >
            <Route render={prop=>{
                const Context = createContext(prop);
                return <Layout Context={Context}> </Layout>
            }}/>
    </AppRouter>
};


init().then(()=>{
    document.querySelector('html').classList.add('nice-scrollbar');
    document.querySelector('body').classList.remove('hidden');

    ReactDOM.render(<><App type={'public'} /></>, document.getElementById('root'));
});
