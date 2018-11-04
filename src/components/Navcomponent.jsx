import React from 'react'
import { Link } from 'gatsby'
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from "reactstrap";

const Navcomponent = () => (
  <div>
  <Navbar light expand="md">
           <NavbarBrand href="/">Home</NavbarBrand>
             <Nav className="ml-auto" navbar>
               <NavItem>
                 <NavLink href="/components/">Posts</NavLink>
               </NavItem>
               <NavItem>
                 <NavLink href="/cv">CV</NavLink>
               </NavItem>
             </Nav>
         </Navbar>
  </div>
);

export default Navcomponent
