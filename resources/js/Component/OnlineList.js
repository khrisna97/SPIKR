import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSync} from "@fortawesome/free-solid-svg-icons";
const sortByOnlineStatus = (users)=> {
    let tofilter = ['online','name'];

    if (users[0] && users[0].hasOwnProperty('unreaded')){
        tofilter = ['unreaded',...tofilter];
    }

    return _.orderBy( users , tofilter,['desc'])
};
const findByOnlineStatus = (users)=> {
    return _.filter( users , {online:1}).length;
};
const finduserid = (users, idtofind)=>_.findIndex( users , ['id', idtofind]);

class OnlineList extends React.Component{

    state = {users : [], loading:false};

    constructor(props) {
        super(props);

    }

    UsersSetter =(param)=>{

        if (Array.isArray(param)){
            const {users} = this.state;
            const sorted = (sortByOnlineStatus([...users, ...param]));
            this.setState({
                users :sorted,loading:false,
            })
        }else if(typeof param === 'object'){
            const {users} = this.state;
            let i = finduserid(this.state.users, param.id);
            users[i] = {...users[i], ...param};
            const sorted = (sortByOnlineStatus(users));
            this.setState({
                users :sorted,loading:false,
            })
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("online updated")
    }

    componentDidMount() {
        const { readIncoming,disableListener ,detectReaded,customIncoming ,socket} = this.props;
        if (! disableListener){
            const {Channel} = socket;
            Channel.joining(user=>{
                console.log(user);
                this.UsersSetter(user);
            }).leaving(user=>{
                console.log(user);
                user.online = 0;
                this.UsersSetter(user);
            });

            if (readIncoming){
                socket.Listener.Incoming((user=>{
                    console.log(user);
                    this.UsersSetter(user);
                    if (customIncoming){
                        customIncoming(user)
                    }
                }))
            }

            if (detectReaded){
                socket.Listener.Readed((user=>{
                    console.log(user);
                    this.UsersSetter(user);
                }))
            }
        }

        this.Setup();
    }


    Setup =()=>{
        const {api, needlist} = this.props;
        this.setState({users:[],loading:true});
        setTimeout(_=>{
            api.method(api.param).then((data)=>{
                this.UsersSetter(data);
                if (needlist){
                    needlist(data);
                }
            });
        }, 200)
    };

    render() {
        let {Item, hideself, disableonlinecount, Container} = this.props;
        const {users} = this.state;


        return (
            <div>
                {
                    disableonlinecount ? "" :
                            <div className="text-right my-2">
                                {this.state.loading ? "Loading" :""}
                                {users.length ? `online ${findByOnlineStatus(users)}`:""}
                                <FontAwesomeIcon icon={faSync} className='mx-3' onClick={this.Setup} spin={this.state.loading} />
                            </div>
                }
                <Container>
                    {
                        users.length ? users.map((item, key)=>{
                            return hideself && item.id === window.userdata.id ?"": <Item {...item} key={key} />
                        }) :""
                    }
                </Container>
            </div>)
    }
}
export default OnlineList
