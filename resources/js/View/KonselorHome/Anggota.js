import React, {useEffect, useState} from "react";
import {UserListAPI} from "../../Api/AdminAPI";
import {Collapse, ListGroup, ListGroupItem} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";

const AnggotaList = (prop)=>{
    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>
            <div onClick={()=>setOpen(!open)} className='pointer my-0 d-flex justify-content-between'>
                <span>
                {prop.nama}
                </span>
                <FontAwesomeIcon title={open? "Tutup":'Tampilkan info'} icon={open? faMinus : faPlus} />
            </div>
            <Collapse isOpen={open}>
                <div className="py-3 border-top">
                    <div className="">
                        <span className="font-weight-bold">
                            Alamat
                        </span>
                        <br/>{prop.alamat}</div>
                    <div className="">
                        <span className="font-weight-bold">
                        KTP
                        </span><br/>
                        {prop['nomor-ktp']}</div>
                </div>
            </Collapse>
        </React.Fragment>
    )
};

const UseQuery = ({query, data})=>{
    data = data.filter(function({nama}){
        const regex  = new RegExp(query, 'g');
        return nama.toLowerCase().match(regex);
    });
    return Group(data);
};

const Group = (data)=><ListGroup>
    {
        data.map((prop, key)=>{
            return <ListGroupItem className={'border-0'} key={key}>
                <AnggotaList {...prop}  />
            </ListGroupItem>
        })
    }
</ListGroup>;

const Anggota = ({id, REF})=>{
    const [state, setState] = useState([]);
    const [query, setQuery] = useState('');
    const Datasetter = (data)=>{
        setState(data);
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
            current.placeholder = "Cari anggota"
        }
        id && UserListAPI({Query:{pagination:'disable',kelompok:id}},Datasetter, false )
    },[id, query,state,REF]);

    return <div className=''>
        {
            state && state.length ?
                query ? <UseQuery query={query} data={state} /> :
                    <ListGroup>
                        {
                            state.map((prop, key)=>{
                                return <ListGroupItem className={'border-0'} key={key}>
                                    <AnggotaList {...prop}  />
                                </ListGroupItem>
                            })
                        }
                    </ListGroup>  : "Loading"
        }
    </div>
};
export default Anggota;