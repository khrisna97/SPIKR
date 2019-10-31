import React from 'react';
import {ColumDef} from './variable';
import DTable from "mui-datatables";
import {tableOptions} from "./variable";
const Table = (prop)=>{
    return (
        <div>
            <DTable
                data={prop.data}
                options={tableOptions(prop)}
                columns={ColumDef}
            />
        </div>
    );
};
export default Table;