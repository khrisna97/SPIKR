import React, { useState} from "react";
import LaravelMUITable from "../../Component/MuiTableLaravel";
import {Columns} from "./StaticVar";
import Filter from './Filter';
import {UserListAPI} from "../../Api/AdminAPI";

const AdminUserList = () =>{
    const [Query, setQuery] = useState({});
    return (
        <div className={'card'}>
            <div className="card-body">
                <div className="row justify-content-end">
                    <div className="col-md-12 text-center">
                        <h1 className='text-uppercase'>
                            Data pengguna SPIKR
                        </h1>
                    </div>
                    <div className="col-md-12">
                        <Filter QuerySetter={setQuery} />
                    </div>
                    <div className="col-md-12">
                        <LaravelMUITable Query={Query} API={UserListAPI} Columns={Columns}/>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default AdminUserList