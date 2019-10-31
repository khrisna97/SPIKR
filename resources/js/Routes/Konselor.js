import {
    faBookMedical,
    faChartLine, faHome, faSignOutAlt,
    faUser,
    faUserMd,
    faUsers
} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";
import KonselorView from "../View/Konselor";
import {logout} from "../Api/allroles";

export default [
    {
        Path:"/",
        Label:"Dashboard",
        Component: KonselorView.KonselorHome,
        Icon:faHome
    },
    {
        Path:"/chat/kelompok",
        Label:"Dashboard",
        Component: KonselorView.KonselorGroupchat,
        Icon:faHome
    },
    {
        Path:"/konseling",
        Label:"Dashboard",
        Component: KonselorView.KonselorPersonalChat,
        Icon:faHome
    },
    {
        Label:"Kelompok",
        Path:"/kelompok",
        Component:KonselorView.KonselorKelompok,
        Icon:faUsers
    },
    {
        Label:"Laporan",
        Path:"/laporan",
        Component: KonselorView.KonselorLaporan,
        Icon:faBookMedical
    },
    {
        Label:"Pengaturan akun",
        Path:"/pengaturan/akun",
        Component: KonselorView.PengaturanAkun,
        Icon:faUsers
    },
    {
        Label:"Pengaturan kelompok",
        Path:"/pengaturan/kelompok",
        Component: KonselorView.KonselorPengaturanKelompok,
        Icon:faBookMedical
    },
]