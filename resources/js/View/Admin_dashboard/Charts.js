import React, {useState} from 'react';
import KasusTerbanyak from "./ChartCollections/KasusTerbanyak";
import LaporanKasus from "./ChartCollections/LaporanKasus";
export default ()=>{

    const [MonthN, setMonthN] = useState(6);

    const Components = [
        {C:KasusTerbanyak, H:"Kasus terbanyak"},
        {C:LaporanKasus, H:`Laporan kasus`},
    ];

    return (
        <div className='row mt-5'>
            {Components.map(({C, H}, key)=>(
                <div className='col-md-6 mt-5' key={key}>
                    <div className="card">
                        <div className="card-header">
                            {/*Header*/}
                            {H}
                        </div>
                        <div className="card-body">
                            {/*Chart Component*/}
                            <C/>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}