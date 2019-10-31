import React from "react";
import {GalleryApi} from "../../Api/AdminAPI";
import GalleryComponent from "react-photo-gallery";
import HomeContent from "../../Component/PublicContent";
import GalleryImages from "../../Component/GalleryImages";

export default () =>{

    const prop = {
        Title : 'Galeri',
        api : GalleryApi,
        perpage:5,
        ContentWrapper : ({foto, judul, waktu})=>{
            foto = foto.map(({path, caption})=> ({
                src:path,
                // caption,
                width:4,
                height:3
            }));

            foto = _.shuffle(foto);

            let i = 0 ;

            return <div className='my-2'>
                <div className="card">
                    <div className="card-header">
                        <h1 className=''>
                            {judul}
                        </h1>
                        <small>
                            {waktu}
                        </small>
                    </div>
                    <div className="card-body">
                        <div className="row justify-content-center">
                            <GalleryComponent renderImage={(prop)=>{

                                return <div key={prop.key} className='col-md-4 text-center'>
                                    <div className="img-gallery">
                                        <GalleryImages path={prop.key} />
                                    </div>
                                </div>
                            }}  photos={foto} />
                        </div>
                    </div>
                </div>
            </div>
        }
    };
    return <HomeContent  {...prop} />;
};
