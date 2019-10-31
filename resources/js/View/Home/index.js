import React from 'react';
import Register from './Register';
import ContentTabs from "./ContentTabs";

const Home =(prop)=>{
    return (
        <div className='row justify-content-end'>
            <div className="col-md-12 text-center ">
                <h2 className="h2-responsive text-capitalize text-white">
                    Sistem pelayanan infomasi konseling remaja
                </h2>
            </div>
            <div className="col-md-6">
                <Register/>
            </div>
            <div className="col-md-12">
                <ContentTabs  />
            </div>
        </div>
    )
};
export default Home