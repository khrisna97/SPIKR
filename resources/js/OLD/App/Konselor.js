import React, {createContext} from "react";
import ReactDom from "react-dom";
require("../bootstrap");
import {BrowserRouter as Router , Route, Switch} from "react-router-dom";
import {KonselorRoutes} from "../routes";
import Layout from "../Layouts/Konselor";
import AdminHeaderLayout from "../Component/AdminHeaderLayout";
import {GET} from "../api";

const RenderRoutes = ({context})=> <Switch>{
    KonselorRoutes.map(({path, component}, key)=>{
        return (<Route
            path={path}
            component={(prop)=>{
                const ctx  = createContext({...context,router:prop});
                return component(ctx)
            }}
            key={key}
            exact
        />)})
}</Switch>;
const App =({userdata, kelompok, anggota})=><Route render={ location =>{
    const context = {userdata, kelompok, anggota};
    return <Layout location={location} >
        <AdminHeaderLayout>
            <div className="pt-5">
                <RenderRoutes context={context} />
            </div>
        </AdminHeaderLayout>
    </Layout>
}}/>;
const GetContextData = async ()=>{
    return new Promise(resolve => {
        const userdata = window.userdata;
        let kelompok , anggota = null;
        GET('api/anggota/find/kelompok/'+userdata.id).then(res=>{
            kelompok = res;
            GET('api/pengguna?pagination=disable&kelompok='+kelompok.id).then(_res=>{
               anggota = _res;
                resolve({
                    userdata,kelompok,anggota
                })
            });
        });
    })
};

if (document.getElementById("app")){
    document.body.classList.add("bg-default");
    GetContextData().then(({userdata, kelompok,anggota}) =>{
        ReactDom.render(
                <Router>
                    <App {...{userdata, kelompok, anggota}}/>
                </Router>
            , document.getElementById("app")
        )
    });
}