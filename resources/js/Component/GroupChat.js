import React, {useEffect, useRef, useState} from "react";
import {Input} from "reactstrap";
import {getGroupChatData, SentGroupMessageApi} from "../Api/allroles";
import moment from "moment";
import useGroupWebsocket from "../Websocket/Groupchat";
import BIGLoader from "./BIGLoader";
import withSizes from 'react-sizes'
import {Drawer} from "@material-ui/core";
import GroupChatList from "./GroupChatList";
const OnlineUserListMobile = ({isMobile})=>{
    const [drawerOpen, setDrawerOpen] = useState(false);

    const DrawerSetter = ()=>setDrawerOpen(!drawerOpen);

    return (
        <React.Fragment>
            <Drawer open={drawerOpen&& isMobile} onBackdropClick={DrawerSetter} >
                <GroupChatList/>
            </Drawer>
            <button className='btn w-100' onClick={DrawerSetter}>
                Tampilkan user online
            </button>
        </React.Fragment>
    )
};
const mapSizesToProps = ({ width }) => ({
    isMobile: width < 768,
});
const MessageComposer = withSizes (mapSizesToProps) ((prop) => {

    const [message, setMessage] = useState('');

    const BtnHandler = ()=>{
        if (message){
            SentGroupMessageApi(window.kelompokdata.kelompok, message);
            setMessage("");
        }
    };
    const ComposeMessage = ({target})=>{
        setMessage(target.value);
    };

    return (
        <React.Fragment>
            <Input value={message} onChange={ComposeMessage} type={'textarea'} style={{resize:'none'}} />
            <div className='mt-3'>
                <button onClick={BtnHandler} className="btn col-md-6 mb-5 btn-primary">
                    Kirim pesan
                </button>
                <div className="d-sm-none">
                    <OnlineUserListMobile {...prop} />
                </div>
            </div>
        </React.Fragment>
    )
});


const SortBydate = (array)=>{
    return _.orderBy(array, (o) =>  moment(o.message.time).format('YYYYMMDD'), ['asc']);
};


class MessageBox extends React.Component {


    state = {
        messages : [],
        page : 1,
        loading : true,
        refPos : 0,
    };

    WebSocket = useGroupWebsocket(window.kelompokdata.kelompok);

    constructor(props, context) {
        super(props, context);
        this.lastChat = React.createRef();
    }

    SetNewMessage=(newMessage)=>{
        const newMessagesArr = [...this.state.messages,newMessage];

        this.setState({
            messages : newMessagesArr,
            refPos : newMessagesArr.length-1,
        })
    };

    SetOldMessages=(newMessages)=>{
        const newOld = [...newMessages, ...this.state.messages];
        this.setState({
            messages : SortBydate (newOld),
            page : this.state.page +1,
            refPos : newMessages.length -1,
        })
    };

    SetMessage=(messages)=>{
        this.setState({
            messages,
            loading: false,
            refPos : messages.length -1,
        })
    };

    componentWillUnmount() {
        const {StopGroupChatList} = this.WebSocket;
        StopGroupChatList();
        console.log("i am unmounted")
    }

    componentDidMount() {

        const {GroupChatList} = this.WebSocket;
        this.GetChatData();
        GroupChatList(({message, user})=>{
            if (message && user){
                this.SetNewMessage({message, user})
            }
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.lastChat.current){
            this.lastChat.current.scrollIntoView()
        }
    }

    GetChatData =()=>{
        const {page} = this.state;
        getGroupChatData(window.kelompokdata.kelompok, (data)=>{
            this.SetMessage(data.reverse());
        }, page);
    };

    loadMoreHandler = ()=>{
        let {page} = this.state;
        page = page+1;
        getGroupChatData(window.kelompokdata.kelompok, (data)=>{
            this.SetOldMessages(data.reverse());
        }, page);
    };

    renderMessages = ()=>{
        const {messages} = this.state;
        return (
            <div>
                <div className="text-center">
                    <button onClick={this.loadMoreHandler} className="btn my-2 btn-primary">
                        Tampilkan lebih banyak
                    </button>
                </div>
                {messages.map(({user, message}, key)=> (
                        <div ref={key === this.state.refPos? this.lastChat : null } className='border-0 d-flex' key={key}>
                            <div  style={{width:'fit-content'}} className={`m-2  p-0 ${user.id === window.userdata.id?'ml-auto':''}`}>
                                <div className="">
                                    <p className='border-bottom mb-0'>
                                        {user.id === window.userdata.id ? "Anda": user.name}
                                    </p>
                                    <div className={'bg-light shadow rounded p-3'}>
                                        <p className={'mb-0'}>
                                            {message.content}
                                        </p>
                                    </div>
                                    <small>
                                        {moment(message.time).locale('id').fromNow()}
                                    </small>
                                </div>
                            </div>
                        </div>
                    )
                )
                }
            </div>
        );
    };
    render() {
        const {loading} = this.state;
        return !loading ? this.renderMessages():
            <div className='text-center py-5'>
                <BIGLoader/>
                <h1 className='mt-5'>
                    Loading
                </h1>
            </div>
    }
}

export default ()=>{

    return (
        <React.Fragment>
            <div style={{height:"60vh",overflow:'auto'}} className=''>
                <MessageBox/>
            </div>
            <div className={'mt-2'}>
                <MessageComposer/>
            </div>
        </React.Fragment>
    )
}