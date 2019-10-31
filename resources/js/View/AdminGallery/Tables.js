import React, {useState} from "react";
import LaravelMUITable from "../../Component/MuiTableLaravel";
import {DeleteContentApi, DeleteGaleriApi, GalleryApi} from "../../Api/AdminAPI";
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

const columns = [
    {
        title:'JUDUL', grouping:false,sorting:false,field: 'judul'
    },
    {
        title:'FOTO', grouping:false,sorting:false,field: 'jumlahfoto'
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
        tooltip:'Delete'
    }
];

const GaleriModal = ({judul, toggle, openmodal, foto}) =>{
  return (
      <Modal isOpen={openmodal} toggle={toggle}>
          <ModalHeader toggle={toggle}>{judul}</ModalHeader>
          <ModalBody>
              <h1>Foto</h1>
              <div className="text-center">
                  {
                      Array.isArray(foto) ?
                          foto.map(({path,caption}, index)=><React.Fragment key={index}> <img title={caption} key={index} src={path} className='img-fluid my-2' alt=""/>
                          <p>{caption}</p>
                          </React.Fragment>) : ''
                  }
              </div>
          </ModalBody>
          <ModalFooter>
              <Button color="primary" onClick={toggle}>Tutup</Button>{' '}
          </ModalFooter>
      </Modal>

  )
};

export default ()=>{

    const [openmodal, setopenmodal] = useState(false);

    const [modalcontent, setModalContent] = useState({});

    Actions[0].onClick = (e, data) => {
        setModalContent({...data});
        toggle();
    };

    Actions[1].onClick = (e, data) => {
        data.contentid = data.id;
        const _confirm = confirm('Apakah anda yakin ?');
        if (_confirm){
            DeleteGaleriApi(data.contentid,(data)=>{
                if (data.status){
                    if (data.status === 'deleted'){
                        alert('galeri terhapus');
                        window.location.reload();
                    }
                }else{
                    alert('Kesalahan server')
                }
            });
        }
    };

    const toggle = () =>setopenmodal(!openmodal);

    return <div className='card'>
        <div className="card-body">
            <GaleriModal {...modalcontent} toggle={toggle} openmodal={openmodal} />
            <LaravelMUITable Query={{}} Columns={columns} API={GalleryApi} actions={Actions} />
        </div>
    </div>
}