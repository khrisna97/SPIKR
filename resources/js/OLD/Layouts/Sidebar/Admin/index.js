// This file for side a bar component in admin page, User page, and Konselor page
// Link , icon, path, and component has been set in object array at route.js
import React, {useState} from "react";
import {Link} from "react-router-dom";
// reactstrap components
import {Navbar, Container } from "reactstrap";
import Collapse, {LogoComponent} from "./collapse";
import UserDropdown from "./UserDropdown";
/*
    is Collapsed and collapseToggler only can be triggered in mobile & tablet device
 */
export default (prop) =>{
    const {logo, location} = prop;
    const [isCollapsed, collapseToggler] = useState(false);
    const LinkHandler = ()=> collapseToggler(!isCollapsed);
    let navbarBrandProps;
    if (logo && logo.innerLink) {
        navbarBrandProps = {
            to: logo.innerLink,
            tag: Link
        };
    } else if (logo && logo.outterLink) {
        navbarBrandProps = {
            href: logo.outterLink,
            target: "_blank"
        };
    }
    return (
        <Navbar
            className="navbar-vertical fixed-left navbar-light bg-white"
            expand="md"
            id="sidenav-main"
        >
            <Container fluid>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={LinkHandler}
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <LogoComponent {...navbarBrandProps} {...logo} />
                <UserDropdown/>
                <Collapse {...location} logo={logo} CollapseToggler={LinkHandler} isOpen={isCollapsed} />
            </Container>
        </Navbar>
    )
}