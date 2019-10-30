import {sentMessage} from "../../Api/KonselingApi";
import MessageComposer from "../../Component/MessageComposer";
import React from "react";

const Composer = ({user, setter}) =>{

    let params = {user:user.id};

    if (user.kelompok){
        params = {...params, kelompok : user.kelompok}
    }

    const MessageComposerProp = {
        api :{
            method : sentMessage,
            params
        },
        aftersent : ({user})=>{
            if (user.id === user){
                setter({...user, unreaded : 0})
            }
        }
    };

    return <MessageComposer {...MessageComposerProp} />

};
export default Composer;