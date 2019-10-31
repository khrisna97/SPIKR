import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCogs,
    faComment,
    faComments, faDotCircle,
    faFileMedical,
    faHistory,
    faWindowClose
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import Scrollbar from "react-smooth-scrollbar";
import {Drawer} from "@material-ui/core";
import queryString  from 'querystring';

export default ({anggota})=>{
    let [anggotaModal, setAnggotaModal] = useState(false);
    let [laporModal, setLaporModal] = useState(false);
    return (
        <div>
            {
                anggotaModal ?
                    <Drawer className='p-2' hideBackdrop onClose={()=>setAnggotaModal( !anggotaModal)} anchor="right" open={anggotaModal} >
                        <div style={{minHeight:'100vh'}} className='d-flex justify-content-between flex-column align-items-end'>
                            <div className='p-2 w-100 text-right border-bottom'>
                                <button onClick={()=>setAnggotaModal(!anggotaModal)} className="btn btn-sm bg-transparent">
                                    <FontAwesomeIcon icon={faWindowClose} className={'text-danger mr-2'} />
                                    Tutup
                                </button>
                            </div>
                            <div className="flex-grow-1">
                                <Scrollbar >
                                    <div className='p-2' style={{maxHeight:'90vh'}}>
                                        {
                                            anggota.map((prop, key)=>{
                                                const isOnline = key% 3 !== 0;
                                                const btnProp = {
                                                    title: !isOnline ? "Sedang offline": "Chat dengan "+prop.nama,
                                                    className: `my-2 pointer d-flex position-relative ${isOnline ? '':''}`,
                                                    onClick:()=>{
                                                        console.log(prop)
                                                    }
                                                };
                                                return <div className="hover-gray rounded p-1" key={key}>
                                                    <Link to={
                                                        '/chat/personal?'+queryString.stringify({
                                                            id:prop.id,
                                                            nama:prop.nama
                                                        })
                                                    }>
                                                        <div {...btnProp}>
                                                            <div style={{whiteSpace:'nowrap',textOverflow:'ellipsis',width:'80%',overflow:'hidden'}}>
                                                                {prop.nama}
                                                            </div>
                                                            <span style={{right:'0px',top:"0px"}}  className={`${isOnline? "text-success" : 'text-dark'} rounded position-absolute`}>
                                                                <FontAwesomeIcon icon={faDotCircle} />
                                                            </span>

                                                        </div>
                                                    </Link>
                                                </div>
                                            })
                                        }
                                    </div>
                                </Scrollbar>
                            </div>
                        </div>
                    </Drawer>
                    :""
            }
            {
                laporModal ?
                    <Drawer className='p-2' hideBackdrop onClose={()=>setLaporModal( !laporModal)} anchor="right" open={laporModal} >
                        <div style={{minHeight:'100vh'}} className='d-flex justify-content-between flex-column align-items-end'>
                            <div className='p-2 w-100 text-right border-bottom'>
                                <button onClick={()=>setLaporModal( !laporModal)} className="btn btn-sm bg-transparent">
                                    <FontAwesomeIcon icon={faWindowClose} className={'text-danger mr-2'} />
                                    Tutup
                                </button>
                            </div>
                            <div className="flex-grow-1">
                                <Scrollbar >
                                    <div className='p-2' style={{maxHeight:'90vh'}}>
                                        {
                                            anggota.map((prop, key)=>{
                                                const isOnline = key% 3 !== 0;
                                                const btnProp = {
                                                    title: !isOnline ? "Sedang offline": "Chat dengan "+prop.nama,
                                                    className: `my-2 pointer d-flex position-relative ${isOnline ? '':''}`,
                                                    onClick:()=>{
                                                        console.log(prop)
                                                    }
                                                };
                                                return <div className="hover-gray rounded p-1" key={key}>
                                                    <Link to={
                                                        '/lapor?'+queryString.stringify({
                                                            id:prop.id,
                                                            nama:prop.nama
                                                        })
                                                    }>
                                                        <div {...btnProp}>
                                                            <div style={{whiteSpace:'nowrap',textOverflow:'ellipsis',width:'80%',overflow:'hidden'}}>
                                                                {prop.nama}
                                                            </div>
                                                            <span style={{right:'0px',top:"0px"}}  className={`${isOnline? "text-success" : 'text-dark'} rounded position-absolute`}>
                                                                <FontAwesomeIcon icon={faDotCircle} />
                                                            </span>

                                                        </div>
                                                    </Link>
                                                </div>
                                            })
                                        }
                                    </div>
                                </Scrollbar>
                            </div>
                        </div>
                    </Drawer>
                    :""
            }
            <div className="row">
                <div className="col-md-6">
                    <button onClick={()=>setLaporModal(!laporModal)} className="w-100 d-sm-flex d-md-block justify-content-between mx-0 mb-3 btn btn-primary text-left">
                        <FontAwesomeIcon icon={faFileMedical} className='mr-2' />
                        Laporkan kasus
                    </button>
                </div>
                <div className="col-md-6">
                    <button className="w-100 mx-0 mb-3 btn btn-warning text-left">
                        <FontAwesomeIcon icon={faCogs} className='mr-2' />
                        Pengaturan kelompok
                    </button>
                </div>
                <div className="col-md-6">
                    <Link to={'riwayat/kasus'}>
                        <button className="w-100 mx-0 mb-3 btn btn-info text-left">
                            <FontAwesomeIcon icon={faHistory} className='mr-2' />
                            Riwayat kasus
                        </button>
                    </Link>
                </div>
                <div className="col-md-6">
                    <Link to={'chat/kelompok'}>
                        <button className="w-100 mx-0 mb-3 btn btn-success text-left">
                            <FontAwesomeIcon icon={faComments} className='mr-2' />
                            Buka chat kelompok
                        </button>
                    </Link>
                </div>
                <div className="col-md-6">
                    <button onClick={()=>{
                        setAnggotaModal(!anggotaModal)}} className="w-100 mx-0 mb-3 btn btn-chartjs text-left">
                        <FontAwesomeIcon icon={faComment} className='mr-2' />
                        Buka personal chat
                    </button>
                </div>
            </div>
        </div>
    )
}