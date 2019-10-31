import React, {useState} from "react";
import useRouter from "../../Hooks/Router";
import {Webproperty} from "../../Hooks/Webprop";
import { SnackbarProvider, useSnackbar } from 'notistack';
import UsersSelector from "./UserSelector";
import HowTo from "./HowTo";
import Messages from "./Messages";
import Composer from "./Composer";
import FormLaporan from "./FormLaporan";
import UserHeader from "./UserHeader";

const SnackBarOption = { ContentProps:{style:{backgroundColor:'var(--primary)'}},anchorOrigin:{ vertical: 'bottom', horizontal: 'right'} };

const KonselorPersonalChat =({webprop})=>{

    const { enqueueSnackbar } = useSnackbar();

    const {anggota, personal} = webprop;

    const {history} = useRouter();

    const [anggotaTerpilih,  setAnggotaTerpilih] = useState(null);

    return (
        <div className="card mb-5">
            <div className="card-body">
                <div className='row'>
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                <div className={'mb-2'}>
                                    <UsersSelector kelompok={anggota.kelompok} setter={setAnggotaTerpilih} />
                                </div>
                            </div>
                            <div className="col">
                                <div>
                                    <FormLaporan user={anggotaTerpilih}  />
                                </div>
                            </div>
                        </div>
                            {
                                anggotaTerpilih ?
                                    <UserHeader {...anggotaTerpilih} /> :
                                    <h3>Silahkan pilih salah satu anggota kelompok KR</h3>
                            }
                        {
                            !anggotaTerpilih ?
                                <HowTo  /> : (
                                    <React.Fragment>
                                        <Messages personal={personal} user={anggotaTerpilih}  />
                                        <Composer user={anggotaTerpilih} setter={setAnggotaTerpilih}  />
                                    </React.Fragment>
                                )
                        }

                    </div>
                </div>
            </div>
        </div>
    )
};

export default (prop)=>(
    <SnackbarProvider maxSnack={2}>
        <Webproperty.Consumer>{(webprop)=> <KonselorPersonalChat {...prop} webprop={webprop}  /> }</Webproperty.Consumer>
    </SnackbarProvider>
)