import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan, faCheck, faSave, faSync, faUser, faUserCircle, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {Button} from "reactstrap";
export const listkecamatan = [{"nama":" Babakan Madang","id":3201140},{"nama":" Bojong Gede","id":3201220},{"nama":" Caringin","id":3201090},{"nama":" Cariu","id":3201160},{"nama":" Ciampea","id":3201050},{"nama":" Ciawi","id":3201100},{"nama":" Cibinong","id":3201210},{"nama":" Cibungbulang","id":3201040},{"nama":" Cigombong","id":3201081},{"nama":" Cigudeg","id":3201270},{"nama":" Cijeruk","id":3201080},{"nama":" Cileungsi","id":3201180},{"nama":" Ciomas","id":3201070},{"nama":" Cisarua","id":3201110},{"nama":" Ciseeng","id":3201241},{"nama":" Citeureup","id":3201200},{"nama":" Dramaga","id":3201060},{"nama":" Gunung Putri","id":3201190},{"nama":" Gunung Sindur","id":3201250},{"nama":" Jasinga","id":3201280},{"nama":" Jonggol","id":3201170},{"nama":" Kelapa Nunggal","id":3201181},{"nama":" Kemang","id":3201230},{"nama":" Leuwiliang","id":3201020},{"nama":" Leuwisadeng","id":3201021},{"nama":" Megamendung","id":3201120},{"nama":" Nanggung","id":3201010},{"nama":" Pamijahan","id":3201030},{"nama":" Parung","id":3201240},{"nama":" Parung Panjang","id":3201300},{"nama":" Ranca Bungur","id":3201231},{"nama":" Rumpin","id":3201260},{"nama":" Sukajaya","id":3201271},{"nama":" Sukamakmur","id":3201150},{"nama":" Sukaraja","id":3201130},{"nama":" Tajur Halang","id":3201221},{"nama":" Tamansari","id":3201071},{"nama":" Tanjungsari","id":3201161},{"nama":" Tenjo","id":3201290},{"nama":" Tenjolaya","id":3201051}]

const LoadingBtn = ()=><Button className={'w-50'} disabled color={'primary'}><FontAwesomeIcon icon={faSync} className='fa fa-spin' /></Button>;
const DisabledBtn = ()=><Button className={'w-50'} disabled  color={'primary'}><FontAwesomeIcon icon={faBan} className='fa mr-2' /> Coba lagi nanti</Button>;
const NormalBtn = ()=><Button color={'primary'} className={'w-50'} ><FontAwesomeIcon icon={faUser} className='fa mr-2' /> Login</Button>;
const SuccessBTN = ()=><Button disabled color={'success'} className={'w-50'} ><FontAwesomeIcon icon={faCheck} className='fa mr-2' /></Button>;
const NormalRegisterBTN = ()=><Button color={'primary'} className={'w-50'} ><FontAwesomeIcon icon={faUserPlus} className='fa mr-2' /> Daftar</Button>;
const NormalRegisterKonselorBTN = ()=><Button color={'primary'} className={'w-50'} ><FontAwesomeIcon icon={faUserPlus} className='fa mr-2' /> Tambah konselor</Button>;
const NormalRegisterKelompokBTN = ()=><Button color={'primary'} className={'w-50'} ><FontAwesomeIcon icon={faUserPlus} className='fa mr-2' /> Tambah Kelompok</Button>;
const NormalRegisterKelompokBTNDisabled = ()=><Button disabled color={'primary'} className={'w-50'} ><FontAwesomeIcon icon={faUserPlus} className='fa mr-2' /> Tambah Kelompok</Button>;
const NormalEditKelompokBTN = ()=><Button  color={'primary'} className={'w-50'} ><FontAwesomeIcon icon={faSave} className='fa mr-2' /> Simpan</Button>;
const InfoText = (text)=><p>{text}</p>;
export const Buttons = {
    NormalEditKelompokBTN,LoadingBtn, DisabledBtn, NormalBtn, SuccessBTN, InfoText, NormalRegisterBTN,NormalRegisterKonselorBTN, NormalRegisterKelompokBTN,NormalRegisterKelompokBTNDisabled
};


