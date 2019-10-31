import React, {useEffect, useRef, useState} from "react";
import {Badge, ListGroup, ListGroupItem} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faDotCircle} from "@fortawesome/free-solid-svg-icons";
import useGroupWebsocket from "../Hooks/JoinGroup";
import {JoinGroupChatAPI} from "../Api/allroles";
import {PersonalIncomingChat} from '../Hooks/PersonalChat';
const replaceAll = function(string,search, replacement) {
    return string.split(search).join(replacement);
};
export const UserChatInfo  = ({onClick,nama, id,online,Badge})=> {

    const ListGroupItemProp = {
        className : 'pointer',
        title : online? window.userdata.role === 2? `Private chat dengan ${nama}`:'Online':'Offline',
    };

    if (window.userdata.role === 2){
        const Query = require('querystring');
        ListGroupItemProp.path = Query.stringify({nama , id});
        if (onClick){
            ListGroupItemProp.onClick = ()=>{
                onClick(nama, id);
            };
        }
    }
    return id !== window.userdata.id ? (
            <ListGroupItem {...ListGroupItemProp} >
                <FontAwesomeIcon icon={faDotCircle} className={`mr-3 text-${online?'success':'dark'}`} />
                {
                    window.userdata.role === 2 ?
                        <FontAwesomeIcon icon={faComment} className={`mr-3 ${online?'text-success':''}`} /> : ""
                }
                {Badge? <Badge/> :""}
                <span className="ml-3">
                {nama}
                </span>
            </ListGroupItem>
    ):''
};


const GetUserList = async () =>new Promise(resolve => {
    JoinGroupChatAPI(window.kelompokdata.kelompok, (data)=>{
        resolve(data)
    });
});


export default (prop)=>{
    const [users, setUsers] = useState([]);

    const webSocket = useGroupWebsocket();

    const UserSetter = (userlist)=>{
        setUsers(userlist)
    };

    useEffect(()=>{
        !users.length && webSocket.GroupOnlineList(({anggota})=>{
            if (anggota){
                UserSetter(anggota)
            }
        });

        !users.length && GetUserList().then((res)=>{
            UserSetter(res);
        });
    });

    return (
        <React.Fragment>
            {!users.length ?<React.Fragment>
                    <p>Loading ..... <br/></p>
                    <small>Apabila tidak muncul tekan tombol refresh</small>
                    <button onClick={()=>{
                        GetUserList().then(res=>UserSetter(res))
                    }} className='btn d-block btn-small'>
                        Refresh
                    </button>
                </React.Fragment>
                :
                <ListGroup>
                    {
                        users.length ? users.map((item, key)=><UserChatInfo {...prop} {...item}   key={key} />) : ""
                    }
                </ListGroup>
            }

        </React.Fragment>
    )
}