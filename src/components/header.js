import React from 'react'
import { Link, StaticQuery } from 'gatsby'
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
      <div
        id={'bc-header'}
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
                Bradford Condon, PhD
              </h1>
              <p className="lead">
                Web Development, Bionformatics, Data Science
              </p>
            </Link>
            <Search searchIndex={data.siteSearchIndex.index} />
          </div>
          <Navcomponent />
        </div>
      </div>
    )}
  />
)

export default Header
