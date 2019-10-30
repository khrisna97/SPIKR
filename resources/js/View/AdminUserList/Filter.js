import {FilterKelompokInKecamatan} from "../../Api/AdminAPI";
import React, {useState} from "react";
import {Select} from "../../Component/Form";
import ListKecamatan from "../../FormConfig/listkecamatan";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRedoAlt, faSearch} from "@fortawesome/free-solid-svg-icons";
import {Input} from "reactstrap";
const KecamatanSource = ListKecamatan.map(({nama, id})=>({
    label: nama, value : id
}));

const InitialState = {
    kecamatan : 0,
    kelompok : 0,
    nama:"",
    kelompokmenu : [{value:"false",label:'Tidak dalam kelompok'}]
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
        QuerySetter({});
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

    return (
            <React.Fragment>
                <h3 className="text-white text-uppercase">
                    Filter pencarian
                </h3>
                <div className="row justify-content-end">
                    <div className="col-md-4 mt-3">
                        <Input size={'sm'} className='form-control-alternative' placeholder={'Nama anggota'} value={state.nama} name={'nama'} onChange={Select_onchange}/>
                    </div>
                    <div className="col-md-4 mt-3">
                        <Select size={'sm'} value={state.kecamatan}  name={'kecamatan'} onChange={Select_onchange} label={'Kecamatan'} dataSource={KecamatanSource}/>
                    </div>
                    <div className="col-md-4 mt-3">
                        <Select size={'sm'} value={state.kelompok} name={'kelompok'} onChange={Select_onchange} label={'kelompok'} dataSource={state.kelompokmenu}/>
                    </div>
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