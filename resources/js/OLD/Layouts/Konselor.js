import React, {createContext} from "react";
import Nav from "./Navs/Konselor";
import {GET} from "../api";
const getBrandText = (location) => {
    return "Brand";
};
let cache = null;
GET('api/anggota/find/kelompok/'+window.userdata.id).then(res=>{
   window.userdata.kelompok = res;
   cache = res
});

export default (prop)=>{
    const {children} = prop;
    let NavProp = prop;
    return (
        <React.Fragment>
            <div className="main-content">
                <Nav
                    {...NavProp}
                    brandText={getBrandText("")}
                />
                {children}
            </div>
        </React.Fragment>
    )
};