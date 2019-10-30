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
    faBriefcaseMedical, faComment, faEnvelope, faHome,
    faSignOutAlt,
    faUser,
    faUserCog,
    faUsers,
    faUsersCog
} from "@fortawesome/free-solid-svg-icons";

import useRouter from "../../Hooks/Router";
import {logout} from "../../Api/allroles";
import AppHeader from "../../Component/AppHeader";

export default ()=>{
    const [ddOpen, setddOpen] = useState(false);

    const Toggle = ()=>{
        setddOpen(!ddOpen);
    };

    const {history} = useRouter();

    const Navigation = (e)=>{
        const {target} = e;
        e.preventDefault();
        const path = target.getAttribute('path');
        if (path){
            Toggle();
        }

        history.push(path);
    };

    return <React.Fragment>
        <Navbar fixed='top' color="" className='bg-translucent-primary' expand="md">
            <div className="container">
                <NavbarBrand  onClick={Navigation} path={''} className='text-white pointer font-weight-900' >
                    <h1 onClick={()=>history.push('/')} className='text-white'>
                        <AppHeader />
                    </h1>
                </NavbarBrand>
                <NavbarToggler onClick={Toggle} >
                    <FontAwesomeIcon className={'text-white'} icon={faBars}/>
                </NavbarToggler>
                <Collapse isOpen={ddOpen} navbar>
                    <Nav navbar className='text-dark'>
                        <NavLink
                            onClick={Navigation}
                            path={'../'}
                            className='d-flex' href="/components/">
                            <FontAwesomeIcon icon={faHome} className={'mr-2'} />
                            Dashboard
                        </NavLink>
                        <NavItem >
                            <NavLink onClick={Navigation} path={'../chat/kelompok'} className='d-flex' href="/components/">
                                <FontAwesomeIcon icon={faUsers} className={'mr-2'} />
                                Group chat
                            </NavLink>
                        </NavItem>
                        <NavItem >
                            <NavLink onClick={Navigation} path={'../konseling'} className='d-flex' href="/components/">
                                <FontAwesomeIcon icon={faComment} className={'mr-2'} />
                                Chat konselor
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <Nav className="ml-auto" navbar>
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
}