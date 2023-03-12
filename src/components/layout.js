import React from 'react'
import PropTypes from 'prop-types'
import Helmet  from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import '../layout/variables.scss'
import 'bootstrap/scss/bootstrap.scss'
import '../layout/theme.scss'
import '../layout/index.scss'
import '../layout/global.scss'
import MyFooter from './footer'


const MyHelmet = props => {

  <Helmet
  title={"Bradford Condon PhD"}
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
  <link rel="stylesheet" 
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</Helmet>


} 

export {MyHelmet};

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
        <MyHelmet data={data}/>
        
        {landing == true ? 
        // Landing just reuse the site template stuff
          <div>
              <Header siteTitle={data.site.siteMetadata.title} />
            {children}
            <MyFooter landing={landing} />
          </div>
          :
          <>
            <Header siteTitle={data.site.siteMetadata.title} />
            <div className="container" style={{ justifyContent: 'center' }}>
              {children}
            </div>
            <MyFooter landing={landing} />

          </>
        }

      </div>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
