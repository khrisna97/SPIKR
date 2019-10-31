import React from "react";
import useWebProperty from "../../Hooks/Webprop";
import listkecamatan from "../../Staticvariable/listkecamatan";
import moment from "moment";

export default ()=>{
    const { profile, kelompok} = useWebProperty();

    const infoakun = {
        'nama lengkap' : profile.nama,
        'alamat' : profile.alamat,
        'kecamatan' :listkecamatan.find(item=>parseInt(item.id) === profile.kecamatan).nama,
        'nomor ktp' : profile['nomor-ktp'],
        'pengguna sejak' : moment(profile.created_at).locale('id').format('DD MMMM YYYY')
    };

    const looper = [{
        header : 'Data diri',
        looper : infoakun
    },
        {
            header:'Kelompok',
            looper: {
                'nama':kelompok.nama,
                'ketua / konselor':kelompok.ketua,
                'total anggota' : kelompok.anggota + ' anggota'
            }
        }
    ];

    return (
        <div className="card h-100" style={{borderRadius:0}}>
            <div className="card-body">
                {
                    looper.map(({header, looper},key)=>{

                        return <div key={key}>
                            <h3 className='text-uppercase mt-2 border-bottom'>{header}</h3>
                            {
                                Object.keys(looper).map((title, index)=>{

                                    return (
                                        <div className="row mt-2" key={index}>
                                            <div className="col-md-6 font-weight-900 d-flex justify-content-between text-capitalize">
                                                    <span>
                                                    {title}
                                                    </span>
                                                <span className='d-lg-block d-none'>
                                                :
                                                </span>
                                            </div>
                                            <div className="col-6">
                                                {looper[title]}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    })
                }
            </div>
        </div>
    )
}