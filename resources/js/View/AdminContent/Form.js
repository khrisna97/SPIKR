import React, {createRef, useState} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {createContent} from "../../Api/AdminAPI";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faRedo, faSave, faSpinner} from "@fortawesome/free-solid-svg-icons";
import FormSuccess from "../../Component/FormSuccess";

const Quillmodules = {
    modules : {toolbar: [
            [{ 'header': [1, 2, 3] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean'],
            [{ 'align': [] }],



        ],},
    formats : [
        'header','align',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image',
    ],
};

const Form = ({setter, status}) =>{
    const quil = createRef();
    const judulref = createRef();
    const submitHandler = ()=>{
        let konten = quil.current;
        let judul = judulref.current;
        if ( konten && judul ){
            konten = konten.getEditor().getContents();
            judul = judul.value;
            konten = JSON.stringify(konten);

            if (konten && judul){
                setter('loading');
                createContent({konten,judul},_=>
                    setTimeout(_=>{
                        setter('success');
                    },1000));

            }
        }
    };

    return (
        <div className='row justify-content-center'>
            <div className="col-md-12">
                <div className="card">
                    <div className="card-body">
                        <div className='my-2'>
                            <h1>
                                Judul berita :
                            </h1>
                            <input ref={judulref} type="text" className='form-control'/>
                        </div>
                        <p>Konten</p>
                        <ReactQuill ref={quil} theme="snow" {...Quillmodules} />
                        <div className='text-right my-3'>
                            <button onClick={submitHandler} className="btn btn-primary btn-lg">
                                {
                                    status !== 'loading' ?
                                        <React.Fragment>
                                            <FontAwesomeIcon icon={faSave} className='mr-2' />
                                            Simpan
                                        </React.Fragment> :
                                        <React.Fragment>
                                            <FontAwesomeIcon icon={faSpinner} spin className='mr-2' />
                                            loading
                                        </React.Fragment>
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

const AdminContentManagement = () =>{

    const [status, setStatus] = useState('normal');

    if (status !== 'success'){
        return <Form setter={setStatus} status={status} />;
    }

    return <div className='text-center'>
        <FormSuccess text={'Konten atau berita telah di publish'} />
        <button className="btn btn-lg my-2 btn-primary" onClick={_=>setStatus('normal')}>
            <FontAwesomeIcon icon={faPlus} className='mr-2' />
            Tambah konten baru
        </button>
        <button className="btn btn-lg my-2 btn-primary" onClick={_=>window.location.reload()}>
            <FontAwesomeIcon icon={faRedo} className='mr-2' />
            Refresh halaman
        </button>
    </div>

};

export default AdminContentManagement;