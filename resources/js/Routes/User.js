import {
    faBookMedical,
    faChartLine, faHome, faSignOutAlt,
    faUser,
    faUserMd,
    faUsers
} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";
import UserView from "../View/User";
import {logout} from "../Api/allroles";

export default [
    {
        Path:"/chat/kelompok",
        Label:"Dashboard",
        Component: UserView.UserGroupChat,
        Icon:faHome
    },{
        Path:"/",
        Component: UserView.Home,
    },
    {
        Label:"Konseling",
        Path:"/konseling",
        Component: UserView.UserPrivateChat,
        Icon:faUsers
    },
    {
        Label:"Pengaturan akun",
        Path:"/pengaturan/akun",
        Component: UserView.PengaturanAkun,
        Icon:faUsers
    },
]