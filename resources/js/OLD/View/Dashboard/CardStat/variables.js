import {faBriefcaseMedical, faPeopleCarry, faSchool, faUsers} from "@fortawesome/free-solid-svg-icons";

export const stats = [
    {
        "title":"kelompok",
        "icon":faUsers,
        "source":"api/statistic/kelompok?count=true",
        "saved":null,
    },
    {
        "title":"kasus",
        "icon":faBriefcaseMedical,
        "source":"api/statistic/kasus?count=true",
        "saved":null,
    },
    {
        "title":"Kelompok masyarakat",
        "icon":faPeopleCarry,
        "source":"api/statistic/kelompok?count=true&&tipe=masyarakat",
        "saved":null,
    },
    {
        "title":"Kelompok pendidikan",
        "icon":faSchool,
        "source":"api/statistic/kelompok?count=true&&tipe=pendidikan",
        "saved":null,
    }
];