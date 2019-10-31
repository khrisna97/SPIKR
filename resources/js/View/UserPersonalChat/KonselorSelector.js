import React from "react";
import {getConselorList} from "../../Api/KonselingApi";
import {PersonalChannelHook} from "../../Hooks/PersonalChannelHook";
import {Drawer} from "@material-ui/core";
import Inbox from "../../Component/Inbox";


export default ({konselormenu, classes})=>{
    const KonselorSetter = (konselor)=>{
        if (konselor){
            konselor = konselor.hasOwnProperty('sender') ? konselor.sender : konselor;
            classes.setState({
                konselormenu: false,
                selectedKonselor : {...konselor, unreaded:konselor.unreaded},
            })
        }
    };

    const InboxProps = {
        api : getConselorList,
        Hook : PersonalChannelHook,
        Wrapper: ({children})=><div className='p-2'>{children}</div>,
        onClick : (data)=>{
            KonselorSetter(data)
        },
        customfunction : (data)=>{
            const {konselor} = classes.props;
            if (konselor && data.data.length){
                const {selectedKonselor} = classes.state;
                if (konselor.id === selectedKonselor.id && !selectedKonselor.hasOwnProperty('unreaded')){
                    const _selectedkonselor = data.data.find(item=>{
                        if (item.sender){
                            return item.sender.id === konselor.id
                        }
                        return  item.id === konselor.id
                    });
                    KonselorSetter(_selectedkonselor);
                }
            }
        }
    };
    return (
        <Drawer keepMounted open={konselormenu} onBackdropClick={()=>classes.setKonselorMenu(false)}>
            <Inbox {...InboxProps} />
        </Drawer>
    )
};