import {listkecamatan} from "../../FormsConfig";

const Personaldata = {
    "header":"Data konselor",
    "inputs":[
        {
            "name":"nama",
            "value":"Didik iman rachbini",
            "label":"Nama lengkap",
            "validators":['required','matchRegexp:^[a-zA-Z ]*$'],
            "errorMessages":['Wajib di isi', 'Masukan tidak sesuai']
        },
        {
            "name":"nomor-ktp",
            "label":"Nomor ktp",
            "value":"111111111111111",
            "validators":['required','isNumber','minStringLength:15','maxStringLength:15',"CheckKTP"],
            "errorMessages":['Wajib di isi',"Hanya boleh angka", 'Format KTP tidak sesuai','Format KTP tidak sesuai',"Nomor KTP sudah di gunakan"]
        },
        {
            "name":"alamat",
            "label":"Alamat",
            "type":"textarea",
            "value":"JL bonsai III no 4 buper waena",
            "validators":['required','minStringLength:10'],
            "errorMessages":['Wajib di isi', 'Pastikan alamat sudah benar'],
            "col":"12",
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
            })
        },
        {
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
};
const Accountdata = {
    "header":"Akun",
    "inputs":[
        {
            "name":"username",
            "label":" Username",
            "value":"imandidikr",
            "validators":['required','trim','matchRegexp:^[a-zA-Z0-9_]*$',"CheckUsername"],
            "errorMessages":['Wajib di isi','Tidak boleh terdapat spasi','Hanya boleh angka dan underscore',"Username sudah di gunakan"],
        },
        {
            "name":"email",
            "label":"Email",
            "value":"imandidikr@gmail.com",
            "validators":['required','isEmail',"CheckEmail"],
            "errorMessages":['Wajib di isi','Email tidak sesuai',"Email sudah digunakan"],
        },
        {
            "name":"password",
            "label":"Password",
            "type":"password",
            "value":"1q2w3e4r",
            "validators":['required','minStringLength:6'],
            "errorMessages":['Wajib di isi','Minimal 6 karaker'],
        },
        {
            "name":"password_confirmation",
            "label":"Konfirmasi password",
            "type":"password",
            "value":"1q2w3e4r",
            "validators":['minStringLength:6','required','passwordMatch'],
            "errorMessages":['Minimal 6 karakter','Wajib di isi',"Konfirmasi password salah"],
        },
    ]
};
const config = [Personaldata, Accountdata];
export default config