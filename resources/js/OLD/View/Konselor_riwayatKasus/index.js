import React, {useState} from "react";
import {GET} from "../../api";
import Pagination from "react-pagination-js";
import {BigLoader} from "../Konselor_home";
import time from "moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
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
    return <div className=''>
        <div className="d-flex justify-content-end">
            <Pagination {...PaginatorProp} />
        </div>
        <div>
            {
                data.data.map(({nama, kategori_kasus, keterangan, waktu} , key)=>{
                    waktu = time(waktu).locale('id').fromNow();
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
                        <div className="card-footer py-1">
                            <p className='text-right small'>
                                { waktu}
                            </p>
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
const KasusComponent = ({id})=>{
    const [data, setdata] = useState(null);
    const GetData = (per_page = 5, page=1)=>{
        GET(`api/kasus?kelompok=${id}&per_page=${per_page}&page=${page}`).then(res=>{
            setdata(res);
        });
    };
    if (data === null){
        GetData();
    }
    return <div>
        <h1 className="h1-responsive text-white">
            Daftar kasus
        </h1>
        <div>
            <Link to={'/'}>
                <button className="btn btn-sm btn-default">
                    <FontAwesomeIcon icon={faChevronLeft} className='mr-2' />
                    Kembali
                </button>
            </Link>
        </div>
        {
            data === null ?
                <BigLoader/> :
                <List handler={GetData} data={data} />
        }
    </div>
};

export default (prop)=>{
    const {Consumer} = prop;
    return <Consumer>{({kelompok})=>{
        return <KasusComponent {...kelompok}/>}}</Consumer>
};