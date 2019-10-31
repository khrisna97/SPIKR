import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import {ContentApi, GalleryApi} from "../../Api/AdminAPI";
import GalleryComponent from "react-photo-gallery";
import HomeContent from "../../Component/PublicContent";
import useRouter from "../../Hooks/Router";
import GalleryImages from "../../Component/GalleryImages";
import {faNewspaper, faPhotoVideo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Content as ContentContainer} from "../ContentPagination";

const Gallery = () =>{

    const {history} = useRouter();

    const customloadmore = () =>{
        history.push('../galeri')
    };

    const prop = {
        Title : 'Galeri',
        Icon : faPhotoVideo,
        api : GalleryApi,
        perpage:3,
        customloadmore,
        ContentWrapper : ({foto, judul, waktu})=>{
            foto = foto.map(({path, caption})=> ({
                src:path,
                caption,
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
                            <GalleryComponent renderImage={prop=>{
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
const Content = () =>{
    const {history} = useRouter();
    const [openmodal, setopenmodal] = useState(false);
    const [postsprop, setpostprops] = useState(null);

    const toggle = () => setopenmodal(!openmodal);

    const customloadmore = () =>{
        history.push('../posts')
    };

    const PostHeaderOnClick = (prop) =>{
        setpostprops({...prop,contentid:prop.id});
        toggle();
    };

    const ContentProp = {
        toggle,  ...postsprop, openmodal
    };

    const prop = {
        Title : 'Berita dan Pengumuman',
        api : ContentApi,
        customloadmore,
        ContentWrapper : (prop)=>{

            const {judul, waktu} = prop;

            return (<div>
                    <h1 className='pointer mb-0 pb-0' onClick={()=>PostHeaderOnClick(prop)}>{judul}</h1>
                    <small className=''>
                        di posting pada {waktu}
                    </small>
                </div>
            )}
    };

    return <React.Fragment>
        <ContentContainer {...ContentProp} />
        <HomeContent  {...prop} />
    </React.Fragment> ;

};
export default (props) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    };

    return (
        <div className='my-2'>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggle('1'); }}
                    >
                        <span className="text-dark">
                            <FontAwesomeIcon icon={faPhotoVideo} className='mr-2' />
                            Galeri
                        </span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('2'); }}
                    >
                        <span className="text-dark">
                            <FontAwesomeIcon icon={faNewspaper} className='mr-2' />
                            Informasi remaja
                        </span>
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <div className="py-2">
                        <Gallery/>
                    </div>
                </TabPane>
                <TabPane tabId="2">
                    <div className="py-2">
                        <div className="card">
                            <div className="card-body">
                                <Content/>
                            </div>
                        </div>
                    </div>
                </TabPane>
            </TabContent>
        </div>
    );
}
