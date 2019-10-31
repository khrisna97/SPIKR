import React from "react";
import Query from "querystring";
import useRouter from "../../Hooks/Router";
import OnlineList from "../../Component/OnlineList";
import {GetGroupMemberApi, GetGroupMessagesApi, SentGroupMessagesApi} from "../../Api/GroupApi";
import {ListGroup} from "reactstrap";
import MessageBox from "../../Component/MessageBox";
import GroupWebSocket from "../../Websocket/Groupchat";
import {Webproperty} from "../../Hooks/Webprop";
import MessageComposer from "../../Component/MessageComposer";
import UserListItem from "../../Component/UserListItem";
import ChatWrapper from "../../Component/ChatWrapper";

const KonselorGroupchat =({webprop})=>{

    const {anggota, personal} = webprop;

    const {history} = useRouter();

    const UserPersonalChat = (nama, id)=>{
        history.push('../konseling?'+Query.stringify({nama, id}));
    };

    const OnlineListProp = {
        Item :UserListItem,
        Container : ListGroup ,
        socket : GroupWebSocket(anggota.kelompok),
        api:{
            method : GetGroupMemberApi,
            param : {kelompok: anggota.kelompok},
        }
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
                        <h3 className='border-bottom tex'>
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

export default (prop)=><Webproperty.Consumer>{(webprop)=> <KonselorGroupchat {...prop} webprop={webprop}  /> }</Webproperty.Consumer>