import React from "react";
import Nav from "./Navs/Admin";
import Sidebar from './Sidebar/Admin';
// import "../scss/argon-dashboard-react.scss";
// import {AdminRoutes} from "../routes";
const getBrandText = (location) => {
    // for (let i = 0; i < AdminRoutes.length; i++) {
    //     if (
    //         location.pathname.indexOf(
    //             AdminRoutes[i].layout + routes[i].path
    //         ) !== -1
    //     ) {
    //         return AdminRoutes[i].name;
    //     }
    // }
    return "Brand";
};
export default (prop)=>{
    const {children} = prop;
    let NavProp = prop;
    return (
        <React.Fragment>
            <Sidebar {...prop} />
            <div className="main-content" >
                <Nav
                    {...NavProp}
                    brandText={getBrandText("")}
                />
                {children}
            </div>
        </React.Fragment>
    )
};