import React from 'react'
import {Link} from 'gatsby'
import {Navbar, NavbarBrand, Nav, NavItem, NavLink} from "reactstrap";

const Navcomponent = () => (<div>
  <Navbar light="light" expand="md" style={{display: 'flex', justifyContent: 'center'}}>
    <NavbarBrand href="/">Home</NavbarBrand>
    <NavbarBrand href="/tags">All Post Tags</NavbarBrand>
    <NavbarBrand href="/tags/tripal/">Tripal Posts</NavbarBrand>
    <NavbarBrand href="/cv">CV</NavbarBrand>
  </Navbar>
</div>);

export default Navcomponent
