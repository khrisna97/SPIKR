import React from 'react';
import {Col, Container, Nav, Navbar, NavbarBrand, Row, UncontrolledCollapse,} from "reactstrap";
import {Link} from "react-router-dom";
import useRouter from "../../Hooks/Router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
export default ({brand, brandSetter, DrawerSetter})=>{
    const {history} = useRouter();

    let pagename = history.location.pathname;

    pagename = pagename.replace('/','');

    pagename = pagename.replace('list/','list ');

    pagename = pagename.replace('tambah/','tambah ');

    pagename = pagename.replace('informasi/','informasi ');

    return(
        <React.Fragment>
            <Navbar
                className="navbar-horizontal navbar-light bg-translucent-primary"
                expand="lg"
                fixed={'top'}
            >
                <Container>
                    <NavbarBrand className='font-weight-bold' href="#pablo" onClick={e => e.preventDefault()}>
                        <h1 className='text-white'>
                            <FontAwesomeIcon icon={faBars} className={'mr-3'} onClick={DrawerSetter} />
                            <span onClick={()=>{
                                brandSetter('Dashboard');
                                history.push('/')
                            }}>
                            {pagename ? pagename : brand}
                            </span>
                        </h1>
                    </NavbarBrand>
                    <UncontrolledCollapse className='d-md-none' navbar toggler=".navbar-toggle">
                        <div className="navbar-collapse-header ">
                            <Row>
                                <Col className="collapse-brand" xs="6">
                                    <Link to="/">
                                        <img
                                            alt="..."
                                            src={require("@creative-tim-official/argon-dashboard-free/assets/img/brand/blue.png")}
                                        />
                                    </Link>
                                </Col>
                                <Col className="collapse-close" xs="6">
                                    <button
                                        aria-controls="navbar-default"
                                        aria-expanded={false}
                                        aria-label="Toggle navigation"
                                        className="navbar-toggler navbar-toggle"
                                        data-target="#navbar-default"
                                        data-toggle="collapse"
                                        id="navbar-default"
                                        type="button"
                                    >
                                        <span />
                                        <span />
                                    </button>
                                </Col>
                            </Row>
                        </div>
                        <Nav className="ml-lg-auto d-lg-none"  navbar>
                        </Nav>
                    </UncontrolledCollapse>
                </Container>
            </Navbar>
        </React.Fragment>
    )
};