import React from "react";
import {Link} from "react-router-dom";
import {
    Col,
    Collapse,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Nav,
    NavItem,
    NavLink,
    Row
} from "reactstrap";
import Links from './Links';
import {AdminRoutes} from "../../../routes";
export const LogoComponent = ({logo}) =>{
    return logo ? (
            <Col className="collapse-brand" xs="6">
                {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                ) : (
                    <a href={logo.outterLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                )}
            </Col>
        ) : null;
};
export default ({ CollapseToggler, isOpen, location, logo }) =>{
    return(
    <Collapse navbar isOpen={isOpen}>
        {/* Collapse header */}
        <div className="navbar-collapse-header d-md-none">
            <Row>
                <LogoComponent logo={logo} />
                <Col className="collapse-close" xs="12">
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={CollapseToggler}
                    >
                        <span />
                        <span />
                    </button>
                </Col>
            </Row>
        </div>
        {/* Form */}
        <Form className="mt-4 mb-3 d-md-none">
            <InputGroup className="input-group-rounded input-group-merge">
                <Input
                    aria-label="Search"
                    className="form-control-rounded form-control-prepended"
                    placeholder="Search"
                    type="search"
                />
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        <span className="fa fa-search" />
                    </InputGroupText>
                </InputGroupAddon>
            </InputGroup>
        </Form>
        {/* Navigation */}
        <Nav navbar>
            <Links currentPath={location.pathname} routes={AdminRoutes} CollapseToggler={CollapseToggler}/>
        </Nav>
        {/* Divider */}
        <hr className="my-3" />
        {/* Heading */}
    </Collapse>
)};