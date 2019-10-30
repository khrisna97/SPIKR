import React, {useEffect, useState} from "react";
import Routes from "../Routes/User";
import Nav from "./Navs/User";
import AnimatedSwitches from "../Component/AnimatedSwitches";
import JoinGroupWebHook from "../Websocket/Groupchat";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import {Close} from "@material-ui/icons"

const Notification = ({color, message, resetter})=>{

    const Coloring = {
        primary : "var(--primary)"
    };

    return (
        <Snackbar
            onClick={resetter}
            style={{
                backgroundColor:Coloring[color]
            }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            open={true}
            autoHideDuration={6000}
        >
            <SnackbarContent
                style={{
                    backgroundColor:'var(--primary)'
                }}
                aria-describedby="client-snackbar"
                message={
                    <span id="client-snackbar"
                    >
          <Icon/>
                        {message}
        </span>
                }
                action={[
                    <IconButton onClick={resetter} key="close" aria-label="close" color="inherit" >
                        <Close />
                    </IconButton>,
                ]}
            />
        </Snackbar>
    )
};
const Notifications = ()=>{
    const {GroupChannel} = JoinGroupWebHook(window.kelompokdata.kelompok);
    const [notif, setNotif] = useState(null);

    useEffect(()=>{
        console.log(notif);
    },[notif]);
    GroupChannel.listen('KonselorOnlineNotification',()=>{
        const toPush = {
            message : "Konselor telah online",
            color:'primary',
            resetter:()=>setNotif(null)
        };
        if (notif === null){
            setNotif(toPush)
        }
    });
    return <div>
        {
           notif ? <Notification {...notif}  /> : ""
        }
    </div>
};

const Layout = ({children})=>{

    return (
        <div>
            <div className='container' style={{minHeight:'100vh'}}>
                <Nav />
                <Notifications/>
                <div className="mt-5 pt-5">
                    <AnimatedSwitches Routes={Routes} />
                </div>
            </div>
        </div>
    )
};
export default Layout;