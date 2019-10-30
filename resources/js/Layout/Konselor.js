import React from "react";
import Routes from "../Routes/Konselor";
import Nav from "./Navs/Konselor";
import AnimatedSwitches from "../Component/AnimatedSwitches";
const Layout = ({children})=>{
    return (
        <div>
            <div className='container' style={{minHeight:'100vh'}}>
                <Nav />
                <div className="mt-5 pt-5">
                    <AnimatedSwitches Routes={Routes} />
                </div>
            </div>
        </div>
    )
};
export default Layout;