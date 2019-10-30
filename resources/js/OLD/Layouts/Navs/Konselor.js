import React, {useState} from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Navbar,
    Nav,
    Media,
    Container, Collapse, Row, Col, Form, InputGroup, Input, InputGroupAddon, InputGroupText,
} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {LogoComponent} from "../Sidebar/Admin/collapse";
import Links from "../Sidebar/Admin/Links";
import {KonselorRoutes} from "../../routes";
import {Logout} from "../../api";


const CollapseComponent = ({ CollapseToggler, isOpen, location, logo })=>{
    return (
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
                <Links currentPath={location.pathname} routes={KonselorRoutes} CollapseToggler={CollapseToggler}/>
            </Nav>
            {/* Divider */}
            <hr className="my-3" />
            {/* Heading */}
        </Collapse>
    )
};


export default ({brandText, location})=>{
    const [collapse_active, setCollapse_active] = useState(false);
    const CollapseProp = {
        CollapseToggler:()=> setCollapse_active(!collapse_active),
        isOpen:collapse_active,
        location,logo:""
    };
    return (
    <>
        <Navbar className="navbar-top navbar-dark" expand="md">
            <button
                className="navbar-toggler"
                type="button"
                onClick={()=>setCollapse_active(!collapse_active)}
            >
                <span className="navbar-toggler-icon" />
            </button>
            <Container fluid>
                <Link
                    className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
                    to="/"
                >
                    {brandText}
                </Link>
                <CollapseComponent {...CollapseProp} />
                <Nav className="align-items-center d-none d-md-flex" navbar>
                    <UncontrolledDropdown nav>
                        <DropdownToggle className="pr-0" nav>
                            <Media className="align-items-center">
                            <span className="">
                                <FontAwesomeIcon className='fa-2x' icon={faUserCircle} />
                            </span>
                                <Media className="ml-2 d-none d-lg-block">
                                <span className="mb-0 text-sm font-weight-bold">
                                    {
                                        window.userdata.username
                                    }
                                </span>
                                </Media>
                            </Media>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem className="noti-title" header tag="div">
                                <h6 className="text-overflow m-0">Welcome!</h6>
                            </DropdownItem>
                            <DropdownItem to="/admin/user-profile" tag={Link}>
                                <i className="ni ni-single-02" />
                                <span>My profile</span>
                            </DropdownItem>
                            <DropdownItem to="/admin/user-profile" tag={Link}>
                                <i className="ni ni-settings-gear-65" />
                                <span>Settings</span>
                            </DropdownItem>
                            <DropdownItem to="/admin/user-profile" tag={Link}>
                                <i className="ni ni-calendar-grid-58" />
                                <span>Activity</span>
                            </DropdownItem>
                            <DropdownItem to="/admin/user-profile" tag={Link}>
                                <i className="ni ni-support-16" />
                                <span>Support</span>
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={() => Logout()}>
                                <i className="ni ni-user-run" />
                                <span>Logout</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Container>
        </Navbar>
    </>
)}