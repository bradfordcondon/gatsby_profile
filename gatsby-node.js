const path = require(`path`)
const _ = require("lodash")

const { createFilePath } = require(`gatsby-source-filesystem`)


exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions


  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const tagTemplate = path.resolve("src/templates/tags.js")
  const blogPostTemplate = path.resolve("src/templates/blog-post.js")

  return new Promise((resolve, reject) => {
    graphql(`
      {
          allMarkdownRemark {
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

  posts.forEach(({ node }) => {
     createPage({
       path: node.fields.slug,
       component: blogPostTemplate,
       context: {
         // Data passed to context is available
         // in page queries as GraphQL variables.
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
