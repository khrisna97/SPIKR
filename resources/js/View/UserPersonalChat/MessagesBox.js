import React from "react";
import {getConversations} from "../../Api/KonselingApi";
import ChatWrapper from "../../Component/ChatWrapper";
import MessageBox from "../../Component/MessageBox";

export default ({personal, channel, selectedKonselor})=>{


    const MessageBoxProp = {
        api:{
            method : getConversations,
            param : {userid: selectedKonselor.id},
        },
        userid: personal.id,
        socket : channel,
        Container : (prop)=><div {...prop} className='py-3 rounded border' style={{height:"60vh",overflow:'auto'}} />,
        ItemWrapper : (prop)=> ChatWrapper(prop, personal),
        customSetter : (data)=>{
            return (data.api.param.userid !== selectedKonselor.id);
        },
    };

    return <MessageBox {...MessageBoxProp} />
}