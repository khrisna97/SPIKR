import React from "react";
import {Input} from "reactstrap";

export default [{
    icon:'subject',
    openIcon:'clear',
    tooltip:'Keterangan',
    isFreeAction:true,
    render:({keterangan, kecamatan, konselor, kelompok})=>(
        <div className={'p-3'}>
            <div className="row">
                <div className="col-md-6">
                    <h3>
                        Kecamatan
                    </h3>
                    <p>
                        {kecamatan}
                    </p>
                </div>
                <div className="col-md-6">
                    <h3>
                        Konselor
                    </h3>
                    <p>
                        {konselor}
                    </p>
                </div>
                <div className="col-md-6">
                    <h3>
                        Kelompok
                    </h3>
                    <p>
                        {kelompok}
                    </p>
                </div>
            </div>
            <h3>
                Keterangan kasus
            </h3>
            <Input
                style={{resize:'none'}}
                className={'border-0 bg-transparent text-dark p-0 m-0'}
                type={'textarea'}
                readOnly
                defaultValue={keterangan}
            />
        </div>
    ),}
];