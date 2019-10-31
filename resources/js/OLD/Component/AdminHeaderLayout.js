import React from "react";
import { Container } from "reactstrap";
const WrapperStyles = {
    minHeight:"100vh",
    width:"100%",
};
const Wrapper = ({children}) =>{
    return (<div style={WrapperStyles}>
        {children}
    </div>)
};
export default ({children})=>(
    <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
            <div className="header-body">
                <Wrapper>
                    {children}
                </Wrapper>
            </div>
        </Container>
    </div>
)