import React, { useState} from "react";
import LaravelMUITable from "../../Component/MuiTableLaravel";
import {Columns} from "./Staticvar";
import Filter from './filter';
import {KelompokListAPI} from "../../Api/AdminAPI";
import detailPanel from "./DetailPanel";
const KelompokList = () =>{
    const [Query, setQuery] = useState({});
    return (
        <div className={'card'}>
            <div className="card-body">
                <div className="row justify-content-end">
                    <div className="col-md-12 text-center">
                        <h1 className='text-uppercase'>
                            Data kelompok SPIKR
                        </h1>
                    </div>
                    <div className="col-md-12">
                        <Filter QuerySetter={setQuery} />
                    </div>
                    <div className="col-md-12">
                        <LaravelMUITable actions={detailPanel} Query={Query} API={KelompokListAPI} Columns={Columns}/>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default KelompokList