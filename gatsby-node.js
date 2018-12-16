const path = require(`path`)
const _ = require("lodash")

const {createFilePath} = require(`gatsby-source-filesystem`)
const createPaginatedPages = require("gatsby-paginate");

exports.onCreateNode = ({node, getNode, actions}) => {
    const {createNodeField} = actions
    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({node, getNode, basePath: `pages`})
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        })
    }
}

exports.createPages = ({graphql, actions}) => {
    const {createPage} = actions
    const tagTemplate = path.resolve("src/templates/tags.js")
    const blogPostTemplate = path.resolve("src/templates/blog-post.js")
    const listPage = path.resolve("src/templates/post-list.js")

    return new Promise((resolve, reject) => {
        graphql(`
      {
          allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 1000
            ) {
            edges {
              node {
                frontmatter{
                  tags
                }
                fields {
                  slug
                }
              }
            }
          }
        }
    `
        ).then(result => {
            if (result.errors) {
                return Promise.reject(result.errors)
            }
            const posts = result.data.allMarkdownRemark.edges
            const postsPerPage = 6
            const numPages = Math.ceil(posts.length / postsPerPage)
            Array.from({ length: numPages }).forEach((_, i) => {
              createPage({
                          path: i === 0 ? `/blog` : `/blog/${i}`,
                          component: listPage,
                          context: {
                            limit: postsPerPage,
                            skip: i * postsPerPage,
                            numPages,
                            currentPage: i
                          },
                        })})

            posts.forEach(({node}) => {
                createPage({
                    path: node.fields.slug,
                    component: blogPostTemplate,
                    context: {
                        slug: node.fields.slug,
                    },
                })
            })

            // Tag pages:
            let tags = []
            // Iterate through each post, putting all found tags into `tags`
            _.each(posts, edge => {
                if (_.get(edge, "node.frontmatter.tags")) {
                    tags = tags.concat(edge.node.frontmatter.tags)
                }
            })
            // Eliminate duplicate tags
            tags = _.uniq(tags)
            // Make tag pages
            tags.forEach(tag => {
                createPage({
                    path: `/tags/${_.kebabCase(tag)}/`,
                    component: tagTemplate,
                    context: {
                        tag,
                    },
                })
            })
            resolve()
        })
    })
}
