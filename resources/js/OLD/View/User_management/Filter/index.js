import React, {useState} from "react";
import {Button} from "reactstrap";
import Select from "../../../Component/FormInput/Select";
import {listkecamatan} from "../../../FormsConfig";
import Common from "../../../Component/FormInput/Common";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

let datakecamatan = listkecamatan.map(({id, nama})=>{
    return {value:id, label:nama}
});
export default ({Handler, KelompokData})=> {
    const [Query, setQuery] = useState({});
    const InputHandler = ({target})=>{
        const name = target.getAttribute('name');
        Query[name] = target.value;
        if (KelompokData.length && name === "kecamatan"){
            delete Query.kelompok;
        }
        setQuery({...Query})
    };
    const Form =[
        {
            name:"nama",
            label:"Nama pengguna",
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
            name:"kelompok",
            disabled:KelompokData.length === 0,
            Component:Select,
            isValid:()=>true,
            label:"Kelompok",
            value:-1,
            component:Select,
            datasource:KelompokData ? KelompokData:[]
        }
    ];
    return (
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
                                <Prop.component onChange={InputHandler} {...Prop}  />
                            </div>
                        </div>
                    )
                })
            }
            <div  className="col-md-4 col-lg-4 col-sm-6 d-flex align-items-center">
                <Button onClick={()=>Handler(Query)} color='default' className='w-100'>
                    <FontAwesomeIcon icon={faSearch} />
                    <span>
                        Apply
                    </span>
                </Button>
            </div>
        </div>
    );
}