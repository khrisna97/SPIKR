import React, {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {ContentApi1} from "../../Api/AdminAPI";
import ReactQuill from "react-quill";

export default ({judul, toggle, openmodal, contentid}) =>{

    const [content, setContent] = useState(null);

    if (content === null && contentid ){
        ContentApi1(contentid, ({konten})=>{
            konten = JSON.parse(konten);
            openmodal && setContent({...konten});
        })
    }


    return (
        <Modal size='lg' isOpen={openmodal} toggle={()=>content && toggle()}>
            <ModalHeader tag='h1' toggle={toggle}>{judul}</ModalHeader>
            <ModalBody>
                {
                    content?
                        <div id="result">
                            <ReactQuill modules={{toolbar:false}}  theme="snow" readOnly value={content} />
                        </div>
                        :
                        <div className="text-center">
                            <FontAwesomeIcon spin icon={faSpinner} size={'10x'} />
                            <p>
                                loading
                            </p>
                        </div>
                }

            </ModalBody>
            <ModalFooter>
                <Button color="primary" disabled={!content}  onClick={()=>content &&  toggle()}>Tutup</Button>{' '}
            </ModalFooter>
        </Modal>

    )
};