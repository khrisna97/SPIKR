let Columns = [];
const sample = {
    nama: "Kelompok baru di edit",
    ketua: "Kajen Simanjuntak S.Gz",
    tipe: "Pendidikan",
    anggota: 10,
    id: 53,
    kasus: 37,
};
Object.keys(sample).forEach((key)=>{
    const title = key.replace("-"," ").toUpperCase();
    let common = {
        title, grouping:false,sorting:false,field: key
    };

    if (key === "nama"){
        common.title = "Nama kelompok";
    }
    if (key === "tipe"){
        common.title = "Kategori";
    }

    if (key === "ketua"){
        common.title = "Konselor";
    }

    if ( ['anggota', 'kasus', 'id','ketua'].find(item=>item === key) )
    {
        common = {...common,hidden:true};
    }
    Columns = [...Columns, common];
});
export {
    Columns
}