import React, {useState} from "react";
import {Button, Card, CardBody, CardTitle, Col} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinusCircle, faPlus, faSyncAlt} from "@fortawesome/free-solid-svg-icons";
import {GET} from "../../../api";
import {LineChart} from "../Charts";
const Months =  ["Jan","Feb","Mar","Apr","May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"];

const saved ={};
export default ()=>{
    const [N , setN] = useState(6);
    const [Month , setMonth] = useState([]);
    const [Data , setData] = useState([]);
    const setup = (N)=>{
        if (saved[N]){
            setMonth(saved[N].label);
            setData(saved[N].dataset);
        }else{
            console.log("Query sent");
            GET('api/statistic/kasus?get=true&&last_month='+N).then(data=>{
                let dataset = [];
                let label = [];
                data.forEach(({tahun, bulan, kasus})=>{
                    dataset = [...dataset, kasus];
                    label = [...label, Months[bulan-1]]
                });
                setMonth(label);
                setData(dataset);
                saved[N] = {label, dataset};
            }).catch(res=>{
                console.log(res)
            });
        }
    };
    const minusBtn = () =>{
        setN(N-1);
        setup(N-1);
    };
    const plusBtn =()=>{
        setN(N+1);
        setup(N+1);
    };
    if (Month.length + Data.length === 0)
        setup(N);
    return (<Card className="bg-gradient-default shadow">
        <CardBody>
            <CardTitle className='text-white font-weight-bold'>
                {
                    Month.length>0 && Data.length>0
                        ?
                        <>
                            <div className="row mb-5">
                                <div className="col-md-8">
                                    Jumlah kasus {N} bulan terakhir
                                </div>
                                <div className="col-md-4 text-right">
                                    <Button disabled={N === 12} onClick={plusBtn} title="Tambah jangkauan waktu (bulan)" color="primary" size="sm" type="button">
                                        <FontAwesomeIcon icon={faPlus} />
                                    </Button>
                                    <Button onClick={minusBtn} disabled={N === 6} title="Kurangi jangkauan waktu (bulan)" color="secondary" size="sm" type="button">
                                        <FontAwesomeIcon icon={faMinusCircle} />
                                    </Button>
                                </div>
                            </div>
                            <LineChart data={Data} labels={Month} />
                        </>
                        :
                        <div className="d-flex justify-content-center align-items-center">
                            <FontAwesomeIcon icon={faSyncAlt} className='fa-spin fa-5x' />
                        </div>
                }
            </CardTitle>
        </CardBody>
    </Card>)
}