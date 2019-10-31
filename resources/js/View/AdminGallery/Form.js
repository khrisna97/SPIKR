import React, {useEffect, useRef, useState} from "react";
import InputGroup from "reactstrap/es/InputGroup";
import {Button, InputGroupAddon, InputGroupText} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRedo, faTrash} from "@fortawesome/free-solid-svg-icons";

const  getBase64 = (file, setter)=> {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        setter(reader.result);
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
};

export default ({index, errorInputHandler,removeHandler, error, show})=>{

    const ref = useRef(null);
    const fileref = useRef(null);
    const [imgsrc, setImgSrc] = useState(null);

    useEffect(()=>{
        if (show){
            if (!imgsrc){
                if (ref.current && fileref.current){
                    fileref.current.click()
                }
            }
        }
    },[imgsrc]);

    const fileHandler = _ => {
        if (show){
            getBase64(_.target.files[0], setImgSrc);
        }
    };

    return ! show ? "": <div className='col-md-6 my-2'>
        <div className="img-container text-center">
            <img src={imgsrc} style={{width:'128px',height : '72px'}} className='img-fluid' alt="" ref={ref}/>
        </div>
        <div className="d-none">
            <input onChange={fileHandler} name='images[]' ref={fileref} type="file" accept='image/*'/>
        </div>
        <div>
            <label className='text-white'>caption</label>
            <InputGroup size='sm'>
                <input onKeyUp={()=>{
                    if (error){
                        errorInputHandler(index)
                    }
                }} name='captions[]' type="text" className="form-control form-control-sm form-control-alternative"/>
                <InputGroupAddon addonType="prepend">
                    <Button onClick={()=>fileref.current&&fileref.current.click()} color='primary'>
                        <FontAwesomeIcon className='mr-2' icon={faRedo} />
                        Ganti foto
                    </Button>
                </InputGroupAddon>
                <InputGroupAddon addonType="prepend">
                    <Button onClick={_=>removeHandler(index)} color='danger'>
                        <FontAwesomeIcon className='mr-2' icon={faTrash} />
                        Hapus
                    </Button>
                </InputGroupAddon>
            </InputGroup>
            {
                error ? <label className='text-danger'>Wajib di isi</label> : ""
            }
        </div>
    </div>
}