import React from "react";
export default ({nama,anggota, kasus})=>{

    return (
        <div className="card">
            <h3 className="card-header h3-responsive border-0">
                Kelompok ku
            </h3>
            <div className="card-body">
                <p className='font-weight-bold border-bottom'>
                    Nama
                </p>
                <p>
                    {nama}
                </p>
                <p className='font-weight-bold border-bottom'>
                   Jumlah anggota
                </p>
                <p>
                    {anggota}
                </p>
                <p className='font-weight-bold border-bottom'>
                    Kasus di laporkan
                </p>
                <p>
                    {kasus}
                </p>
            </div>
        </div>
    )
}