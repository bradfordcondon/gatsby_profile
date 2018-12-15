require('dotenv').config({
    path: `.env`,
});

const myQuery = `{
  allSitePage {
    edges {
      node {
        # try to find a unique id for each node
        # if this field is absent, it's going to
        # be inserted by Algolia automatically
        # and will be less simple to update etc.
        objectID: id
        component
        path
        componentChunkName
        jsonName
        internal {
          type
          contentDigest
          owner
        }
      }
    }
  }
}`;

const queries = [
    {
        query: myQuery,
        transformer: ({data}) => data.allSitePage.edges.map(({node}) => node), // optional
        indexName: process.env.ALGOLIA_INDEX_NAME, // overrides main index name, optional
    },
];

module.exports = {
    siteMetadata: {
        title: 'Bradford Condon, PhD',
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        `gatsby-plugin-catch-links`,
        `gatsby-plugin-sass`,
        {
            resolve: `gatsby-plugin-typography`,
            options: {
                pathToConfigModule: `src/utils/typography.js`,
            },
        },
      },
          'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
      },
    },
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
            options: {
                // Fields to index
                fields: [
                    'title',
                    'tags',
                ],
                // How to resolve each field's value for a supported node type
                resolvers: {
                    // For any node of type MarkdownRemark, list how to resolve the fields' values
                    MarkdownRemark: {
                        title: node => node.frontmatter.title,
                        tags: node => node.frontmatter.tags,
                        path: node => node.frontmatter.path
                    },
                },
              },
            },
    'gatsby-plugin-offline',
  ],
}
