let Columns = [];
const sample = {
    id: "",
    nama: "",
    kelompok: "",
    kecamatan: "",
    alamat: "",
    "nomor-ktp" :"",
};
Object.keys(sample).forEach((key)=>{
    const title = key.replace("-"," ").toUpperCase();
    const common = {
        title, grouping:false,sorting:false,field: key
    };
    if (key !== 'id' && key !== 'alamat'){
        Columns = [...Columns, {...common}];
    }else{
        Columns = [...Columns, {...common,hidden:true}];
    }
});
export {
    Columns
}