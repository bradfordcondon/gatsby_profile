import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import '../layout/variables.scss'
import 'bootstrap/scss/bootstrap.scss'
import '../layout/theme.scss'
import '../layout/index.scss'
import '../layout/global.scss'
import MyFooter from './footer'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            {
              name: 'description',
              content: 'Sample',
            },
            {
              name: 'keywords',
              content: 'sample, something',
            },
          ]}
        >
          <html lang="en" />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.0.0/themes/algolia-min.css"
          />
        </Helmet>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div className="container" style={{ justifyContent: 'center' }}>
          {children}
        </div>
        <MyFooter />
      </div>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
