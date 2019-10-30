import React, {useEffect, useRef} from "react";
import MaterialTable from 'material-table';
import localization from "../i18n/TableLocale";
const TableStye = {
    width:'100%',
    boxShadow:'none',backgroundColor:'transparent',border:'none'};


const LaravelMUITable = ({API, Columns, Query, detailPanel, actions})=>{

    const MatarialTableOnChange = async (query) => new Promise(resolve => {
        if (!query.page){
            query.page = 0;
        }
        API({Query,...query}, resolve);
    });

    const MaterialTableProp = {
        style : {...TableStye},
        options : {
            draggable:false,
            pageSize:10,
            pageSizeOptions:[10,20,50],
            showTitle: false,
            search:false,
        },
        detailPanel:detailPanel?detailPanel:undefined,
        actions : actions? actions : undefined,
        localization,
        columns : Columns,
        data:MatarialTableOnChange,
    };

    const Refs = useRef(null);

    const updateTable = ()=>{
        Refs.current.onChangePage();
    };

    useEffect(()=>{
        updateTable();
    });

    return (<MaterialTable tableRef={Refs} {...MaterialTableProp} />);
};
export default LaravelMUITable