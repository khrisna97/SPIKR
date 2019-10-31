import React from "react";
import {Line} from "react-chartjs-2";
import {chartExample1, parseOptions, chartOptions} from './ChartVariables';
if (window.Chart) {
    parseOptions(Chart, chartOptions());
}
export const LineChart=({labels, data})=>{
    return (
        <div className={"chart"}>
            <Line
                data={{
                    labels,
                    datasets:[{
                        data:data
                    }]
                }}
                options={chartExample1.options}
            />
        </div>
    )
};