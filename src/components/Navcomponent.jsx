import React from 'react'
import {Nav, NavItem, NavLink} from "reactstrap";

function isActive(path) {
    if (path === '/' && typeof window !== 'undefined' && window.location.pathname.length === 0) {
        return true
    }
if (typeof window !== 'undefined'){
  return window.location.pathname === path
}
}

const NavComponent = () => (
    <div className="">
        <Nav className={'nav-tabs ml-0 text-large'}>
            <NavItem>
                <NavLink href={'/'} className={isActive('/') ? 'active' : ''}>Home</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/tags" className={isActive('/tags') ? 'active' : ''}>All Post Tags</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/tags/tripal" className={isActive('/tags/tripal') ? 'active' : ''}>Tripal
                    Posts</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/cv" className={isActive('/cv') ? 'active' : ''}>CV</NavLink>
            </NavItem>
        </Nav>
    </div>
);

export default NavComponent
