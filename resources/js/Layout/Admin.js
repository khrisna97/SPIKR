import React, {useState} from "react";
import Nav from "./Navs/Admin";
import Sidebar from "./Sidebar";
import RoutesConfig from "../Routes/Admin";
import AnimatedSwitches from "../Component/AnimatedSwitches";
import UseRouter from "../Hooks/Router";
export default ()=>{
    const [open, setOpen] = useState(false);
    const [brand, setBrand] = useState("Dashboard");
    const {history} = UseRouter();
    const DrawerToggler = ()=> setOpen(!open);
    const Toggler = (path, label) =>{
        history.push(path);
        setBrand(label);
        DrawerToggler();
    };
    return <div>
        <Sidebar Toggler={Toggler} Config={RoutesConfig} open={open} brand={brand} />
        <Nav brandSetter={setBrand} DrawerSetter={DrawerToggler} brand={brand} />
        <div className="container mt-5 py-5">
            <AnimatedSwitches Routes={RoutesConfig} />
        </div>
    </div>
}