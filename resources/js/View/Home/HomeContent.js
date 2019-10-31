import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

const Loader = ()=> <div className='text-center text-white'>
    <FontAwesomeIcon icon={faSpinner} size='10x' spin />
    <p>
        Loading
    </p>
</div>;

export default ({ ContentWrapper,Title, api,perpage })=>{

    const [data, setdata] = useState([]);

    if (! data.length){

        api({page:1, pageSize:perpage? perpage: 5, Query:{}},({data})=>setdata(data))
    }

    return (
        <div className='my-2'>
            <h1 className='text-white'>{Title}</h1>
            <hr className='border-white'/>
            <div>
                {
                    data.length ? data.map((prop, key)=><ContentWrapper key={key}  {...prop} />) : <Loader/>
                }
            </div>
            <div className="text-right">
                <button className="btn">
                    Tampilkan lainya
                </button>
            </div>
        </div>
    )
}