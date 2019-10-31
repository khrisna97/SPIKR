import React from "react";
import Nav from "./Navs/Public";
import Routes from '../Routes/Public';
import AnimatedSwitches from "../Component/AnimatedSwitches";
export default ()=>{
    return <React.Fragment>
        <Nav />
        <div className="container mb-5">
            <AnimatedSwitches Routes={Routes} />
        </div>
    </React.Fragment>
}