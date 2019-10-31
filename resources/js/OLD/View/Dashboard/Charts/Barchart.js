import React, {useState} from "react";
import {Button, Card, CardBody, CardTitle, Col} from "reactstrap";
import {Bar} from "react-chartjs-2";
import {chartExample2} from '../ChartVariables';
import {GET} from "../../../api";
export default ()=>{
    const [Label , setLabel] = useState([]);
    const [Data , setData] = useState([]);
    const setup = ()=>{
        GET('api/statistic/kasus?get=true&&limit=5&&inkecamatan=true')
            .then((res)=>{
                let data = [];
                let label = [];
                res.forEach(({nama, total})=>{
                   data = [...data, total];
                   label = [...label, nama];
                });
                setLabel(label);
                setData(data);
            }).catch((res)=>{
            console.log(res);
        });
    };
    if (Label.length+Data.length === 0)
        setup();
    return (<Card className="bg-gradient-white shadow">
        <CardBody>
            <CardTitle className='font-weight-bold'>
                <div className="row mb-5">
                    <div className="col-md-8">
                        Kecamatan dengan kasus terbanyak
                    </div>
                </div>
            </CardTitle>
            <div className="chart">
                <Bar
                    data={{
                        labels: Label,
                        datasets: [
                            {
                                data: Data
                            }]
                    }}
                    options={chartExample2.options}
                />
            </div>
        </CardBody>
    </Card>)
}