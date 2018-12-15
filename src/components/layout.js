import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {StaticQuery, graphql} from 'gatsby'
import '../layout/bootstrap.min.css';

import Header from './header'
import '../layout/theme.scss'
import "../layout/index.scss";
import "../layout/global.scss";
import MyFooter from './footer'

const Layout = ({children}) => (<StaticQuery query={graphql `
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `} render={data => (<> < Helmet title = {
    data.site.siteMetadata.title
  }
  meta = {
    [
      {
        name: 'description',
        content: 'Sample'
      }, {
        name: 'keywords',
        content: 'sample, something'
      }
    ]
  } > <html lang="en"/>
</Helmet>
<Header siteTitle={data.site.siteMetadata.title}/>
<div class="container" style={{justifyContent: 'center'}}>
    {children} </div>
        <MyFooter/> </>)}
          />)

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
