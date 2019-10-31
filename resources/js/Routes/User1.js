import {
    faBookMedical,
    faChartLine, faHome, faSignOutAlt,
    faUser,
    faUserMd,
    faUsers
} from "@fortawesome/free-solid-svg-icons";
import UserView from "../View/User1";

export default [
    {
        Path:"/",
        Component: UserView.FormJoinKelompok,
    }
    ,{
        Label:"Pengaturan akun",
        Path:"/pengaturan/akun",
        Component: UserView.PengaturanAkun,
        Icon:faUsers
    },
]