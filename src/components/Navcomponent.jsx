import React from 'react'
import { Link } from 'gatsby'
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

const Navcomponent = () => (
  <div>
  <Navbar light expand="md" display="flex">
           <NavbarBrand href="/">Home</NavbarBrand>
           <NavbarBrand href="/cv">CV</NavbarBrand>
         </Navbar>
  </div>
);

export default Navcomponent
