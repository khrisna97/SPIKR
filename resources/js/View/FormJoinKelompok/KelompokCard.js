import React, {useState} from "react";
import useWebProperty from "../../Hooks/Webprop";
import {getKelompokInKecamatan} from "../../Api/allroles";
import BIGLoader from "../../Component/BIGLoader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserFriends, faUserMd} from "@fortawesome/free-solid-svg-icons";
import KelompokDetail from "./KelompokDetail";

const List = ({list})=>{

    const [selectedKelompok, setSelectedKelompok] = useState(undefined);

    const BtnHandler = (kelompok)=>{
        setSelectedKelompok(kelompok);
    };

    const Reset = ()=>setSelectedKelompok(undefined);

    return <div className='row'>
        {
            selectedKelompok ? <KelompokDetail Reset={Reset} {...selectedKelompok} /> : ""
        }
        {
            list.map((kelompok, key)=>{
                return <div key={key} className='col-md-6 mt-3'>
                    <div className="card">
                        <div className="card-header justify-content-between pb-0 mb-0">
                            <h4>{kelompok.nama}</h4>
                        </div>
                        <div className="card-body">
                            <button onClick={()=>{
                                BtnHandler(kelompok)
                            }} className="btn btn-sm mb-2  btn-primary">
                                Gabung kelompok KR
                            </button>
                            <table className='w-100'>
                                <tbody>
                                <tr>
                                    <td>
                                        <FontAwesomeIcon icon={faUserMd} />
                                    </td>
                                    <td>
                                        Konselor
                                    </td>
                                    <td>: {kelompok.ketua}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <FontAwesomeIcon icon={faUserFriends} />
                                    </td>
                                    <td>
                                        Jumlah anggota
                                    </td>
                                    <td>: {kelompok.anggota}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            })
        }
    </div>
};

const KelompokCard = ()=>{
    const [kelompoklist, setKelompokList] = useState([]);
    const [status, setStatus] = useState('loading');
    const {personal} = useWebProperty();

    const kelompokListSetter = (data)=>{
        setTimeout(_=>{
            if (! data.length){
                setStatus('notfound')
            }else{
                setStatus('found');
                setKelompokList(data);
            }
        }, 1000);
    };

    if (! kelompoklist.length && status === 'loading'){
        getKelompokInKecamatan(personal.kecamatan, kelompokListSetter);
    }

    return <div>
        {
            status === 'loading' ?<div className='text-center text-white'>
                <BIGLoader text={'Memuat data kelompok'} />
                <p className='mt-5'>
                    Memuat data kelompok
                </p>
            </div> : ''
        }
        {
            status === 'notfound' ? <div className="text-center text-white">
                <p>Maaf saat ini belum ada kelompok KR di kecamatan anda yang terdaftar di sistem kami</p>
            </div> :""
        }

        {
            status === 'found' && kelompoklist.length ?
                <List list={kelompoklist} /> : ''
        }

    </div>
};
export default KelompokCard