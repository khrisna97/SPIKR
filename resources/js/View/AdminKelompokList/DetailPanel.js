import React from "react";
import {RouterContext} from "../../BrowserRouter";
import VisibilityIcon from '@material-ui/icons/Visibility';
import queryString from "querystring";

const ActionComponent = ({history, rowdata})=> {
    const {push} =history;
    const {id, nama} = rowdata;
    const onClick =()=>{
        push('../kelompok/detail?'+ queryString.stringify({
            kelompok : nama.replaceAll(' ','.'),
            kelompok_id : id
        }))
    };

    return <VisibilityIcon onClick={onClick} />
};
export default [
    row=>(
        {
            icon : ()=><RouterContext.Consumer>{ ({history})=><ActionComponent history={history} rowdata={row} />  }</RouterContext.Consumer>,
            tooltip: "Detail",
        }
    ),
];