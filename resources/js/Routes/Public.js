import React from "react";
import {faInfoCircle, faQuestionCircle} from "@fortawesome/free-solid-svg-icons";
import PublicView from '../View/Public';
const Hidden = true;
export default  [
    {
        Path:'/',
        Component:PublicView.Home,
        Hidden
    },
    {
        Path:'/tentang',
        Label:'tentang',
        Component: ()=><div>Tentang</div>,
        Icon:faInfoCircle,
    },
    {
        Path:'/faq',
        Label:'FAQ',
        Component: ()=><div>FAQ</div>,
        Icon:faQuestionCircle,
    },
    {
        Path:'/galeri',
        Label:'galeri',
        Component: PublicView.GalleryImages,
        Icon:faQuestionCircle,
    },
    {
        Path:'/posts',
        Label:'galeri',
        Component: PublicView.ContentReader,
        Icon:faQuestionCircle,
    },
];