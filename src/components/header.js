import React from 'react'
import { Link, StaticQuery } from 'gatsby'
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

import Search from "./search"

import graphql from 'gatsby'
import Navcomponent from './Navcomponent'

const Header = () => (
  <div>
    <StaticQuery
    query={graphql`
      query SearchIndexQuery {
        siteSearchIndex {
          index
        }
      }
    `}
    render={data => (
      <header>
        ... header stuff...
        <Search searchIndex={data.siteSearchIndex.index} />
      </header>
    )}
  />
  <Jumbotron color = 'red' style={{paddingBottom: '0px'}}>
    <Link to="/"
      style={{
        color: 'black',
        textDecoration: 'none',
      }}
    >
       <h1 className="display-3"> Bradford Condon, PhD</h1>
       <p className="lead">Bionformatics, Data Science, Web & Mobile Development</p>
        </Link>
    <Navcomponent/>
    </Jumbotron>
    </div>
);

export default Header
