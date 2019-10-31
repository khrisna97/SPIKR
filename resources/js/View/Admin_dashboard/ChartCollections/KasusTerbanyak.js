import React, {useState} from "react";
import {KasusTerbanyakApi} from "../../../Api/AdminAPI";
import BigLoader from "../../../Component/BIGLoader";
import Chart from 'react-apexcharts'
import Locales from "../../../i18n/ChartLocales";
const KasusTerbanyak=()=>{
    const [config , setConfig] = useState({});
    if (! Object.keys(config).length){
        KasusTerbanyakApi().then(res=>{
            let labels = [];
            let series = [];
            res.forEach(({nama, total})=>{
                series = [ ...series, total];
                labels = [...labels, nama.trim()];
            });
            const newConfig = {
                labels, series
            };
            setConfig({...newConfig})
        });
    }
    let ChartProp = {
        options: {
            theme:{
                palette: 'palette3' // upto palette10
            },
            chart: {
                id: "Chart-Kasus-terbanyak",
                plotOptions: {
                    bar: {
                        distributed: true
                    }
                },
                ...Locales,
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 1500,
                    animateGradually: {
                        enabled: true,
                        delay: 400
                    },
                    dynamicAnimation: {
                        enabled: true,
                        speed: 500
                    }
                }
            },
            xaxis: {
                categories: config === null ? [] : config.labels
            }
        },
        series: [
            {
                name: "Jumlah kasus",
                data: config === null ? [] : config.series
            }
        ],
        type:'bar'
    };
    return <div>
        {
            ! Object.keys(config).length  ? <BigLoader/> :
                <div className="donut">
                    <Chart {...ChartProp} />
                </div>
        }
    </div>
};
export default KasusTerbanyak