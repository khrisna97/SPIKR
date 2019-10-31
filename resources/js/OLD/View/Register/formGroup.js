import React from "react";
import Forminput from '../../Component/FormInput';
const Group = ({inputs, header, data ,handler}) =>{
    return (
        <div>
            <h1 className={'h1-responsive border-bottom'}>
                {header}
            </h1>
            <div className="row">
                {
                    inputs.map((prop, key)=>{
                        return <div className={prop.col?`col-md-${prop.col}`:"col-md-6"} key={key+prop.name}>
                            <Forminput {...prop} key={key+prop.name} />
                        </div>
                    })
                }
            </div>
        </div>
    )
};
export default Group