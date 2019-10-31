import {
    faBookMedical,
    faChartLine, faImages, faNewspaper, faSignOutAlt,
    faUser,
    faUserMd,
    faUsers
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import AdminView from "../View/Admin";
import {logout} from "../Api/allroles";
export default [
    {
        Path:"/",
        Label:"Dashboard",
        Component: AdminView.AdminDashboard,
        Icon:faChartLine
    },
    {
        Label:"Pengguna",
        Path:"/list/pengguna",
        Component:AdminView.AdminUserList,
        Icon:faUser
    },
    {
        Label:"Konselor",
        Path:"/list/konselor",
        Component: AdminView.AdminKonselor,
        Icon:faUserMd
    },
    {
        Label:"Kelompok PIKR",
        Path:"/kelompok",
        Component: AdminView.AdminKelompok,
        Icon:faUsers
    },
    {
        Label:"Laporan konseling",
        Path:"/Laporan",
        Component: AdminView.AdminLaporanKasus,
        Icon:faBookMedical
    },
    {
        Path:"/tambah/konselor",
        Component: AdminView.AdminTambahKonselor,
        Hidden:true,
    },
    {
        Path:"/kelompok/detail",
        Component: AdminView.AdminDetailKelompok,
        Hidden:true,
    },
    {
        Label:"Informasi remaja",
        Icon :faNewspaper,
        Path:"/informasi/remaja",
        Component: AdminView.AdminContentManagement,
    },
    {
        Label:"Galeri",
        Icon :faImages,
        Path:"/galeri",
        Component: AdminView.AdminGaleriManagement,
    },
    {
        Label:"Logout",
        Icon :faSignOutAlt,
        Path:"/logout",
        Component: ()=>{
            logout();
            return <div />
        },
    },
]