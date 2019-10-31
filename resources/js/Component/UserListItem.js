import React from "react";
import {ListGroupItem, ListGroupItemHeading} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDotCircle, faEnvelope} from "@fortawesome/free-solid-svg-icons";
import Badge from "@material-ui/core/Badge";

export default (prop) => {
    const {name, online, unreaded,onClick, showunreaded,iconOnHeader} = prop;
    const itemProp = {};
    if (onClick){
        itemProp.onClick = ()=>{
            onClick({
                id:prop.id,
                name : prop.name,
                online
            })
        };
    }

    let Icons = [{
        icon : faDotCircle,
    }];

    if (showunreaded){
        Icons = [...Icons,{icon:faEnvelope,badgeContent:unreaded,badge:true }]
    }
    Icons = Icons.map(item=>{
        item.online = online;
        return item;
    });
    return (
        <ListGroupItem className='pointer' {...itemProp} >
            {
                iconOnHeader ?
                    <ListGroupItemHeading>
                        <RenderIcons items={Icons} />
                    </ListGroupItemHeading> :
                    <React.Fragment>
                        <RenderIcons items={Icons} />
                    </React.Fragment>
            }
            {name}
        </ListGroupItem>
    );
}
const RenderIcons = ({items})=> {
    return items.map(({online,badge, icon, badgeContent}, key)=>
        badge ?
            <Badge className='' badgeContent={badgeContent} key={key} >
                <FontAwesomeIcon className={`${badgeContent?'text-danger':online?'text-success':'text-dark'}`} icon={icon} />
            </Badge> :
            <FontAwesomeIcon key={key} className={`${online?'text-success':'text-dark'} mr-2`} icon={icon} />
    )
};