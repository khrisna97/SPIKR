import useRouter from "../../Hooks/Router";
import Query from "querystring";
import {ListGroup} from "reactstrap";
import {GetGroupMemberApi, GetGroupMessagesApi, SentGroupMessagesApi} from "../../Api/GroupApi";
import GroupWebSocket from "../../Websocket/Groupchat";
import MessageBox from "../../Component/MessageBox";
import MessageComposer from "../../Component/MessageComposer";
import OnlineList from "../../Component/OnlineList";
import {Webproperty} from "../../Hooks/Webprop";
import React from "react";
import ChatWrapper from '../../Component/ChatWrapper';
import UserListItem from "../../Component/UserListItem";

const UserGroupChat =({webprop})=>{

    const {anggota, personal, konselor} = webprop;

    const OnlineListProp = {
        Item :UserListItem,
        Container : ListGroup ,
        api:{
            method : GetGroupMemberApi,
            param : {kelompok: anggota.kelompok},
        },
        socket : GroupWebSocket(anggota.kelompok)
    };

    const MessageBoxProp = {
        api:{
            method : GetGroupMessagesApi,
            param : {kelompok: window.kelompokdata.kelompok},
        },
        userid: personal.id,
        socket : GroupWebSocket(anggota.kelompok),
        Container : (prop)=><div {...prop} className='py-3 rounded border' style={{height:"60vh",overflow:'auto'}} />,
        ItemWrapper : (prop)=> ChatWrapper(prop, personal)
    };

    const MessageComposerProp = {
        api :{
            method : SentGroupMessagesApi,
            params : {kelompok:anggota.kelompok}
        }
    };

    return (
        <div className="card mb-5">
            <div className="card-body">
                <div className='row'>
                    <div className="col-md-8">
                        <h3 className='border-bottom'>
                             {window.kelompokdata.nama}
                         </h3>
                        <MessageBox {...MessageBoxProp} />
                        <MessageComposer {...MessageComposerProp} />
                     </div>
                    <div style={{maxHeight:'90vh',overflowY:'auto'}} className="col-md-4 position-relative d-none d-md-block border-left">
                        <OnlineList {...OnlineListProp} />
                     </div>
                 </div>
             </div>
         </div>
     )
};

export default (prop)=><Webproperty.Consumer>{(webprop)=> <UserGroupChat {...prop} webprop={webprop}  /> }</Webproperty.Consumer>