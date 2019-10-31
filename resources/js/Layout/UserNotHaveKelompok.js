import React from "react";
import Nav from './Navs/User1';
import AnimatedSwitches from "../Component/AnimatedSwitches";
import Routes from "../Routes/User1";
export default ()=>{
    return <div>
        <Nav />
        <div className='container' style={{minHeight:'100vh'}}>
            <div className="mt-5 pt-5">
                <AnimatedSwitches Routes={Routes} />
            </div>
        </div>
    </div>
};