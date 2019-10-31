import React from "react";
import Nav from "./Navs/Auth";
import AuthHeader from "../Component/AuthHeader";
import {Container, Row} from "reactstrap";
export default ({children})=>(
    <div className={"main-content"}>
        <Nav />
        <AuthHeader/>
        <Container className="mt--8 pb-5">
            <Row className="justify-content-center">
                {children}
            </Row>
        </Container>
    </div>
)