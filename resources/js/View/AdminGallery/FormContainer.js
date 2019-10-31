import React, {useRef, useState} from "react";
import Form from "./Form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPhotoVideo, faPlus, faRedo, faSave} from "@fortawesome/free-solid-svg-icons";
import FormSuccess from "../../Component/FormSuccess";
import {createGallery} from "../../Api/AdminAPI";

const initStatus = 'normal';
const initN = [];
const initError = {
    judul:false,
    captions : [],
};
const GallaryManagemnt = () =>{

    let [n, setN] = useState(initN);

    let [status, setstatus] = useState(initStatus);

    const AddphotoHandler = () =>{

        const newarr = [...n, {show:true}];

        setN(newarr);

    };

    const [errors, setErrors] = useState(initError);

    const RemoveHandler = (position) =>{

        const newarr = n;
        newarr[position].show = false;
        setN( [...newarr] );
        InputErrorHandler(position)

    };
    const InputErrorHandler = (position) =>{

        const newarr = errors.captions.filter(item=> item!==position );
        setErrors( {errors,captions:newarr} );

    };

    const judulref = useRef(null);

    const judulInputProps = {
        className : `form-control ${errors.judul ? 'is-invalid':'form-control-alternative'}`,
        ref : judulref
    };

    const formref = useRef(null);
    const submitHandler = () =>{
        if (judulref.current && judulref.current.value){

            let errorpointers = [];

            const elements = Array.from(formref.current.elements);
            const captions = elements.filter((item)=>item.name === 'captions[]');
            const images = elements.filter((item)=>item.name === 'images[]');

            captions.forEach((_, index)=>{
                if (! _.value){
                    errorpointers = [...errorpointers, index];
                }
            });

            if (errorpointers.length){
                setErrors({...errors,captions: errorpointers});
            } else {

                if ( (images.length === captions.length) && ((images.length + captions.length) >= 6) ){
                    const formdata = new FormData();

                    captions.forEach((item, index)=>{
                        formdata.append(`captions[${index}]`,item.value);
                    });
                    images.forEach((item, index)=>{
                        formdata.append(`images[${index}]`,item.files[0]);
                    });
                    formdata.append('judul',judulref.current.value);

                    createGallery(formdata, ()=>{
                        setstatus('success');
                    });

                }else{

                    alert('Minimal untuk membuat galeri adalah 3 gambar')

                }
            }

        }else {
            const judul = true;
            setErrors({...errors,judul});
        }
    };

    const reset = ()=>{
        setErrors(initError);
        setstatus(initStatus);
        setN(initN);
    };

    return (
        status === 'success' ?
            <React.Fragment>
                <FormSuccess text={'Galeri berhasil di tambahkan'} />
                <div className="text-center">
                    <button onClick={reset} className="btn btn-lg btn-primary">
                        <FontAwesomeIcon icon={faPhotoVideo} className='mr-2'  />
                        Tambahkan galeri lain
                    </button>
                    <button onClick={()=>window.location.reload()} className="btn btn-lg btn-primary">
                        <FontAwesomeIcon icon={faRedo} className='mr-2'  />
                        Refresh halaman
                    </button>
                </div>
            </React.Fragment>
            :
            <div className='row justify-content-center'>
                <div className="col-6">
                    <h1 className='font-weight-900'>
                        Judul galeri :
                    </h1>
                    <div className="form-group is-invalid">
                        <input onKeyUp={_=>{
                            const judul = false;

                            errors.judul && setErrors({...errors,judul})

                        }} type="text" {...judulInputProps}/>
                        {
                            errors.judul ? <span className='text-danger'>Wajib di isi</span> : ''
                        }
                    </div>
                </div>
                <div className="col-12 my-2">
                    <form ref={formref} onSubmit={_=>_.preventDefault()}>
                        <div className="row">
                            {
                                n.map((item, index)=>(
                                    <Form key={index}
                                          index={index}
                                          show={item.show}
                                          removeHandler={RemoveHandler}
                                          errorInputHandler={InputErrorHandler}
                                          error={errors.captions.find(item=>item === index) !== undefined}
                                    />
                                ))
                            }
                        </div>
                    </form>
                </div>
                <div className="col-md-12 text-center">
                    <button onClick={()=>AddphotoHandler()} className="btn btn-lg btn-primary">
                        <FontAwesomeIcon icon={faPlus} className='mr-2' />
                        Tambahkan foto
                    </button>
                    <button onClick={submitHandler} className="btn btn-lg btn-info">
                        <FontAwesomeIcon icon={faSave} className='mr-2' />
                        Simpan gallery
                    </button>
                </div>
            </div>
    )
};

export default GallaryManagemnt;