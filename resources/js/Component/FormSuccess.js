import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import AnimatedDiv from "./AnimatedDiv";
export default ({text})=> {
    return <AnimatedDiv>
        <div className="text-center">
            <FontAwesomeIcon icon={faCheck} className='fa-10x text-success' />
            <div className='text-uppercase text-white'>
                {text}
            </div>
        </div>
</AnimatedDiv>}