import React from 'react';
import {Col, Container, Nav, Navbar, NavbarBrand, Row, UncontrolledCollapse,} from "reactstrap";
import {Link} from "react-router-dom";
import Routes from "../../Routes/Public";
import Links from './Component/Links';
import useRouter from "../../Hooks/Router";
import Login from "../../Component/Login";
import AppHeader from "../../Component/AppHeader";
export default ()=>{
    const LinkCollections = <Links Routes={Routes} />;
    const {history} = useRouter();


    return(
      <React.Fragment>
          <Navbar
            className="navbar-horizontal navbar-light"
            expand="lg"
          >
              <Container>
                  <NavbarBrand className='font-weight-bold' href="#pablo" onClick={e => e.preventDefault()}>
                      <h1 onClick={()=>history.push('/')} className='text-white'>
                          <AppHeader />
                      </h1>
                  </NavbarBrand>
                  <button
                    aria-controls="navbar-default"
                    aria-expanded={false}
                    aria-label="Toggle navigation"
                    className="navbar-toggler navbar-toggle bg-white"
                    data-target="#navbar-default"
                    data-toggle="collapse"
                    id="navbar-default"
                    type="button"
                  >
                      <span className="navbar-toggler-icon" />
                  </button>
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
                              <Login/>
                              {LinkCollections}
                          </Nav>
                      </UncontrolledCollapse>
                      <Nav className="ml-auto d-none d-lg-flex" navbar>
                          <Login/>
                      </Nav>
              </Container>
          </Navbar>
      </React.Fragment>
    )
};