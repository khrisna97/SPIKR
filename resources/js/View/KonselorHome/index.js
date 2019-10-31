import React from "react";
import querystring from 'querystring';
import Inbox from "../../Component/Inbox";
import Profile from "./Profile";
import useWebProperty from "../../Hooks/Webprop";
import useRouter from "../../Hooks/Router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {getMessagesInfo} from "../../Api/KonselingApi";
import {PersonalChannelHook} from "../../Hooks/PersonalChannelHook";

const InboxWrapper = ({children})=>(
    <div className="card border-0 bg-white" style={{height:'75vh', overflowY:'auto',borderRadius:0}}>
        <div className="card-header position-sticky">
            <h2>
                <FontAwesomeIcon icon={faEnvelope} /> Inbox
            </h2>
        </div>
        <div className="card-body nice-scrollbar">
            {children}
        </div>
    </div>
);

export default ()=>{
    const {profile} = useWebProperty();
    const {history} = useRouter();
    const InboxProp = {
        Wrapper : InboxWrapper,
        api : getMessagesInfo,
        Hook : PersonalChannelHook,
        onClick : (data)=>{
            const query = ("?"+querystring.stringify({
                name : data.name,
                ...data
            }));
            history.push('../konseling'+ query)
        }
    };

    return(
        <div className='row'>
            <div className="col-md-12">
                <h2 className='text-white'>
                    Selamat datang {profile.nama}
                </h2>
            </div>
            <div className="col-md-6">
                <Inbox {...InboxProp} />
            </div>
            <div className="col-md-6">
                <Profile />
            </div>
        </div>
    )
};