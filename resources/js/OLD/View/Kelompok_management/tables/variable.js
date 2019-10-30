export const tableOptions = (prop)=>{
  return {
      onRowClick:prop.onRowClick,
      rowsPerPage:20,
      rowsPerPageOptions:[10,20,30],
      onTableChange:(action, tableState)=>{
          if (action === "changeRowsPerPage"){
              prop.RowChange(tableState);
          }else if(action ==="changePage"){
              prop.PageChange(tableState);
          }
      },
      page:prop.current_page-1,
      count:prop.total,
      search:false,
      sort:false,
      download: false,
      print:false,
      filter:false,
      viewColumns:false,
      serverSide: true,
      responsive:"scrollFullHeight",
      selectableRows: "none"
  }
};
export const ColumDef = [
    {
        name: 'nama',
        label: 'Nama kelompok'
    },
    {
        name: 'ketua',
        label: 'Ketua'
    },
    {
        name: 'anggota',
        label: 'Anggota'
    },
    {
        name: 'tipe',
        label: 'Tipe'
    },
    {
        name: 'kasus',
        label: 'Kasus'
    },
];