import React from "react";
import {ListGroup, ListGroupItem, ListGroupItemHeading} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDotCircle, faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {Badge} from "@material-ui/core";

const Box = (prop)=>{
    const {unreaded, total, sender, readed, onClick} = prop;
    const Prop = {
        unreaded,
        id : prop.sender ? prop.sender.id : prop.id,
        online : prop.sender? prop.sender.online : prop.online,
        name : prop.sender ? prop.sender.name : prop.name
    };

    const onClickHandler = ()=>{

        typeof onClick === "function" && onClick(Prop);
    };



    return(
        <ListGroupItem className={'pointer'} onClick={onClickHandler} title={`${unreaded} pesan belum di baca`}>
            <ListGroupItemHeading className={'px-2 my-1 py-0'}>
                <div className="row">
                    <div className="">
                        <FontAwesomeIcon title={Prop.online?'online':`${Prop.name} sedang offline`} className={Prop.online? 'text-success':'text-dark'} icon={faDotCircle} />
                        <Badge title={`${Prop.unreaded} pesan belum di baca`} className={`${Prop.unreaded?'text-danger':''} mx-2`} badgeContent={Prop.unreaded}>
                            <FontAwesomeIcon className={'mr-2'} icon={faEnvelope} />
                        </Badge>
                    </div>
                    <div className="ml-3">
                        {Prop.name}
                    </div>
                </div>
            </ListGroupItemHeading>
        </ListGroupItem>
    )};
export default ({data, onClick})=><ListGroup>{data.map((item, key)=><Box onClick={onClick} {...item} key={key} />)}</ListGroup>;