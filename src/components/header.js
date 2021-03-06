import React from 'react'
import { Link, StaticQuery } from 'gatsby'
import {
  Jumbotron,
  InputGroup,
  InputGroupAddon,
  Form,
  Input,
  Button,
} from 'reactstrap'

import Search from './search'

import { graphql } from 'gatsby'
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
      <Jumbotron
        className={'pb-0 pt-3 border-bottom'}
        style={{ borderColor: '#ccc' }}
      >
        <div className="container">
          <div className="d-flex justify-content-between">
            <Link
              to="/"
              style={{
                color: 'black',
                textDecoration: 'none',
              }}
            >
              <h1 className="display-6 font-weight-bold">
                {' '}
                Bradford Condon, PhD
              </h1>
              <p className="lead">
                Bionformatics, Data Science, Web & Mobile Development
              </p>
            </Link>
            <Search searchIndex={data.siteSearchIndex.index} />
          </div>
          <Navcomponent />
        </div>
      </Jumbotron>
    )}
  />
)

export default Header
