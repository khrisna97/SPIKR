import React, {useState} from "react";
import {Drawer} from "@material-ui/core";
import ByGroup from './ByGroup';
import ByInbox from './ByInbox';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";


export default (prop)=>{
    const [onlyGroup, setOnlyGroup] = useState(true);
    const [open, setOpen] = useState(false);
    return <React.Fragment>
        <button className="btn w-100 btn-primary" onClick={_=>setOpen(true)}>
           <FontAwesomeIcon icon={faUser} className={'mr-2'}  /> Pilih pengguna
        </button>
        <Drawer keepMounted open={open} onBackdropClick={_=>{
            setOpen(false)
        }}>
            <div>
                <div className='p-2'>
                    <button onClick={_=>
                        setOnlyGroup( ! onlyGroup ) } className='btn w-100'>
                        {
                            onlyGroup ? "Pengguna lainya" : "Anggota kelompok"
                        }
                    </button>
                    <p className='my-2'>
                        {
                            onlyGroup ? "Menampilkan anggota kelompok KR" : "Pengguna yang bukan dari kelompok anda"
                        }
                    </p>
                </div>
                <div>
                    {onlyGroup ? <ByGroup drawerSetter={setOpen} {...prop} /> : <ByInbox drawerSetter={setOpen} {...prop} />}
                </div>
            </div>
        </Drawer>
    </React.Fragment>
}