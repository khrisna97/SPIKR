import React from 'react';
import {UserManagementColumns} from "../../TablesColumns";
import DTable from "mui-datatables";
const Table = (prop)=>{
    const Options = {
        rowsPerPage:10,
        page:prop.current_page-1,
        rowsPerPageOptions:[10,20,30],
        onTableChange:(action, tableState)=>{
            if (action === "changeRowsPerPage"){
                prop.RowChange(tableState);
            }else if(action ==="changePage"){
                prop.PageChange(tableState);
            }
        },
        count:prop.total,
        search:false,
        sort:false,
        download: false,
        print:false,
        filter:false,
        viewColumns:false,
        serverSide: true,
        responsive:"scrollFullHeight",
        selectableRows: "none"
    };
    return (
        <div>
            <DTable
                data={prop.data}
                options={Options}
                columns={UserManagementColumns}
            />
        </div>
    );
};
export default Table;