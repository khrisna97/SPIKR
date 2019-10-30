import React, {useState} from "react";
import {
    Collapse, DropdownItem, DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    UncontrolledDropdown
} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBars,
    faBriefcaseMedical, faComment, faEnvelope,
    faSignOutAlt,
    faUser,
    faUserCog,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";

import useRouter from "../../Hooks/Router";
import {logout} from "../../Api/allroles";
import withSizes from "react-sizes";
import UserListDrawer from "../../Component/UserListDrawer";
import AppHeader from "../../Component/AppHeader";
const mapSizesToProps = ({ width }) => ({
    isMobile: width < 768,
});

export default withSizes(mapSizesToProps)((prop)=>{
    const [ddOpen, setddOpen] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);

    const Toggle = (custom)=>{
        if (custom && typeof custom === "boolean"){
            setddOpen(custom);
        }else{
            setddOpen(! ddOpen && prop.isMobile);
        }
        setOpenDrawer(false);
    };

    const {history} = useRouter();

    const Navigation = (e)=>{
        const {target} = e;
        const path = target.getAttribute('path');
        e.preventDefault();
        console.log(target);
        if (path){
            Toggle();
        }
        history.push(path);
    };

    return <React.Fragment>

        <UserListDrawer otherSetter={Toggle} open={openDrawer} />

        <Navbar fixed='top' color="" className='bg-translucent-primary' expand="md">
            <div className="container">
                <NavbarBrand  onClick={Navigation} path={''} className='text-white pointer font-weight-900' >
                    <h1 onClick={()=>history.push('/')} className='text-white'>
                        <AppHeader />
                    </h1>
                </NavbarBrand>
                <NavbarToggler onClick={Toggle} >
                    <FontAwesomeIcon icon={faBars} />
                </NavbarToggler>
                <Collapse isOpen={ddOpen && prop.isMobile} navbar>
                    <Nav navbar className='text-dark'>
                        <NavItem >
                            <NavLink onClick={Navigation} path={'../chat/kelompok'} className='d-flex' href="/components/">
                                <FontAwesomeIcon icon={faUsers} className={'mr-2'} />
                                Group chat
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <Nav navbar className='text-dark'>
                        <NavItem >
                            <NavLink onClick={Navigation} path={'../konseling'} className='d-flex' href="/components/">
                                <FontAwesomeIcon icon={faComment} className={'mr-2'} />
                                Konseling
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink className='d-flex ' onClick={Navigation} path={'../kelompok'}>
                                <FontAwesomeIcon icon={faUsers} className={'mr-2'} />
                                Kelompok
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className='d-flex ' onClick={Navigation} path={'../laporan'}>
                                <FontAwesomeIcon icon={faBriefcaseMedical} className={'mr-2'} />
                                Laporan
                            </NavLink>
                        </NavItem>
                        <UncontrolledDropdown  nav inNavbar>
                            <DropdownToggle nav className='d-flex'>
                                <FontAwesomeIcon icon={faUser} className='mr-2' />
                                Akun
                            </DropdownToggle>
                            <DropdownMenu className='bg-light' right>
                                <DropdownItem onClick={Navigation} path={'../pengaturan/akun'}>
                                    <FontAwesomeIcon icon={faUserCog} className={'mr-2'}  />
                                    Pengaturan akun
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={()=>{
                                    logout()
                                }}>
                                    <FontAwesomeIcon icon={faSignOutAlt} className={'mr-2'} />
                                    Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </div>
        </Navbar>
    </React.Fragment>
})