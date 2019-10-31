import React from "react";
import {Badge} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell} from "@fortawesome/free-solid-svg-icons";

export default ({name, online, unreaded})=>{
    return <React.Fragment>
        <h2>
            {name}
            {
                 parseInt(unreaded) ? <Badge className='ml-3 text-danger' badgeContent={unreaded}>
                    <FontAwesomeIcon icon={faBell} />
                </Badge> : ""
            }
        </h2>
        <small>
            {
                online ?
                    "online":"Pesan anda akan tetap terkirim dan dibaca saat konselor online"
            }
        </small>
    </React.Fragment>
};