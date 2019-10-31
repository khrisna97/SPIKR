import React from "react";
import {Webproperty} from "../../Hooks/Webprop";
import {Button} from 'reactstrap';
import {PersonalChannelHook} from "../../Hooks/PersonalChannelHook";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserMd} from "@fortawesome/free-solid-svg-icons";
import {RouterContext} from "../../BrowserRouter";
import querystring from 'querystring';

import Composer from "./Composer";
import MessageBox from './MessagesBox';
import KonselorSelector from "./KonselorSelector";
import KonselorInfo from "./KonselorInfo";
import _Listener from "./Listener";


class UserPersonalChat extends React.Component{

    _Mounted = false;

    state = {
        konselormenu : false,
        selectedKonselor : undefined,
    };

    setKonselor =(selectedKonselor) =>this.setState({selectedKonselor});

    setKonselorMenu=(status)=>this.setState({konselormenu: status});

    componentDidMount() {
        const {konselor, Listener, history} = this.props;

        const {search} = history.location;

        if (search){
            const query = querystring.parse(search.replace('?',''));
            this.setKonselor(query);
            history.push('../konseling')
        }else{
            konselor && this.setKonselor(konselor);
        }

        this._Mounted = true;


        _Listener({Listener, classes:this});

    }

    componentWillUnmount() {
        this._Mounted = false;
    }


    render() {
        const {selectedKonselor} = this.state;
        return (
            <React.Fragment>
                <div className='card mb-5'>
                    <div className="card-header">
                        {selectedKonselor ? <KonselorInfo {...selectedKonselor} /> : ""}
                    </div>
                    <div className="card-body">
                        <Button className={'d-block'} onClick={()=>this.setKonselorMenu(true)}>
                            <FontAwesomeIcon icon={faUserMd} className='mr-2' />
                            Pilih konselor lain
                        </Button>
                        {selectedKonselor ? <MessageBox {...this.state} {...this.props} />: ""}
                        {selectedKonselor ? <Composer classes={this} {...this.state} />: ""}
                    </div>
                </div>
                <KonselorSelector {...this.state} {...this.props} classes={this} />
            </React.Fragment>
        );
    }
}

export default ()=>(
    <RouterContext.Consumer>
        {
            router =><Webproperty.Consumer>
                {
                    webprop =>(
                        <PersonalChannelHook.Consumer>
                            {channel=> <UserPersonalChat
                                channel={channel}
                                {...channel}
                                {...webprop}
                                {...router}
                            />}
                        </PersonalChannelHook.Consumer>
                    )}
            </Webproperty.Consumer>
        }
    </RouterContext.Consumer>
);