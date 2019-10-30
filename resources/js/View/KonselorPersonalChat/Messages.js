import {PersonalChannelHook} from "../../Hooks/PersonalChannelHook";
import {getConversations} from "../../Api/KonselingApi";
import ChatWrapper from "../../Component/ChatWrapper";
import MessageBox from "../../Component/MessageBox";
import React from "react";

const Messages = ({personal, user})=>(<PersonalChannelHook.Consumer>
    {
        channel =>{
            const MessageBoxProp = {
                api:{
                    method : getConversations,
                    param : {userid: user.id},
                },
                userid: personal.id,
                socket : channel,
                Container : (prop)=><div {...prop} className='py-3 rounded border' style={{height:"60vh",overflow:'auto'}} />,
                ItemWrapper : (prop)=> ChatWrapper(prop, personal),
                customSetter : (data)=>{
                    return (data.api.param.userid !== user.id);
                },
            };
            return <MessageBox {...MessageBoxProp} />
        }
    }
</PersonalChannelHook.Consumer>);

export default Messages;
