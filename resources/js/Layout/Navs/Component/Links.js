import React from 'react';
import {NavItem, NavLink} from 'reactstrap';
import {Redirect} from 'react-router-dom'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import RouterHook from '../../../Hooks/Router';


export default ({Routes})=>{
    const {location, history} = RouterHook();
    const {pathname} = location;
    return(<React.Fragment>
        {
              Routes.map(({Path, Icon, Label,Hidden}, key)=>!Hidden ?
                <NavItem key={key} active={pathname.trim() === Path}>
                    <NavLink onClick={()=>{
                        history.push(Path)
                    }} to={Path} className={'nav-link navbar-toggle text-uppercase pb-2'}>
                        <span>
                            <FontAwesomeIcon icon={Icon} className='mr-2' />
                            {Label}
                        </span>
                    </NavLink>
                </NavItem> : undefined
              )
        }
    </React.Fragment>)}