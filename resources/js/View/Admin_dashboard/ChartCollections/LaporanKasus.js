import React, {useState} from "react";
import Chart from "react-apexcharts"
import {LaporanKasus as API} from "../../../Api/AdminAPI";
import {Button, Input} from "reactstrap";
import ChartLocales from "../../../i18n/ChartLocales";
const MonthsName = [
  "jan", "feb", "mar" ,"apr", "mei", "jun", "jul", "agu", "sep", "okt", "nov", "dev"
];

const LaporanKasus = ()=>{
    const [data, setData] = useState(null);
    const DataSetter = (n) =>{
        API(n).then(res=>{
            let categories = [];
            let data = [];
            res.forEach(({bulan, tahun, kasus})=>{
                categories = [...categories, `${MonthsName[bulan-1].toUpperCase()} ${tahun - 2000}` ];
                data = [...data, kasus];
            });
            setData({...{data, categories}})
        });
    };

    data === null && DataSetter(5);
    let Text = data === null ? 0 : data.data.length + " bulan terakhir";

    return (
        <div>
            <div className='row'>
                <div className="col">
                    <Button disabled={data === null || data.data.length === 12} onClick={()=>{
                        DataSetter(data.data.length + 1);
                    }} size={'sm'}>+</Button>
                    <Button disabled={data === null || data.data.length <= 5} onClick={()=>{
                        DataSetter(data.data.length -1);
                    }} size={'sm'}>-</Button>
                </div>
                <div className="col-text-rigth">
                    Data kasus {Text}
                </div>
            </div>
            {
                data!== null ?
                    <LineChart {...data} /> : ""
            }
        </div>
    )
};

const LineChart = (data)=>{
    const Prop = {
        options: {
            chart: {
                id: "chart-bulanan",
                ...ChartLocales
            },
            xaxis: {
                categories: data === null ? [10,10,10] : data.categories,
            }
        },
        series: [
            {
                name: "Jumlah kasus",
                data: data === null ? [10,10,10] : data.data
            }
        ]
    };
    return             <Chart {...Prop} />
}

export default LaporanKasus