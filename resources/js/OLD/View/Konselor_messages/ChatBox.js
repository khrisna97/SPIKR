import React, {useEffect, useRef, useState} from "react";
import Scrollbar from "react-smooth-scrollbar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSyncAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import faker from 'faker';
import momentRandom from "moment-random";
import InsertChat from "./InsertChat";
const SelfChat = ({name}) =><div className='card-header py-3 text-right'>
    Anda
</div>;
const OtherChat = ({name})=>{
    return (<div className='card-header py-3 d-flex justify-content-between'>
    <span>
        <FontAwesomeIcon icon={faUser} className={'mr-2'} />
        {name}
    </span>
    </div>)};
const Chat = ({message, self, date, nama}) =>{
    return (<div className='card my-2 mx-2' style={{height:"fit-content"}}>
        {
            self ? <SelfChat name={nama} /> :
                <OtherChat name={nama}  />
        }
        <div className="p-2">
            <small className='d-block'>
                {
                    moment(date).locale('id').fromNow()
                }
            </small>
            {message}
        </div>
    </div>)
};

const ChatSimulation = async ({nama})=>{
    return new Promise(resolve => {
        let Arr = Array.from({length:20});
        Arr = Arr.map((key, index)=>{
            let message = faker.lorem.sentences();
            let self = index % 4 === 0;
            let date = momentRandom(new Date(), new Date(new Date().setDate(0)));
            return {
                message, self, date,nama
            }
        });
        resolve(Arr)
    });
};

export default (prop)=>{
    const [data, setdata] = useState([]);
    const toScroll = useRef(null);
    const toSmooth = useRef(null);
    const scrollToBottom = () => {
        if (data.length) {
            const instance = toScroll.current;
            const _scrollbar = instance.scrollbar;
            const toY = _scrollbar.size.content.height;
            _scrollbar.setPosition(0, toY)

        }
    };
    useEffect(scrollToBottom, [data]);
    const chatDatasetter = (_data) =>{
        setdata(_data.sort((a,b)=> new Date(b.date._d) - new Date(a.date._d)).reverse());
    };
    if (!data.length){
        ChatSimulation(prop).then(res=>{
            console.log(res);
            chatDatasetter(res)
        });
    }
    return <div className=''>
        <h1>
            ChatBox
        </h1>
        <div className="">
            <small>
                {
                    prop.nama
                } sedang offline
            </small>
            <div className='p-2 pr-0 rounded bg-light'>
                <Scrollbar ref={toScroll}>
                    <div className='pr-2' style={{height:"50vh"}}>
                        {
                            ! data.length ?
                                <div className='h-100 d-flex flex-row justify-content-center align-items-center text-center'>
                                    <FontAwesomeIcon icon={faSyncAlt} className='fa-5x fa-spin' />
                                </div>:
                                data.map((prop, key)=>{
                                    return <Chat {...prop} key={key} />
                                })
                        }
                    </div>
                </Scrollbar>
            </div>
            <InsertChat Handler={chatDatasetter} data={data} />
        </div>
    </div>
}