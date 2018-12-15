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

import {graphql} from 'gatsby'
import Navcomponent from './Navcomponent'

const Header = () => (
  <StaticQuery
  query={graphql`
    query SearchIndexQuery {
      siteSearchIndex {
        index
      }
    }
  `}
  render={data => (
    <div>
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
          <Search searchIndex={data.siteSearchIndex.index} />
        </Jumbotron>
      </div>

  )}
/>
  );

export default Header
