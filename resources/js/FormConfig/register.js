import listkecamatan from "./listkecamatan";


export default [
    {
        "name":"nama",
        "label":"Nama lengkap",
        col:6,
        validators:'required|alpha_space'
    },
    {
        "name":"nomor-ktp",
        "label":"Nomor ktp",
        col:6,
        validators:'required|numeric|size:15'

    },
    {
        "name":"alamat",
        "label":"Alamat",
        validators:'required|min:10'

    },
    {
        "name":"kecamatan",
        "label":"Kecamatan",
        "type":'select',
        validators:'required',
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
        'type':"radio",
        "datasource":[
            {"value":"1","label":"Pria"},
            {"value":"0","label":"Wanita"}
        ],
        validators:'required'
    },
    {
        "name":"username",
        "label":" Username",
        validators:'required|alpha_num|min:6',
        col:6
    },
    {
        "name":"email",
        "label":"Email",
        validators:'required|email|min:6',
        col:6
    },
    {
        "name":"password",
        "label":"Password",
        "type":"password",
        validators:'required|alpha_num|min:6',
        col:6
    },
    {
        "name":"password_confirmation",
        "label":"Konfirmasi password",
        "type":"password",
        validators:'required|alpha_num|min:6',
        col:6
    },
]