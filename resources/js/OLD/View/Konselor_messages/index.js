import React from "react";
import QueryString from "querystring";
import Detail from "./Detail";
import ChatBox from "./ChatBox";
const KonselorMessages = ({anggota, router}) =>{
    let {id} = QueryString.parse(router.location.search.replace("?",''));
    anggota = anggota.find((item)=>{
        return item.id === parseInt(id)
    });
    return <div className="card">
        <div className="card-body">
            <div className={'row'}>
                <div className="col-md-6">
                    <Detail {...anggota}/>
                </div>
                <div className="col-md-6">
                    <ChatBox {...anggota}/>
                </div>
            </div>
        </div>
    </div>
};

export default (prop)=>{
    let {Consumer} = prop;
    return <Consumer>
        {({anggota, router})=><KonselorMessages router={router} anggota={anggota} />}
    </Consumer>
}