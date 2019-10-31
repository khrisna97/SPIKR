import React, {useState} from "react";
import Common from "../../../Component/FormInput/Common";
import Select from "../../../Component/FormInput/Select";
import {listkecamatan} from '../../../FormsConfig';
import Radio from '../../../Component/FormInput/Radio';
import {Button} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
let datakecamatan = listkecamatan.map(({id, nama})=>{
    return {value:id, label:nama}
});
const Form = [
    {
        name:"nama",
        label:"Nama kelompok",
        isValid:()=>true,
        className:"form-control-alternative shadow-lg",
        component:Common,
    },
    {
        name:"kecamatan",
        Component:Select,
        isValid:()=>true,
        label:"Kecamatan",
        value:-1,
        component:Select,
        datasource:datakecamatan
    },
    {
        name:"tipe",
        Component:Select,
        isValid:()=>true,
        label:"Tipe kelompok",
        component:Radio,
        datasource:[
            {'label':"Pendidikan","value":"pendidikan"},
            {'label':"Masyarakat","value":"masyarakat"}
        ]
    },
];

export default ({Handler})=>{
    const [data, setdata] = useState({});
    const inputHandler = ({target})=>{
        const name = target.getAttribute("name");
        const value = target.value;
        data[name] = value;
        setdata(data);
    };
    return (
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="h3-responsive">
                            Filter pencarian
                        </h3>
                    </div>
                    {
                        Form.map((Prop, key)=>{
                            return(
                                <div key={key} className="col-md-4 col-lg-4 col-sm-6">
                                    <div className="form-group">
                                        <Prop.component onChange={inputHandler} {...Prop}  />
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div  className="col-md-4 col-lg-4 col-sm-6 d-flex align-items-center">
                        <Button onClick={()=>Handler(data)} color='default' className='w-100'>
                            <FontAwesomeIcon icon={faSearch} />
                            <span>
                        Apply
                    </span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}