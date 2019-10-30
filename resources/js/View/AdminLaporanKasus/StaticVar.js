let Columns = [];
const sample = {
    id: "",
    keterangan: "",
    'peserta didik': "",
    kategori: "",
    waktu: "",
};
Object.keys(sample).forEach((key)=>{
    const title = key.replace("-"," ").toUpperCase();
    const common = {
        title, grouping:false,sorting:false,field: key
    };
    if (key !== 'id' && key !== 'keterangan'){
        Columns = [...Columns, {...common}];
    }else{
        Columns = [...Columns, {...common,hidden:true}];
    }
});

const listkategorikasus = [{"id":1,"nama":"bullying","kode":1},{"id":2,"nama":"broken home","kode":2},{"id":3,"nama":"kriminalitas","kode":3},{"id":4,"nama":"Asusila","kode":4}].map(item=>{
    return{
        ...item, value:item.id, label:item.nama
    };
});



export {
    Columns, listkategorikasus
}