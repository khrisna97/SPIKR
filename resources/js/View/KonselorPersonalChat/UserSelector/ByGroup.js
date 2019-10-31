import React from "react";
import {getInboxInGroup} from '../../../Api/KonselorAdminApi';
import {PersonalChannelHook} from "../../../Hooks/PersonalChannelHook";
import Inbox from "../../../Component/Inbox";

const UserSelector = ({setter, drawerSetter, kelompok}) =>{

    const UserSetter = (users)=>{
        if (users){
            setter(users);
            drawerSetter(false);
        }
    };

    const InboxProps = {
        api : getInboxInGroup,
        Hook : PersonalChannelHook,
        Wrapper: ({children})=><div className='p-2'>{children}</div>,
        onClick : (data)=>{
            const user = {...data, kelompok};
            UserSetter(user);
        },
    };
    return <Inbox {...InboxProps} />
};

export default UserSelector;