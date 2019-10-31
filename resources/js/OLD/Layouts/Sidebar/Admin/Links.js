// Create a link
/*
    @param routes object from routes.js
    @param CollapseToggle a stateChange from default exported states with useState Hook
 */
import React from "react";
import { NavLink as NavLinkRRD } from "react-router-dom";
import {NavLink , NavItem} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default  ({routes, CollapseToggler , currentPath}) => {
    return routes.map((prop, key) => {
        return prop.icon? (
            <NavItem key={key}>
                <NavLink
                    to={prop.path}
                    tag={NavLinkRRD}
                    onClick={CollapseToggler}
                    activeClassName=""
                    className={currentPath === prop.path?"active":""}
                >
                    <div className="row">
                        <div className="col-1">
                            {
                                prop.icon &&
                                <FontAwesomeIcon icon={prop.icon} className='mr-2' />
                            }
                        </div>
                        <div className="col">
                            {prop.name}
                        </div>
                    </div>
                </NavLink>
            </NavItem>
        ):"";
    });
};