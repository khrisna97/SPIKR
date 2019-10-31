import React, {useState} from "react";
import listkecamatan from "../../FormConfig/listkecamatan";
import Forms,{Select} from "../../Component/Form";
import Config from "../../FormConfig/TambahKelompok";
import {RegisterKelompokBTN, RegisterKelompokBTNLoading} from "../../Component/FormButton";
import {KonselorListAPI, KelompokAddApi} from "../../Api/AdminAPI";
import FormSuccess from "../../Component/FormSuccess";
const _listkecamatan = listkecamatan.map(({id, nama})=>({label:nama, value:id,}));


const Init = {
    kecamatan : 0,
    ketuadatasource: [],
    infoText :'Silahkan pilih kecamatan sebelum mengisi form lainya !',
    status : "normal"
};

const AddKelompok = ()=>{

    const [state, setState] = useState(Init);


    const onChange = ({target}) =>{
        const {name, value} = target;
        let newStates = state;
        if (name === 'kecamatan'){
            KonselorListAPI({Query :{pagination:'disable',kelompok:'false',kecamatan: value}}, (res)=>{
                if (! res.length){
                    const InfoText = 'Silahkan daftarkan seorang konselor di kecamatan' + _listkecamatan.find(item => item.value === value ).label+' terlebih dahulu';
                    newStates = {...newStates, ['infoText']:InfoText};
                }else{
                    newStates.ketuadatasource = res.map(({id, nama})=>({
                        value: id, label : nama
                    }))
                }
                newStates = {...newStates, [name]: value};
                setState(newStates);
            }, false);
        }else{
            setState({
                ...state,[name]: value
            })
        }
    };

    const SubmitBtn = (prop) =>{
        switch (state.status) {
            case 'normal' : return <RegisterKelompokBTN {...prop}/>;
            case 'process' : return <RegisterKelompokBTNLoading {...prop}/>;
        }
    };

    const FormHandler= (data)=>{
        data = {...data, kecamatan: state.kecamatan};
        KelompokAddApi(data, (res)=>{
            setState({...state, status:res})
        }, ()=>{}, (errors)=>{
            setState({...state, errors: errors})
        });
    };

    Config[0].datasource =
        state.ketuadatasource ? state.ketuadatasource : [];

    return(
        <div>
            {
                state.status!== 'success' ? <div className="row mt-3 justify-content-center">
                    <div className="col-md-6">
                        <label className='text-white'>
                            Kecamatan
                        </label>
                        <Select name={'kecamatan'} onChange={onChange} value={state.kecamatan} dataSource={_listkecamatan} label={'Pilih kecamatan'} />
                    </div>
                    <Forms
                        Config={Config}
                        Errors={state.errors ? state.errors : {}}
                        Button={(prop)=>
                            ! state.ketuadatasource.length ?
                                <div className="col-md-12">
                                    <h2 className={'text-white text-center'}>
                                        {state.infoText}
                                    </h2>
                                </div>
                                : <div className="col-md-4">
                                    <SubmitBtn {...prop} />
                                </div>
                        }
                        Handler={FormHandler}
                        Wrapper={({children})=><div className={'col-md-6'} children={children} /> }
                    />
                </div> : <FormSuccess text={'kelompok berhasil di tambahkan'}/>
            }
        </div>
    )
};
export default AddKelompok