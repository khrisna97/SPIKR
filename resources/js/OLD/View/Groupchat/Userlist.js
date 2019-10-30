import React from "react";
import {Badge} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSyncAlt} from "@fortawesome/free-solid-svg-icons";
export default ({data})=>{
    return (
        <div className="col-md-3 mt-5 border-left">
            <h2 className="h2-responsive">
                List anggota kelompok
            </h2>
            <div style={{height:"50vh",overflowY:"scroll"}}>
                {
                    ! data.length ?
                        <div className='h-100 d-flex flex-row justify-content-center align-items-center text-center'>
                            <FontAwesomeIcon icon={faSyncAlt} className='fa-5x fa-spin' />
                        </div> :
                        data.map(({nama}, key)=>{
                            return <div className='d-flex p-2 justify-content-between border-bottom' key={key}>
                                {nama}
                                <Badge className="ml-3 badge-success" >
                                    on
                                </Badge>
                            </div>
                        })
                }
            </div>
        </div>
    )
}