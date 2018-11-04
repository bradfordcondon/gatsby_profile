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
            paddingLeft: '30px',
            paddingTop: '5px'

          }} key={node.id}>
          <Link to={node.fields.slug} className={css `
                text-decoration: none;
                color: inherit;
              `}>
            <h3 >
              {node.frontmatter.title}
            </h3>
            <span className={css `
                    color: #bbb;
                  `} style={{
                margin: '1px'
              }}>
              <h4>
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
              </h4>
            </span>
            <p>{node.excerpt}</p>
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
