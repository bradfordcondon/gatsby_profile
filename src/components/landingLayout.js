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

const Layout = ({ children, landing }) => (
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
              content: 'Bradford Condon PhD is a web developer located in Lexington, KY.',
            },
            {
              name: 'keywords',
              content: 'scientist, web-dev, blog, bradford, condon',
            },
          ]}
        >
          <html lang="en" />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.0.0/themes/algolia-min.css"
          />
        </Helmet>
          <div>
            {children}
            <MyFooter landing={landing} />
          </div>
        
      </div>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
