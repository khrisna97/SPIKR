import React from "react";
import LaravelMUITable from "../../Component/MuiTableLaravel";
import detailPanel from "./DetailPanel";
import {LaporanKasusAPI} from "../../Api/AdminAPI";
import {Columns} from "../AdminLaporanKasus/StaticVar";

const KonselorLaporan =()=>{

    return (<div className='p-3'>
            <div className="card">
                <h3 className="card-header">
                    Data laporan anda
                </h3>
                <div className="card-body">
                    <LaravelMUITable detailPanel={detailPanel} Query={{}} API={LaporanKasusAPI} Columns={Columns}/>
                </div>
            </div>
        </div>
    )
};

export default KonselorLaporan