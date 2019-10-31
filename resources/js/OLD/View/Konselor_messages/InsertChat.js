import React, {useState} from "react";
import {Button, Input} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";


export default ({Handler, data})=>{

    const [message, setMessage] = useState("");
    const CommentHandler = ()=>{
        data = [...data, {
            name:"imandidik",
            self:true,
            date:new moment(),
            message,
        }];
        setMessage("");
        Handler(data);
    };

    return(<div className='mt-2'>
        <div className="">
            <div className="row">
                <div className="col-md-8">
                    <Input
                        placeholder={'Masukan pesan anda disini'}
                        className={'form-control-alternative'}
                        type={'textarea'}
                        value={message}
                        onChange={(e)=>{
                            const _message = e.target.value;
                            setMessage(_message);
                        }}
                    />
                </div>
                <div className="col-md-4 mt-2">
                    <Button onClick={CommentHandler} className='h-100'>
                        <FontAwesomeIcon className='mr-2' icon={faPaperPlane} />
                        Kirim
                    </Button>
                </div>
            </div>
            <p>
                Chat anda akan tetap di baca oleh yang bersangkutan saat kembali online
            </p>
        </div>
    </div>)
}