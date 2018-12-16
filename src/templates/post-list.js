import React, { Component } from "react"
import {css} from "react-emotion"
import {Link, graphql} from "gatsby"
import Layout from "../components/layout"
import {
  Badge,
  Col,
  Row,
  Card,
  CardImg,
  CardTitle,
  CardBody,
  CardSubtitle,
  CardText
} from "reactstrap";


export default class PostList extends Component {
  render(){
    console.log(this.props)

//export default(page) => {
//  const data = page.data
const data = this.props.data
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
  //Page location
 const { currentPage, numPages } = this.props.pageContext
 const isFirst = currentPage === 0
 const isLast = currentPage === numPages
 const prevPage = currentPage - 1 === 0 ? "/" : (currentPage - 1).toString()
 const nextPage = (currentPage + 1).toString()

  return (<Layout>
    <Row>
      <Col md="3">
        <Card className={'mb-4'}>
          <CardImg style={{
              maxWidth: 250,
              margin: '0 auto'
            }} src="/img/condon_face.jpg" alt="Bradford Condon PhD"/>
          <CardBody>
            <CardText>Hello! I am a full stack web/mobile developer, data scientist, and bionformatician.</CardText>
            <CardText>If you're looking for
              <b>Tripal</b>
              help, you're in the right place.</CardText>
          </CardBody>
        </Card>
      </Col>

      <Col md="9">
        {
          data.allMarkdownRemark.edges.map(({node}) => (<Card className={"mb-4"} key={node.id}>
            <Link to={node.fields.slug} style={{
                textDecoration: 'none',
                color: 'inherit'
              }}>
              <div className="card-header px-3">
                {node.frontmatter.title}
              </div>
              <div className="p-3">
                <div className={'mb-2'} style={{
                    color: '#bbb'
                  }}>
                  <span className="mr-2">{node.frontmatter.date}</span>
                  <div className={'float-right'}>
                    {
                      node.frontmatter.tags
                        ? node.frontmatter.tags.map(function(name, index) {

                          let color = colorBadge[name]
                            ? colorBadge[name]
                            : "secondary"

                          return (<Badge key={index} style={{
                              margin: '0 2px'
                            }} color={color}>
                            {name}
                          </Badge>)
                        })
                        : ''
                    }
                  </div>
                </div>
                <div className="card-text">
                  <p>{node.excerpt}</p>
                </div>
              </div>
            </Link>
          </Card>))
        }
        {!isFirst && (
            <Link to={`/blog/${prevPage}`} rel="prev">
              ← Previous Page
            </Link>
          )}
          {Array.from({ length: numPages }, (_, i) => (
            <Link key={`pagination-number${i}`} to={`blog/${i === 0 ? "" : i}`}>
              {i + 1}
            </Link>
          ))}

          {!isLast && (
            <Link to={`/blog/${nextPage}`} rel="next">
              Next Page →
            </Link>
          )}
      </Col>
    </Row>
  </Layout>)
}
}

export const pagesQuery = graphql `
  query pagesQuery ($skip: Int!, $limit: Int!){
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
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
