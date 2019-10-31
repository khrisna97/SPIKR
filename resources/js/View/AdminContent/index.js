import React, {useState} from "react";
import FormContainer from './Form';
import Table from './Tables';
export default ()=>{

    const [activepage , setActivePage] = useState('table');

    return (
        <div>
            <div className="my-2">
                <button onClick={()=>setActivePage(activepage === 'form'?'table':'form')} className="btn btn-lg">
                    {activepage === "form" ? 'Tampilkan data berita' : 'Tampilkan form'}
                </button>
            </div>
            {activepage ==='form' ? <FormContainer /> : <Table />}
        </div>
    )
}