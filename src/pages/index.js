import React from "react"
import {css} from "react-emotion"
import {Link, graphql} from "gatsby"
//import { rhythm } from "../utils/typography"
import Layout from "../components/layout"
import {Badge} from "reactstrap";

export default({data}) => {

  const colorBadge = {
    'drupal': "primary",
    'tripal': "success",
    'documentation': "danger",
    'chado': 'info',
    'databases': 'primary',
    'bioinformatics': 'light',
    'web-dev': 'warning',
    'travis-ci': 'dark',
    'd3': 'success',
    'mysql': "info"
  }

  return (<Layout>
    <div>
      {
        data.allMarkdownRemark.edges.map(({node}) => (<div class="card" style={{
            margin: '10px',
            width: '60rem'
          }} key={node.id}>
          <Link to={node.fields.slug} className={css `
                text-decoration: none;
                color: inherit;
              `}>
            <div class="card-header">
              {node.frontmatter.title}
            </div>
            <span className={css `
                    color: #bbb;
                  `} style={{
                marginLeft: '10px'
              }}>
              <div>
                {node.frontmatter.date}
                {
                  node.frontmatter.tags
                    ? node.frontmatter.tags.map(function(name, index) {

                      let color = colorBadge[name]
                        ? colorBadge[name]
                        : "secondary"

                      return <Badge style={{
                          marginLeft: '5px',
                          marginRight: '5px'
                        }} color={color}>{name}</Badge>;
                    })
                    : ''
                }
              </div>
            </span>
            <div class="card-text" style={{marginLeft: '10px'}}>
            <p>{node.excerpt}</p>
            </div>
          </Link>
        </div>))
      }
    </div>
  </Layout>)
}

export const query = graphql `
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            tags
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
