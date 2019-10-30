import React from "react";
import moment from "moment";

export default ({users, time,message}, personal)=> {
    const isSelf = users.sender.id === personal.id;
    return <div className={`my-3 ${isSelf?'self':'other'} `}>
        <div className={isSelf?"ml-auto text-right":'text-left'}>
            <p className='my-0 font-weight-900'>
                {isSelf?
                    <React.Fragment>
                        <span className='font-weight-300 message-time mr-2'>
                        {
                            moment(time).locale('id').fromNow()
                        }
                        </span>
                        Anda
                    </React.Fragment>
                    :
                    <React.Fragment>
                        {users.sender.name}
                        <span className='font-weight-300 message-time ml-2'>
                        {
                            moment(time).locale('id').fromNow()
                        }
                        </span>
                    </React.Fragment>
                }

            </p>

            <div className={`d-flex w-100 ${isSelf?'justify-content-end':''}`}>
                <div className="triangle my-0" />
            </div>
            <div className={`mt-0 shadow-lg chat-box-message p-2 ${users.sender.id === personal.id ?'ml-auto text-right ':'mr-auto'}`}>
                {message}
            </div>
        </div>
    </div>
};
