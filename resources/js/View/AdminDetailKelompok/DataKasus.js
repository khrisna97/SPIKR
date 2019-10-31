import React, {useEffect, useState} from "react";
import {LaporanKasusAPI} from "../../Api/AdminAPI";
import {Collapse, ListGroup, ListGroupItem} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const KasusList = (prop)=>{
    const [open, setOpen] = useState(false);
    return (
        <React.Fragment>
            <div onClick={()=>setOpen(!open)} className='pointer my-0 d-flex justify-content-between'>
                <span>
                {prop['peserta didik']}
                </span>
                <FontAwesomeIcon title={open? "Tutup":'Tampilkan info'} icon={open? faMinus : faPlus} />
            </div>
            <Collapse isOpen={open}>
                <div className="py-3 border-top">
                    <div className="">
                        <small className="font-weight-bold">
                            {moment(prop.waktu).locale('id').format('dddd, Do MMMM YYYY')}
                        </small>
                        <br/>{prop.alamat}</div>
                    <div className="">
                        <span className="font-weight-bold">
                        Kategori : {prop['kategori']}
                        </span>
                    </div>
                    <p className='my-0'>
                        Keterangan
                    </p>
                    <div style={{maxHeight:'50vh',overflowY:'auto'}}>
                        {prop.keterangan}
                    </div>
                </div>
            </Collapse>
        </React.Fragment>
    )
};

const UseQuery = ({query, data})=>{
    data = data.filter(function(prop){
        const regex  = new RegExp(query, 'g');
        return prop['peserta didik'].toLowerCase().match(regex);
    });
    return Group(data);
};

const Group = (data)=><ListGroup>
    {
        data.map((prop, key)=>{
            return <ListGroupItem className={'border-0'} key={key}>
                <KasusList {...prop}  />
            </ListGroupItem>
        })
    }
</ListGroup>;

const Kasus = ({id, REF})=>{
    const [state, setState] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const Datasetter = (data)=>{
        setState(data);
        setLoading(false);
    };
    const QuerySetter = (query)=>{
        setQuery(query);
    };
    useEffect(()=>{
        if (REF.current && state.length){
            const {current} = REF;
            current.onChange = ({target})=> {
                QuerySetter(target.value);
            };
            current.placeholder = "Cari nama pasien"
        }
        id && LaporanKasusAPI({Query:{pagination:'disable',kelompok:id}},Datasetter, false )
    },[id, query,state,REF]);

    return <div className=''>
        {
            state && state.length ?
                query ? <UseQuery query={query} data={state} /> :
                    <ListGroup>
                        {
                            state.map((prop, key)=>{
                                return <ListGroupItem className={'border-0'} key={key}>
                                    <KasusList {...prop}  />
                                </ListGroupItem>
                            })
                        }
                    </ListGroup>  : !loading? <div>Data masih kosong</div> : "Loading"
        }
    </div>
};
export default Kasus;