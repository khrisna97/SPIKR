import React from "react";


const FormLapor = ({anggota, router, kelompok})=>{
    console.log(anggota, router, kelompok);
    return <div>
        lol
    </div>
};

export default ({Consumer})=>{
    return <Consumer>{(prop)=><FormLapor {...prop} />}</Consumer>
}