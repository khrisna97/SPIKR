import React,{Component} from "react";
import {
    faBell,
    faSpinner
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Badge} from "@material-ui/core";

const SortByTime = (arr)=>(_.orderBy(arr,['time']['desc'])).reverse();

const Init = {
    page : 1,
    last : 0,
    messages : [],
    total : 0,
    loading : false,
    refIndex : -1,
    notifcount : 0,
    toscroll:true,
};

class MessageBox extends Component{
    state = Init;

    _Mounted = false;

    constructor(props) {
        super(props);
        this.toScroll = React.createRef(null);
        this.audio = React.createRef(null);
        this.observe = React.createRef(null);
    }


    componentDidMount() {
        this._Mounted = true;
        const {socket} = this.props;
        //
        if (socket){

            socket.Listener.Incoming && socket.Listener.Incoming((data)=>{
                if (this._Mounted){
                    const newState = {
                        messages : [...this.state.messages, data],
                    };


                    if (data.users.sender.id !== this.props.userid){
                        newState.notifcount = this.state.notifcount+1;
                    }else{

                        newState.toscroll = true;
                        newState.refIndex = newState.messages.length-1;

                    }
                    this.setState({...newState});
                }
            });

            socket.Listener.messages && socket.Listener.messages(({websocket})=>{
                if (this._Mounted){
                    const {users} = websocket;
                    const {api, userid} =  this.props;
                    if (users.sender.id === api.param.userid || users.sender.id === userid
                    ){
                        const newState = {
                            messages : [...this.state.messages, websocket],
                        };

                        if (websocket.users.sender.id !== this.props.userid){
                            newState.notifcount = this.state.notifcount+1;
                        }else{

                            newState.toscroll = true;
                            newState.refIndex = newState.messages.length -1 ;

                        }
                        this.setState({...newState});
                    }
                }
            });
        }
        this.Setup();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {current} = this.toScroll;
        const {toscroll} = this.state;
        const {customSetter} = this.props;
        toscroll && current && current.scrollIntoView(
            {
                block: 'nearest', inline: 'start'
            }
        );
        if (customSetter){
            if (customSetter(prevProps)){
                this.setState(Init);
                this.Setup(1)
            }
        }
        const observer = new IntersectionObserver((entries)=> {
            if(entries[0].isIntersecting === true){
                const {notifcount} = this.state;
                if (notifcount){
                    this.setState({
                        notifcount: 0,
                        toscroll:false
                    })
                }
            }
        }, { threshold: [1] });
        observer.observe(this.observe.current);
    }

    Setup =(page)=>{
        const {api} = this.props;
        api.method({...api.param, page: page? page : this.state.page}).then(res=>{
            const Sorted = [ ...SortByTime(res.data),...this.state.messages];
            setTimeout(()=>{
                this.setState({
                    page: res.page,
                    last : res.last,
                    messages :Sorted,
                    loading: false,
                    toScroll: true,
                    refIndex : this.state.messages.length ? Sorted.length - this.state.messages.length : Sorted.length-1
                })
            },1000);
        });
    };

    componentWillUnmount() {
        this._Mounted = false;
    }

    render() {
        const {messages, notifcount,refIndex} = this.state;

        const {Container, ItemWrapper} = this.props;

        return <div>
            <div style={{minHeight:'20px'}} className='mb-2 text-right'>
                {
                    notifcount ?
                        <Badge className={'text-danger'} badgeContent={notifcount}>
                            <FontAwesomeIcon className='animated infinite delay-2s swing' icon={faBell}/>
                        </Badge> : ""
                }
            </div>
            <Container>
                <div className="text-center">
                    {
                        this.state.last > this.state.page
                            ?
                            this.state.loading ?
                                <div>
                                    <FontAwesomeIcon icon={faSpinner} className='fa-spin fa-3x' />
                                    <p>Loading</p>
                                </div>:
                                <button className="btn" onClick={()=>{
                                    this.setState({
                                        loading: true
                                    });
                                    this.Setup(this.state.page+1)
                                }}>
                                    Tampilkan lebih banyak
                                </button>
                            :""
                    }
                </div>
                {
                    messages.length ? messages.map((item,key)=>
                        {
                            const prop = {key};

                            if (refIndex === key){
                                prop.ref = this.toScroll;
                            }
                            return <div className='mx-3' {...prop}><ItemWrapper  {...item} /></div>
                        }
                    ): !this.state.loading ?
                        <h1 className='text-center'>
                            Ayo mulai chat
                        </h1> :
                        'loading'
                }
                <div ref={this.observe} />
            </Container>
        </div>
    }
}

export default  MessageBox