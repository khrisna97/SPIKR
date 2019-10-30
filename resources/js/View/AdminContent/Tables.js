import React, {useState} from "react";
import LaravelMUITable from "../../Component/MuiTableLaravel";
import {ContentApi, DeleteContentApi} from "../../Api/AdminAPI";
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import ContentPreview from "../AdminGallery/ContentPreview";
const columns = [
    {
        title:'JUDUL', grouping:false,sorting:false,field: 'judul'
    },
    {
        title:'WAKTU PEMBUATAN', grouping:false,sorting:false,field: 'waktu'
    }
];

const Actions = [
    {
        icon : ()=><VisibilityIcon />,
        tooltip:'Detail'
    },
    {
        icon : ()=><DeleteIcon />,
        tooltip:'Hapus'
    }
];

export default ()=>{

    const [states, setStates] = useState({
       modalOpen : false,
       modalcontent : undefined
    });

    Actions[0].onClick = (e, data) => {
        data.contentid = data.id;
        setStates({modalOpen : true, modalcontent : data });
    };

    Actions[1].onClick = (e, data) => {
        data.contentid = data.id;
        const _confirm = confirm('Apakah anda yakin ?');
        if (_confirm){
            DeleteContentApi(data.contentid,(data)=>{
                if (data.status){
                    if (data.status === 'deleted'){
                        alert('Berita terhapus');
                        window.location.reload();
                    }
                }else{
                    alert('Kesalahan server')
                }
            });
        }
    };

    const toggle = () => {

        setStates({...states, modalOpen : !states.modalOpen})

    };

    return (
        <div className='card'>
            <div className="card-body">
                {
                    states.modalcontent && states.modalOpen ?
                        <ContentPreview {...states.modalcontent} id={states.modalcontent.id}  toggle={toggle} openmodal={states.modalOpen} />
                        : ''
                }
                <LaravelMUITable Query={{}} Columns={columns} API={ContentApi} actions={Actions} />
            </div>
        </div>
    )
}