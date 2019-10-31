import React, {useState} from "react";
import {ContentApi, ContentApi1} from "../../Api/AdminAPI";
import HomeContent from "../../Component/PublicContent";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import ReactQuill from "react-quill";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

export const Content =  ({judul, toggle, openmodal, contentid}) =>{

    const [content, setContent] = useState(null);

    if (content === null && contentid ){
        ContentApi1(contentid, ({konten})=>{
            konten = JSON.parse(konten);
            setContent(konten);
        })
    }


    return (
        <Modal size='lg' isOpen={openmodal} toggle={toggle}>
            <ModalHeader tag='h1' toggle={toggle}>{judul}</ModalHeader>
            <ModalBody>
                {
                    content?
                        <div id="result">
                            <ReactQuill modules={{toolbar:false}}  theme="snow" readOnly value={content} />
                        </div>
                        :                 <div className="text-center">
                            <FontAwesomeIcon spin icon={faSpinner} size={'10x'} />
                            <p>
                                loading
                            </p>
                        </div>
                }

            </ModalBody>
            <ModalFooter>
                <Button color="primary"  onClick={toggle}>Tutup</Button>{' '}
            </ModalFooter>
        </Modal>

    )
};

export default ()=>{

    const [postsprop, setpostprops] = useState(null);

    const [openmodal, setopenmodal] = useState(false);


    const toggle = () => setopenmodal(!openmodal);


    const titleHandler = (data) =>{
        data.contentid = data.id;
        setpostprops({...data});
        toggle();
    };

    const prop = {
        Title : 'Berita dan Pengumuman',
        api : ContentApi,
        perpage:10,
        ContentWrapper : ({judul, waktu, id})=>{
            return <div>
            <h1 onClick={()=> titleHandler( {judul,waktu,id})} className='pointer mb-0 pb-0'>{judul}</h1>
            <small className=''>
                di posting pada {waktu}
            </small>
        </div>}
    };

    const ContentProp = {
      toggle,  ...postsprop, openmodal
    };


    return <React.Fragment>
        <div className="card">
            <div className="card-body">
                <HomeContent  {...prop} />
                {
                    openmodal ?                 <Content toggle={toggle} {...postsprop} openmodal={openmodal} /> : ''

                }
            </div>
        </div>
    </React.Fragment>;
};