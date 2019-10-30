import React, {useState, useEffect, useRef} from "react";
import faker from 'faker';
import momentRandom from 'moment-random';
import ChatBox from "./ChatBox";
import Userlist from "./Userlist";
import InsertComment from "./InsertComment";
import {GET} from "../../api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const generateRandom = async ()=>{
    return new Promise(resolve => {
        setTimeout(()=>{
            let data = Array.from({length:100});
            data = data.map((item, index)=>{
                let name = faker.name.firstName();
                let message = faker.lorem.sentences();
                let self = (index + 1) % 3 === 0;
                let date = momentRandom(new Date(), new Date(new Date().setDate(0)));
                return {
                    name,message, date, self
                }
            });
            resolve(data)
        }, 3*1000);
    });
};


const GroupChat = ({anggota})=>{
    const [chatdata, setChatData] = useState([]);
    const [_anggota, setAnggota] = useState(anggota);
    const refs = useRef(null);
    const chatDatasetter = (_data) =>{
        setChatData(_data.sort((a,b)=> new Date(b.date._d) - new Date(a.date._d)).reverse());
    };
    if (! chatdata.length){
        let newdata = [];
        for (let i = 0 ; i<3;i++){
            newdata= [...newdata,...anggota.map(({nama})=>{
                let message = faker.lorem.sentences();
                let self = false;
                let date = momentRandom(new Date(), new Date(new Date().setDate(0)));
                return {
                    name:nama,message, date, self
                }
            })];
            chatDatasetter(newdata);
        }
    }
    return (
        <div ref={refs} className="card">
            <div className="card-body">
                <Link to={'/'}>
                    <button className="btn btn-sm btn-default">
                        <FontAwesomeIcon icon={faChevronLeft} className='mr-2' />
                        Kembali
                    </button>
                </Link>
                <div className="row">
                    <ChatBox data={chatdata} />
                    <Userlist data={_anggota} />
                    <InsertComment data={chatdata} Handler={chatDatasetter} />
                </div>
            </div>
        </div>
    )
};

export default ({Consumer})=> {
    return <div>
        <Consumer>
            {({kelompok, anggota})=><GroupChat anggota={anggota} kelompok={kelompok} />}
        </Consumer>
    </div>
}