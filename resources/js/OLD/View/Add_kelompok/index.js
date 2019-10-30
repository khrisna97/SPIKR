import React, {useState} from "react";
import AdminHeaderLayout from "../../Component/AdminHeaderLayout";
import Select from "../../Component/FormInput/Select";
import  {Button} from "reactstrap";
import PublicForm from "../../Component/PublicForm";
import {CreateKelompok_Config, Buttons,listkecamatan} from "../../FormsConfig";
import {GET, Add_kelompok} from "../../api";
import Modal from "../../Component/Modal";
const {  LoadingBtn,NormalRegisterKelompokBTNDisabled, DisabledBtn, NormalRegisterKelompokBTN, SuccessBTN, InfoText} = Buttons;

const SubmitButton = (status, info )=>{
    switch (status) {
        case "loading": return <>{
            info ? InfoText(info) : ""
        }{LoadingBtn()}</>;
        case "disabled": return <>{
            info ? InfoText(info) : ""
        }{DisabledBtn()}</>;
        case "normal": return <>{
            info ? InfoText(info) : ""
        }{NormalRegisterKelompokBTN()}</>;
        case "normaldisabled": return <>{
            info ? InfoText(info) : ""
        }{NormalRegisterKelompokBTNDisabled()}</>;
        case "success": return <>{
            info ? InfoText(info) : ""
        }{SuccessBTN()}</>;
    }
};

const SelectKecamatan = ({onChange, disabled}) =>{
    const prop = {
        isValid:()=>1,
        onChange,
        disabled,
        label:"Pilih kecamatan kelompok",
        datasource:listkecamatan.map(({nama,id})=>{return {label:nama, value:id}})
    };
    return <Select {...prop} />
};



export default ()=>{
    const [kecamatan, setkecamatan] = useState(false);
    const [listketua, setlist_ketua] = useState([]);
    const [status, setStatus] = useState('normaldisabled');
    const [info, setInfo] = useState('');
    const [success, setSuccess] = useState(false);
    CreateKelompok_Config.Inputs[0].datasource = listketua;
    const selectHandler = e =>{
        const value = e.target.value;
        GET('api/konselor/nothavekelompok/'+value).
        then(res=> {
            const selects = res.map(({id, nama})=>{
                return {
                    value:id, label:nama
                }
            });
            setkecamatan(value);
            setlist_ketua(selects);
            setStatus('normal');
        })
    };
    const FormHandler = async (data) =>{
        return new Promise(resolve => {
            data = {...data, kecamatan};
            Add_kelompok(data).then(()=>{
                setSuccess(true);
                setStatus('success');
                resolve()
            }).catch(error => {
                const {status, data} = error;
                const {username, email} = data.errors;
                const nomorktp = data.errors['nomor-ktp'];
                if (status){
                    const Message =nomorktp? nomorktp : username ? username[0]: email[0];
                    if (status === 429){
                        let i = parseInt(Message);
                        setInterval(()=>{
                            console.log(i);
                            if (i !== 0){
                                console.log("called");
                                i--;
                                setInfo(`Silahkan mendaftar lagi dalam ${i} detik`);
                            }else {
                                clearInterval(this);
                                setStatus("normal");
                                setInfo("");
                            }
                        }, 1000);
                    }else {
                        setInfo(Message);
                    }
                    setStatus(status === 422 ? "normal" : status === 429 ? "disabled" : "normal");
                }
                resolve()
            });
        });
    };


    const Reset= ()=>{
        setkecamatan(false);
        setlist_ketua([]);
        setStatus('normaldisabled');
    };
    return <AdminHeaderLayout>
        {
            success ?
                <Modal open={true} isOpen={true} onClosed={()=>{}
                }  header={'Terima kasih'} >
                    <h3 className="h3-responsive">
                        Kelompok berhasil di tambahkan
                    </h3>
                </Modal> : ""
        }
        <div className='mb-2'>
            <Button disabled={kecamatan === false} color='danger' onClick={()=>Reset()}>
                Reset
            </Button>
        </div>
        <SelectKecamatan onChange={selectHandler} disabled={kecamatan !== false}/>
        <div className="card mt-2">
            <div className="card-body">
                <PublicForm
                    disabled={kecamatan === false || listketua.length === 0 || success}
                    SubmitButton={()=>SubmitButton(status, info)}
                    FormProp={[CreateKelompok_Config]}
                    Handler={FormHandler} printHeader />
            </div>
        </div>
    </AdminHeaderLayout>
}