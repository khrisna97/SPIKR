import React from "react";
import {Alert} from "reactstrap";

export default ({MessageSetter, alert})=>{
    return <div id={'alert-container'} style={{position:'absolute', top:'3rem',zIndex:'1000',right:'3rem' }}>
        {
            alert.map(({message, type}, key) => {
                return(
                    <Alert onClick={()=>{
                        MessageSetter([]);
                    }} color={type} key={key}>
                        <strong>
                            {message}
                        </strong>
                    </Alert>
                )
            })
        }
    </div>
}