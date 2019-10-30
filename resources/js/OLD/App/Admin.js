import React from "react";
import ReactDom from "react-dom";
require("../bootstrap");
import {BrowserRouter as Router , Route, Switch} from "react-router-dom";
import {AdminRoutes} from "../routes";
import Layout from "../Layouts/Admin";
const RenderRoutes = ()=> <Switch>{
    AdminRoutes.map(({path, component}, key)=>{
    return (<Route
        path={path}
        component={(prop)=>component(prop)}
        key={key}
        exact
    />)})
}</Switch>;
const App =()=><Route render={ location =>{
    return <Layout location={location} >
        <RenderRoutes />
    </Layout>
    }}/>;
if (document.getElementById("app")){
    document.body.classList.add("bg-default");
    ReactDom.render(
        <Router>
            <App/>
        </Router>
        , document.getElementById("app")
    )
}