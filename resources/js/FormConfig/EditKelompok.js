export default [
    {
        "name":"nama",
        "label":"Nama kelompok",
        "type":"text",
        "validators":'required',
    },
    {
        "name":"tipe",
        "label":"Tipe kelompok",
        "type":"radio",
        "datasource":[{label:"Pendidikan",value:"1"},{label:"Masyarakat",value:"0"}],
        "validators":'required',
    },
]