import React from 'react'
import { Link } from 'gatsby'
import {
  Collapse,
  Jumbotron,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from "reactstrap";

import Navcomponent from './Navcomponent'

const Header = () => (
  <div>
  <Jumbotron>
    <div
      style={{
        margin: '0 auto',
        maxWidth: 980,
        padding: '1.45rem 1.0875rem',
      }}
   >
       <h1 className="display-3"> Bradford Condon, PhD</h1>
       <p className="lead">Bionformatics, Data Science, Web & Mobile Development</p>

        <Link to="/"
          style={{
            color: 'black',
            textDecoration: 'none',
          }}
        >
        </Link>
      <span></span>
    </div>
    <Navcomponent/>
    </Jumbotron>
    </div>
);

export default Header
