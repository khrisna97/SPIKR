import React, {useState} from "react";
import {CardBody, Card,Row, Col, CardTitle, Button} from "reactstrap";
import {stats} from "./variables";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSyncAlt} from "@fortawesome/free-solid-svg-icons";
import {GET} from "../../../api";
const CardStats = ({title, source, index,icon, saved})=>{
    const [loading, setLoading] = useState(saved === null);
    let [value, setValue] = useState(saved === null? null: saved);
    if (saved === null){
        GET(source).then((res)=>{
            setValue(res);
            setLoading(false);
            stats[index].saved = res;
        }).catch((res)=>{
            console.log("title fail :"+ title,res);
        });
    }
    return (
        <Card>
            <CardBody>
                <Row className="align-content-center">
                    <div className="col">
                        <CardTitle
                            tag="h5"
                            className=" text-uppercase text-muted mb-0"
                        >
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                            {
                                loading ? <><FontAwesomeIcon icon={faSyncAlt} className='fa-spin mr-1' /></>
                                    : <>{value}</>
                            }
                        </span>
                    </div>
                    <Col className="col-auto">
                        <div className="icon icon-shape bg-primary text-white rounded-circle shadow">
                            <FontAwesomeIcon icon={icon} />
                        </div>
                    </Col>
                </Row>
                <p className="mt-3 mb-0 font-weight-bold text-sm">
                    <span className="text-nowrap">{title}</span>
                </p>
            </CardBody>
        </Card>
    )
};
export default ()=>{
    return(
        <Row>
            {
                stats.map((prop, key)=>{
                    prop.index = key;
                    return<Col key={key} className={'mt-5'} lg="6" xl="3">
                    <CardStats  {...prop}/>
                </Col>})
            }
        </Row>
    )
};