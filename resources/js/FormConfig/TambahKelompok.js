export default [
    {
        "name":"ketua",
        "label":"Ketua kelompok",
        "type":"select",
        "datasource":[],
        "validators":'required',
        col:6
    },
    {
        "name":"nama",
        "label":"Nama kelompok",
        "type":"text",
        "validators":'required',
        col:6
    },
    {
        "name":"tipe",
        "label":"Tipe kelompok",
        "type":"radio",
        "datasource":[{label:"Pendidikan",value:"1"},{label:"Masyarakat",value:"0"}],
        "validators":'required',
    },
]