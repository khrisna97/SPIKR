export default [
    {
        "name":"tipe",
        "label":"Kategori",
        "type":"select",
        "datasource":[
            {"id":1,"nama":"bullying","kode":1},{"id":2,"nama":"broken home","kode":2},{"id":3,"nama":"kriminalitas","kode":3},{"id":4,"nama":"Asusila","kode":4}
        ].map(item=>({value:item.id, label:item.nama}) ),
        "validators":'required',
        col:6
    },
    {
        "name":"keterangan",
        "label":"Keterangan",
        "type":"textarea",
        "validators":'required',
        col:6
    },
]