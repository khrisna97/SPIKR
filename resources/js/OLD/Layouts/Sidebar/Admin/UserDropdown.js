import React from "react";
import {Nav, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import {Link} from "react-router-dom";
import {Logout} from "../../../api";
export default ()=>{
    return (
        <Nav className="align-items-center d-md-none">
            <UncontrolledDropdown nav>
                <DropdownToggle nav className="nav-link-icon">
                    <i className="ni ni-bell-55" />
                </DropdownToggle>
                <DropdownMenu
                    aria-labelledby="navbar-default_dropdown_1"
                    className="dropdown-menu-arrow"
                    right
                >
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem>Another action</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Something else here</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav>
                <DropdownToggle nav>
                  {/*  <Media className="align-items-center">*/}
                  {/*<span className="avatar avatar-sm rounded-circle">*/}
                  {/*  <img*/}
                  {/*      alt="..."*/}
                  {/*      src={require("../../../img/theme/team-1-800x800.jpg")}*/}
                  {/*  />*/}
                  {/*</span>*/}
                  {/*  </Media>*/}
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
                    <DropdownItem onClick={() =>Logout() }>
                        <i className="ni ni-user-run" />
                        <span>Logout</span>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        </Nav>
    )
}