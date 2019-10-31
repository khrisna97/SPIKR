import React, {useState} from "react";
import useRouter from "../Hooks/Router";
import GroupChatList from "./GroupChatList";
import {Drawer} from "@material-ui/core";
import Query from "querystring";
import UserListItem from "./UserListItem";
import {ListGroup} from "reactstrap";
import GroupWebSocket from "../Websocket/Groupchat";
import {GetGroupMemberApi} from "../Api/GroupApi";

import useWebProperty from "../Hooks/Webprop";
import OnlineList from "./OnlineList";


export default ({open, otherSetter})=>{

    const {history} = useRouter();
    const {anggota} = useWebProperty();

    const OnlineListItemClickHandler = user =>{
        otherSetter(false)
        history.push('../konseling?'+Query.stringify(user));
    };

    const OnlineListItem =(prop)=>{

        return <UserListItem {...prop} onClick={OnlineListItemClickHandler} />
    };

    const OnlineListProp = {
        Item :OnlineListItem,
        Container : ListGroup ,
        socket : GroupWebSocket(anggota.kelompok),
        api:{
            method : GetGroupMemberApi,
            param : {kelompok: anggota.kelompok},
        }
    };
    return <Drawer onBackdropClick={()=>otherSetter(false)} open={open}>
        <OnlineList {...OnlineListProp} />
    </Drawer>
};