export const Login_Config = {
    Accountdata:{
        Header:()=><><FontAwesomeIcon className={'mr-3'} icon={faUserCircle} />Login</>,
        Inputs:[
            {
                "name":"credential",
                "label":" Username atau email",
                "col":"12",
                "validators":['required','trim'],
                "errorMessages":['Wajib di isi','Tidak boleh terdapat spasi'],
            },
            {
                "name":"password",
                "label":"Password",
                "col":"12",
                "type":"password",
                "validators":['required','minStringLength:6'],
                "errorMessages":['Wajib di isi','Minimal 6 karaker'],
            },
        ]
    }
};
export const Register_Config = [
    {
        "Header":"Biodata",
        "Inputs":[
            {
                "name":"nama",
                "value":"Didik iman rachbini",
                "label":"Nama lengkap",
                "validators":['required','matchRegexp:^[a-zA-Z ]*$'],
                "errorMessages":['Wajib di isi', 'Masukan tidak sesuai'],
                col:6,
            },
            {
                "name":"nomor-ktp",
                "label":"Nomor ktp",
                "value":"111111111111111",
                "validators":['required','isNumber','minStringLength:15','maxStringLength:15'],
                "errorMessages":['Wajib di isi',"Hanya boleh angka", 'Format KTP tidak sesuai','Format KTP tidak sesuai'],
                col:6,
            },
            {
                "name":"alamat",
                "label":"Alamat",
                "type":"textarea",
                "value":"JL bonsai III no 4 buper waena",
                "validators":['required','minStringLength:10'],
                "errorMessages":['Wajib di isi', 'Pastikan alamat sudah benar'],
            },
            {
                "name":"kecamatan",
                "label":"Kecamatan",
                "type":"select",
                "validators":['required'],
                "errorMessages":['Wajib di pilih'],
                "datasource":listkecamatan.map(({nama, id})=>{
                    return {
                        label:nama, value:id
                    }
                }),
                col:6,
            },
            {
                col:6,
                "name":"gender",
                "label":"Gender",
                "type":"radio",
                "validators":['required'],
                "errorMessages":['Wajib di pilih'],
                "datasource":[
                    {"value":"1","label":"Pria"},
                    {"value":"0","label":"Wanita"}
                ]
            }
        ]
    },
    {
        "Header":"Akun",
        "Inputs":[
            {
                "name":"username",
                "label":" Username",
                "value":"imandidikr",
                "validators":['required','trim','matchRegexp:^[a-zA-Z0-9_]*$'],
                "errorMessages":['Wajib di isi','Tidak boleh terdapat spasi','Hanya boleh angka dan underscore'],
                col:6
            },
            {
                "name":"email",
                "label":"Email",
                "value":"imandidikr@gmail.com",
                "validators":['required','isEmail'],
                "errorMessages":['Wajib di isi','Email tidak sesuai'],
                col:6
            },
            {
                "name":"password",
                "label":"Password",
                "type":"password",
                "value":"1q2w3e4r",
                "validators":['required','minStringLength:6'],
                "errorMessages":['Wajib di isi','Minimal 6 karaker'],
                col:6
            },
            {
                "name":"password_confirmation",
                "label":"Konfirmasi password",
                "type":"password",
                "value":"1q2w3e4r",
                "validators":['minStringLength:6','required'],
                "errorMessages":['Minimal 6 karakter','Wajib di isi'],
                col:6
            },
        ]
    }
];
export const CreateKelompok_Config = {
    Header:"Buat kelompok",
    Inputs:[
        {
            "name":"ketua",
            "label":"Ketua kelompok",
            "type":"select",
            "datasource":[],
            "validators":['required'],
            "errorMessages":['Wajib di isi'],
            col:6
        },
        {
            "name":"nama",
            "label":"Nama kelompok",
            "type":"text",
            "validators":['required'],
            "errorMessages":['Wajib di isi'],
            col:6
        },
        {
            "name":"tipe",
            "label":"Tipe kelompok",
            "type":"radio",
            "datasource":[{label:"Pendidikan",value:1},{label:"Masyarakat",value:0}],
            "validators":['required'],
            "errorMessages":['Wajib di isi'],
        },
    ]
};
export const EditKelompok_Config = {
    Header:"Edit kelompok",
    Inputs:[
        {
            "name":"nama",
            "label":"Nama kelompok",
            "type":"text",
            "validators":['required'],
            "errorMessages":['Wajib di isi'],
        },
        {
            "name":"tipe",
            "label":"Tipe kelompok",
            "type":"radio",
            "datasource":[{label:"Pendidikan",value:1},{label:"Masyarakat",value:0}],
            "validators":['required'],
            "errorMessages":['Wajib di isi'],
        },
    ]
};