import React, {useState} from "react";
import {Main} from "../AdminDetailKelompok";
import FormEdit from "./EditKelompok";

const KonselorKelompok =()=>{
    const {kelompok} = window.kelompokdata;
    const [kelompokData, kelompokdataSetter] = useState(null);


    return <div className='pb-5'>
        {
            kelompokData ?         <FormEdit data={kelompokData}/> : ""
        }
        {
            Main("", kelompok, kelompokdataSetter)
        }
    </div>
};

export default KonselorKelompok