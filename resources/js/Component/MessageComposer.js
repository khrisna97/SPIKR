import React, {useEffect, useState} from "react";
import {Input} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane, faSpinner} from "@fortawesome/free-solid-svg-icons";
const InitialState = {
    loading: false,

};

const MessageComposer = ({api, aftersent})=>{

    const [loading, setLoading] = useState(false);

    const Ref = React.useRef(null);

    const SubmitHandler = () =>{
        const {current} = Ref;
        if (current && current.value){
            setLoading(true);
            const {method, params} = api;
            const message = current.value;
            method({...params, message}).then(_=>{
                setLoading(false);
                current.value = '';
                if (typeof aftersent ==='function'){
                    aftersent(params);
                }
            });
        }
    };
    const DetectEnter = (e)=>{
        const {keyCode} = e;
        if (keyCode === 13){
            e.preventDefault() || SubmitHandler();
        }
    };

    return (
        <div className='mt-2'>
            <Input onKeyDown={DetectEnter}  disabled={loading} style={{resize:'none'}} innerRef={Ref} placeholder='Masukan pesan anda disini' type='textarea' />
            <button disabled={loading} onClick={SubmitHandler} className="btn my-2 btn-primary">
                <FontAwesomeIcon spin={loading} icon={loading ? faSpinner : faPaperPlane} className='mr-2' />
                {loading?'Mengirim':"Kirim"} pesan
            </button>
        </div>
    )
};

export default MessageComposer