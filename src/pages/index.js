import React, {useState} from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import {
  Badge,
  Col,
  Row,
  Card,
  CardImg,
  CardBody,
  CardSubtitle,
  CardText,
} from 'reactstrap'

export default page => {
  const data = page.data


  const badgeTypes = [
    'primary', 'success', 'danger', 'info', 'light', 'dark', 'warning'
  ]

  const [badgeMap, setBadge] = useState({});



  return (
    <Layout>
      <Row>
        <Col md="3">
          <Card className={'mb-4'}>
            <CardImg
              style={{ maxWidth: 250, margin: '0 auto' }}
              src="/img/condon_face.jpg"
              alt="Bradford Condon PhD"
            />
            <CardBody>
              <CardText>
                Hello! I am a full stack web/mobile developer, data scientist,
                and bionformatician.
              </CardText>
            </CardBody>
          </Card>
          <Card className={'mb-4'}>
            <CardBody>
              <CardText>
                I am currently the the Director of Technologies at CABEM Technologies.  CABEM is proudly in-house and US-based: please no soliciting.
              </CardText>
            </CardBody>
          </Card>
        </Col>

        <Col md="9">
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <Card className={'mb-4'} key={node.id}>
              <Link
                to={node.fields.slug}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="card-header px-3">{node.frontmatter.title}</div>
                <div className="p-3">
                  <div
                    className={'mb-2'}
                    style={{
                      color: '#bbb',
                    }}
                  >
                    <span className="mr-2">{node.frontmatter.date}</span>
                    <div className={'float-right'}>
                      {node.frontmatter.tags
                        ? node.frontmatter.tags.map(function(name, index) {
                          let color = null
                          if (!badgeMap[name]){
                            color =  badgeTypes[Math.floor(Math.random()*badgeTypes.length)];
                            badgeMap[name] = color
                            setBadge(badgeMap)
                          } else {
                            color = badgeMap[name]
                          }
                            return (
                              <Badge
                                key={index}
                                style={{ margin: '0 2px' }}
                                color={color}
                              >
                                {name}
                              </Badge>
                            )
                          })
                        : ''}
                    </div>
                  </div>
                  <div className="card-text">
                    <p>{node.excerpt}</p>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
          <Link to={`/blog/1`} rel="next">
            Read More Posts →
          </Link>
        </Col>
      </Row>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      limit: 6
      sort: { fields: [frontmatter___date], order: DESC }
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
