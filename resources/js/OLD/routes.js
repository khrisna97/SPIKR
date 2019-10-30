import React from "react";
import Views from "./View/index";
import {
    faChartLine,
    faUserFriends,
    faUser,
    faUsers,
    faUserMd,
    faPlusCircle,
    faBriefcase, faComments
} from "@fortawesome/free-solid-svg-icons";
import {Redirect} from "react-router-dom";
import AdminHeaderLayout from "./Component/AdminHeaderLayout";
import KonselorRiwayatKasus from "./View/Konselor_riwayatKasus";
import KonselorMessage from "./View/Konselor_messages";
export const AuthRoute = [
    {
        path:"/login",
        component:()=> <Views.Login />
    },
    {
        path:"/pendaftaran",
        component:()=> <Views.Register />
    }
];
export const AdminRoutes = [
    {
        path:"/",
        name:"Dashboard",
        component: Views.Dashboard,
        icon:faChartLine
    },
    {
        path:"/home",
        component:()=> <Redirect to='/' />,
    },
    {
        path:"/kelompok/detail",
        component:Views.DetailKelompok,
    },
    {
        path:"/kelompok/edit",
        component:Views.EditKelompok,
    },
    {
        name:"Daftar pengguna",
        path:"/users",
        component:()=> <Views.UserManagement />,
        icon:faUser
    },
    {
        name:"Kelompok PIKR",
        path:"/kelompok",
        component: ()=><Views.Kelompok_management/>,
        icon:faUsers
    },
    {
        name:"Tambah konselor",
        path:"/tambah/konselor",
        component: ()=><Views.Add_konselor/>,
        icon:faUserMd
    },
    {
        name:"Buat kelompok KR",
        path:"/tambah/kelompok",
        component: ()=><Views.Add_kelompok/>,
        icon:faPlusCircle
    },
];
export const KonselorRoutes = [
    {
        name:"Dashboard",
        path:"/",
        component: (prop)=><Views.Konselor_home {...prop} />,
        icon:faBriefcase
    },
    {
        path:"/home",
        component: ()=><Redirect to={'/'}/>,
    },
    {
        name:"Chat kelompok",
        path:"/chat/kelompok",
        component: (prop)=><Views.GroupChat {...prop}/>,
        icon:faComments
    },
    {
        path:"/chat/personal",
        component: (prop)=><Views.KonselorMessage  {...prop}/>,
    },
    {
        path:"/lapor",
        component: (prop)=><Views.KonselorLapor  {...prop}/>,
    },
    {
        path:"/riwayat/kasus",
        component: (prop)=><Views.KonselorRiwayatKasus {...prop}/>,
    },
];