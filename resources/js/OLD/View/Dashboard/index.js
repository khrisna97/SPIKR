import React from "react";
import AdminHeaderLayout from "../../Component/AdminHeaderLayout";
import CardStats from "./CardStat";
import Line from "./Charts/LineChart";
import Bar from "./Charts/Barchart";
export default ()=> {
    return (<AdminHeaderLayout>
        <CardStats/>
        <div className="row mt-5">
            <div className="col-md-12 col-xl-6">
                <Line />
            </div>
            <div className="col-md-12 col-xl-6">
                <Bar />
            </div>
        </div>
    </AdminHeaderLayout>)
}