import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";


export default ({path}) =>{

    const [finish, setFinish] = useState(false);

    return <div>
        <img
            src={path}
            onLoad={()=>setTimeout(_=>setFinish(true),1000)}
            alt=""
            className={finish?'img-fluid':'d-none'}
        />
        {
            !finish ?
                <div className=" text-center">
                    <p>
                        loading
                    </p>
                    <FontAwesomeIcon icon={faSpinner} spin size='5x' />
                </div>
                : ''
        }
    </div>
}