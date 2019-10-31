import React, {createContext, useContext} from "react";
import ReactDOM from 'react-dom';
import init from "../bootstrap";
import Layout from '../Layout/User';
import { Route} from "react-router-dom";
import AppRouter from "../BrowserRouter";
import '../index.scss';
import {GroupWebSocket} from "../Hooks/JoinGroup";
import JoinGroupWebHook from "../Websocket/Groupchat";
import {Webproperty} from "../Hooks/Webprop";
import KonselingSessions from "../Websocket/KonselingSessions";
import {PersonalChannelHook} from "../Hooks/PersonalChannelHook";
import PersonalChannel from "../Websocket/PersonalChannel";
import PlaySound from "../Playsound";
const App =  ()=>{
    const WebProp = {
        anggota : window.kelompokdata,
        personal : window.userdata,
        profile : window.personaldata,
        konselor : window.konselordata,
        kelompok : window.infokelompok
    };


    KonselingSessions(WebProp.konselor.id, WebProp.personal.id).Sessions.here(_=>{
    });

    const _PersonalChannel = PersonalChannel(WebProp.personal.id);

    _PersonalChannel.Listener.messages((data)=>{
        const title =Array.from(document.getElementsByTagName('title'))[0] ;
        const default_title = title.innerText;

        const {users, sender} = data;

        let id = users? users.sender.id : sender.id;

        if (id !== WebProp.personal.id){

            title.innerText ="Pesan baru | "+default_title;
            setTimeout(_=>title.innerText = default_title,3000);
            PlaySound();
            
        }
    });

    return <AppRouter >
        <Route render={prop=>{
            const Context = createContext(prop);
            return (
                <Webproperty.Provider value={WebProp}>
                    <GroupWebSocket.Provider value={JoinGroupWebHook(window.kelompokdata.kelompok)}>
                        <PersonalChannelHook.Provider value={_PersonalChannel}>
                            <Layout Context={Context}> </Layout>
                        </PersonalChannelHook.Provider>
                    </GroupWebSocket.Provider>
                </Webproperty.Provider>
            )
        }}/>
    </AppRouter>
};
init().then(()=>{
    document.querySelector('html').classList.add('nice-scrollbar');
    document.querySelector('body').classList.remove('hidden');

    ReactDOM.render(<><App type={'user'} /></>, document.getElementById('root'));
});