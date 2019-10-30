import React from "react";
import ReactDOM from 'react-dom';
import '../index.scss';
import {logout} from "../Api/allroles";
import init from "../bootstrap";

const App =  ()=>{

    return <div className='bg-transparent' >
        <div className='container d-flex bg-transparent justify-content-center align-items-center' style={{minHeight:'100vh'}}>
            <div className="mt-5 pt-5">
                <div className="card">
                    <div className="card-body">
                        <h1>
                            Mohon maaf anda belum memiliki kelompok segera hubungi admin SPIKR
                        </h1>
                        <div className="text-center">
                            <button onClick={logout} className="btn bt-primary">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
};
if (document.getElementById('root')){
    init().then(_=>{
        document.querySelector('html').classList.add('nice-scrollbar');
        document.querySelector('body').classList.remove('hidden');
        ReactDOM.render(<><App type={'user'} /></>, document.getElementById('root'));
    });

}