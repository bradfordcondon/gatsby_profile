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
        className={'jumbotron pb-0 pt-3'}
      >

        <div className="container header-container">
            <div className="d-flex justify-content-between" > 
            <img className="header-img .ml-auto" src="img/condon_logo_clear.png"></img>

            
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
        
      </div>
    )}
  />
)

export default Header
