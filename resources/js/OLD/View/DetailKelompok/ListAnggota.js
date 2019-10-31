import React, {useState} from "react";
import {GET} from "../../api";
import Scrollbar from "react-smooth-scrollbar";
import {Loader} from "./Detail";

export {Loader} from "./Detail";

export default ({KelompokId})=>{
    const [data, setdata] = useState(null);

    const dataSetter = ()=>{
        GET('api/pengguna?per_page=1000&kelompok='+KelompokId).then(({data})=>{
            setdata(data);
        });
    };
    if (data === null){
        dataSetter();
    }
    return data === null ? Loader() : (
        <div>
            <p>Daftar anggota ({data.length})</p>
            <Scrollbar>
                <div style={{maxHeight:"50vh"}}>
                    {
                        data.map((item, key)=>{
                            return <p key={key} className='card p-2'>
                                {item.nama}
                            </p>
                        })
                    }
                </div>
            </Scrollbar>
        </div>
    )
}