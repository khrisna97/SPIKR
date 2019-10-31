import React, {useEffect, useRef} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faSyncAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import {PopoverBody, UncontrolledPopover} from "reactstrap";
import Scrollbar from 'react-smooth-scrollbar';
const SelfChat = ({name}) =><div className='card-header py-3 text-right'>
    Anda
</div>;
const OtherChat = ({name})=>{
    name = name.replace(/\s/g,'').replace(/[.]/g ,'').toLowerCase();
    let id = name + Array.from(name).reverse().join("");
    return (<div className='card-header py-3 d-flex justify-content-between'>
    <span>
        <FontAwesomeIcon icon={faUser} className={'mr-2'} />
        {name}
    </span>
        <FontAwesomeIcon id={ id} icon={faComment} />
        <UncontrolledPopover
            className="popover-primary"
            trigger={'hover'} target={id} placement="top">
            <PopoverBody>
                Personal chat dengan {name}
            </PopoverBody>
        </UncontrolledPopover>
    </div>)};
const Chat = ({message, self, date, name}) =>{
    return (<div className='card my-2 mx-2' style={{height:"fit-content"}}>
        {
            self ? <SelfChat name={name} /> :
                <OtherChat name={name}  />
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
export default ({data})=>{
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
    return (
        <div id={'chat-box'} className="col-md-9 mb-2">
            <h2 className="h2-responsive">
                Chat box
            </h2>
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
        </div>
    )
}