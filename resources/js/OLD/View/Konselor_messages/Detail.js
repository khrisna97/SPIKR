import React from "react";
import {Link} from "react-router-dom";

export default (prop)=>{
    return <div className=''>
        <h1 className='d-flex justify-content-between pb-1 border-bottom'>
            Detail anggota
            <Link to={`../lapor?id=${prop.id}&nama=${prop.nama}`}>
                <button className="btn btn-warning btn-sm">
                    Laporkan kasus
                </button>
            </Link>
        </h1>
        <div className="row">
            {
                Object.keys(prop).sort().map((propKey, key)=>{
                    return ['id','kelompok'].find(item=>item===propKey)? "":<div className='col-md-6' key={key}>
                        <p className='font-weight-bold text-uppercase'>
                            {
                                propKey.replace("-",' ')
                            }
                        </p>
                        <p>
                            {
                                prop[propKey]
                            }
                        </p>
                    </div>
                })
            }
            <div className="col-12 text-right">
            </div>
        </div>
    </div>;
}