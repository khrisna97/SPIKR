import {FilterKelompokInKecamatan} from "../../Api/AdminAPI";
import React, {useState} from "react";
import {Select} from "../../Component/Form";
import ListKecamatan from "../../FormConfig/listkecamatan";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRedoAlt, faSearch} from "@fortawesome/free-solid-svg-icons";
import {Input} from "reactstrap";
import {listkategorikasus} from "./StaticVar";
const KecamatanSource = ListKecamatan.map(({nama, id})=>({
    label: nama, value : id
}));

const InitialState = {
    kecamatan : 0,
    kelompok : 0,
    tipe:0,
    nama:"",
    kelompokmenu : []
};

const Filter = ({QuerySetter}) =>{

    const [state, setState] = useState(InitialState);
    const Select_onchange = ({target})=>{
        const {name, value} = target;
        let newState = {...state,[name]:value};
        if (name === 'kecamatan'){
            FilterKelompokInKecamatan(value).then(res=>{
                let kelompokmenu = res.map(({nama, id})=>({label:nama, value:id}));
                newState = {
                    ...newState,
                    kelompok : 0,
                    ['kelompokmenu'] : [...InitialState.kelompokmenu,...kelompokmenu]};
                setState(newState);
            });
        }else{
            setState(newState);
        }
    };

    const ResetHandler = ()=>{
        setState(InitialState);
        QuerySetter({})
    };
    const SubmitHandler = ()=> {
        const toSet = {};
        Object.keys(state).forEach((key)=>{
            if (state[key]&&!Array.isArray(state[key])){
                toSet[key] = state[key];
            }
        });
        QuerySetter(toSet);
    };

    const Inputs = [
        {
            prop : {
                className:'form-control-alternative',
                value : state.nama,
                name:'nama',
                label:'cari berdasarkan nama',
                placeholder:'cari berdasarkan nama'
            },
            Component : Input,
        },
        {
            prop : {
                value : state.tipe,
                name:'tipe',
                label:'kategori',
                dataSource:listkategorikasus,
            },
            Component : Select,
        },
        {
            prop : {
                value : state.kecamatan,
                name:'kecamatan',
                label:'Kecamatan',
                dataSource:KecamatanSource,
            },
            Component : Select,
        },
        {
            prop : {
                value : state.kelompok,
                name:'kelompok',
                label:'kelompok',
                dataSource:state.kelompokmenu,
            },
            Component : Select,
        }
    ];

    return (
        <React.Fragment>
            <h3 className="text-white text-uppercase">
                Filter pencarian
            </h3>
            <div className="row justify-content-end">
                {
                    Inputs.map(({prop,Component}, key)=>(
                        <div key={key} className='col-md-3 my-2'>
                            <Component  {...prop} size={'sm'} onChange={Select_onchange} />
                        </div>
                    ))
                }
                <div className="col-md-6 text-right mt-3">
                    <button onClick={ResetHandler} className='btn btn-sm btn-danger'>
                        <FontAwesomeIcon icon={faRedoAlt} className='mr-2'  />
                        Reset
                    </button>
                    <button onClick={SubmitHandler} className='btn btn-sm '>
                        <FontAwesomeIcon icon={faSearch} className='mr-2'  />
                        Apply
                    </button>
                </div>
            </div>
        </React.Fragment>
    )
};
export default Filter;