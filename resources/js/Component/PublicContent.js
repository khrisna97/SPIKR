import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

const Loader = ()=> <div className='text-center text-white'>
    <FontAwesomeIcon icon={faSpinner} size='10x' spin />
    <p>
        Loading
    </p>
</div>;

export default ({ ContentWrapper,Title, api,perpage,customloadmore })=>{

    const [states, setStates] = useState({
        data : [],
        page : 0,
        loading : false,
        total : -1,
        isempty : false,
    });


    const datasetter = () =>{
        setStates({...states,['loading'] : true});
        const handler = prop =>{
            const arr =[ ...states.data,...prop.data];

            let newprop = {
                data : arr,
                page : prop.page + 1,
                total : prop.totalCount,
                isempty : arr.length  === 0,

            };
            console.log(arr.length);

            setStates({...states,...newprop});
        };
        const {page} = states;

        api({page : page , pageSize:perpage? perpage: 5, Query:{}},handler);
    };

    useEffect(()=>{
        if (! states.data.length && !states.loading && ! states.isempty){
            datasetter();
        }
    },[states]);

    const loadmorebtnHandler = () =>{
        if (customloadmore === undefined){
            datasetter();

        }else{
            if (typeof customloadmore === 'function'){
                customloadmore()
            }
        }
    };

    const islast = states.data.length / states.total === 1;

    if(states.isempty){

        return <div className='text-center'>
            <h1>Data tidak di temukan</h1>
        </div>

    }

    return (
        <div>
            <div>
                {
                    states.data.length ? states.data.map((prop, key)=><ContentWrapper index={key} key={key}  {...prop} />) : <Loader/>
                }
            </div>
            <div className="text-right">
                {
                    !islast ? <button onClick={()=> loadmorebtnHandler()} className="btn" disabled={states.loading}>

                        {
                            !states.loading ?
                                <React.Fragment>
                                    Tampilkan lainya
                                </React.Fragment> :
                                <React.Fragment>
                                    <FontAwesomeIcon icon={faSpinner} spin />
                                    Tampilkan lainya
                                </React.Fragment>
                        }
                    </button> : ""}
            </div>
        </div>
    )
}