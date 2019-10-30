import React from "react";
import {sentMessage} from "../../Api/KonselingApi";
import MessageComposer from "../../Component/MessageComposer";
export default ({selectedKonselor, classes})=>{
    const MessageComposerProp = {
        api :{
            method : sentMessage,
            params : {user:selectedKonselor.id}
        },
        aftersent : ({user})=>{
            if (selectedKonselor.id === user){
                classes.setState({
                    selectedKonselor: {...selectedKonselor, unreaded:0}
                })
            }
        }
    };
    return <MessageComposer {...MessageComposerProp} />
};