import React from "react";
import ReactDom from "react-dom";
import {BrowserRouter as Router , Route, Switch} from "react-router-dom";
import {AuthRoute} from "../routes";
import Layout from "../Layouts/Auth";
require("../bootstrap")
const RenderRoutes = ()=> AuthRoute.map(({path, component}, key)=>{
    return (<Route
        path={path}
        component={()=>component()}
        key={key}
    />)
});
const App =()=><Layout>
    <Switch>
        <RenderRoutes/>
    </Switch>
</Layout>;
if (document.getElementById("app")){
    document.body.classList.add("bg-default");
    ReactDom.render(
        <Router>
            <App/>
        </Router>
        , document.getElementById("app")
    )
}