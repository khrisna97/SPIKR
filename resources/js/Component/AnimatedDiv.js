import React,{useState} from "react";

import posed from "react-pose";
const Box = posed.div({
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
});
export default ({children})=> {
    const [visible, setvisible] = useState(false);
    window.setTimeout(()=>{
        setvisible(true);
    }, 100);
    return <div className='animated-div' pose={visible ? 'visible' : 'hidden'}>
        {children}
    </div>}