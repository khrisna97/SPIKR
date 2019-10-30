import React, {useState} from "react";
import {GET} from "../../api";
import {Loader} from "./ListAnggota";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"; // import css

const List = ({data, handler})=>{
    const PaginatorProp = {
        theme:'bootstrap',
        totalPages:data.last_page,
        currentPage:data.current_page,
        changeCurrentPage:(a)=>{
            handler(data.per_page,a );
        },
        sizePerPage:data.per_page,
    };
    return <div className='mt-5'>
        <h1 className="h1-responsive text-white">
            Data kasus
        </h1>
        <div className="d-flex justify-content-end">
            <Pagination {...PaginatorProp} />
        </div>
        <div>
            {
                data.data.map(({nama, kategori_kasus, keterangan}, key)=>{
                    return <div key={key} className="card mt-3">
                        <h4 className="card-header d-flex justify-content-between">
                            <span>
                            {nama}
                            </span>
                            <span>
                                {kategori_kasus}
                            </span>
                        </h4>
                        <div className="card-body">
                            {keterangan}
                        </div>
                    </div>
                })
            }
        </div>
        <div className="d-flex mt-3 justify-content-end">
            <Pagination {...PaginatorProp} />
        </div>
    </div>
};

export default ({kelompok_id})=>{
    const [paginator,setPaginator ] = useState(null);
    const dataSetter=(per_page = 5, page=1)=>{
        GET(`api/kasus?page=${page}&kelompok=${kelompok_id}&per_page=${per_page}`).
        then(data=>{
            setPaginator(data)
        })
    };
    if (paginator === null){
        dataSetter()
    }
    return paginator ? <List data={paginator} handler={dataSetter} /> : Loader()
}