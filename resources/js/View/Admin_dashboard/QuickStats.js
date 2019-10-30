import React, {useState} from "react";
import {
    faBriefcaseMedical,
    faCity,
    faGraduationCap, faSyncAlt,
    faUser,
    faUserMd,
    faUsers
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {QuickStatApi} from "../../Api/AdminAPI";
let usedColor = [];
const GenerateRandomColor = () =>{
    const colors = ['primary text-white','warning text-white','success text-white','secondary text-dark','dark text-white','danger text-white'];
    const toReturn = colors[Math.floor((Math.random() * colors.length))];
    if (usedColor.find(item=>item === toReturn))return GenerateRandomColor();
    usedColor = [...usedColor, toReturn];
    return toReturn;
};
const Config = [
    {
        label:"Pengguna",
        icon:faUser,
        bg:GenerateRandomColor(),
        map:'pengguna',
    },
    {
        label:"Kelompok",
        icon:faUsers,
        bg:GenerateRandomColor(),
        map:'kelompok',
    },
    {
        label:"Kasus",
        icon:faBriefcaseMedical,
        bg:GenerateRandomColor(),
        map:'kasus',
    },
    {
        label:"Konselor",
        icon:faUserMd,
        bg:GenerateRandomColor(),
        map:'konselor',
    },
    {
        label:"Kelompok pendidikan",
        icon:faGraduationCap,
        bg:GenerateRandomColor(),
        map:'pendidikan',
    },
    {
        label:"Kelompok masyarakat",
        icon:faCity,
        bg:GenerateRandomColor(),
        map:'masyarakat',
    }
];

const QuickStats = ()=>{
    const [statistic, setStatistic] = useState(null);
    QuickStatApi().then((res)=>setStatistic(res));
    return <React.Fragment>
        <h1>
            Data penggunaan aplikasi
        </h1>
        <div className="row">
            {
                Config.map(({label, icon, bg, map}, index)=>{
                    return <div key={index} className='col-sm-4 mt-4'>
                        <div className={`card bg-${bg}`}>
                            <div className="card-body py-2">
                                {label}
                                <div className='row p-3 justify-content-between'>
                                    {
                                        statistic === null ?
                                            <FontAwesomeIcon icon={faSyncAlt} className={`mr-3 fa-spin fa-3x text-${bg}`} />
                                            : <React.Fragment>
                                                <FontAwesomeIcon icon={icon} className={`mr-3 fa-3x text-${bg}`} />
                                                <h1 className={bg}>{statistic[map]}</h1>
                                            </React.Fragment>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
    </React.Fragment>
};
export default QuickStats;