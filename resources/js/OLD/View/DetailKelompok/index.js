import React from "react";
import AdminHeaderLayout from "../../Component/AdminHeaderLayout";
import querystring from "querystring";
import Detail from "./Detail";
import ListAnggota from "./ListAnggota";
import ListKasus from "./ListKasus";
export default (prop)=>{
    const {nama, id} = querystring.parse(prop.location.search.replace('?',''));
    return <AdminHeaderLayout>
        <div className="card">
            <h1 className="card-header h1-responsive font-weight-bold">
                {nama}
            </h1>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <Detail KelompokId={id} />
                    </div>
                    <div className="col-md-6 mb-3">
                        <ListAnggota KelompokId={id} />
                    </div>
                    <div className="col-12">
                    </div>
                </div>
            </div>
        </div>

        <ListKasus kelompok_id={id} />
    </AdminHeaderLayout>
}