import React from "react";
import {getInboxIall} from '../../../Api/KonselorAdminApi';
import {PersonalChannelHook} from "../../../Hooks/PersonalChannelHook";
import Inbox from "../../../Component/Inbox";

export default ({setter, drawerSetter})=>{

    const UserSetter = (users)=>{
        if (users){
            setter(users);
            drawerSetter(false);
        }
    };

    const InboxProps = {
        api : getInboxIall,
        Hook : PersonalChannelHook,
        Wrapper: ({children})=><div className='p-2'>{children}</div>,
        onClick : (data)=>{
            UserSetter(data)
        },
    };

    return <Inbox {...InboxProps} />

}