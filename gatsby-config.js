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
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/src/posts`,
                name: 'posts',
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            // Class prefix for <pre> tags containing syntax highlighting;
                            // defaults to 'language-' (eg <pre class="language-js">).
                            // If your site loads Prism into the browser at runtime,
                            // (eg for use with libraries like react-live),
                            // you may use this to prevent Prism from re-processing syntax.
                            // This is an uncommon use-case though;
                            // If you're unsure, it's best to use the default value.
                            classPrefix: "language-",
                            // This is used to allow setting a language for inline code
                            // (i.e. single backticks) by creating a separator.
                            // This separator is a string and will do no white-space
                            // stripping.
                            // A suggested value for English speakers is the non-ascii
                            // character '›'.
                            inlineCodeMarker: null,
                            // This lets you set up language aliases.  For example,
                            // setting this to '{ sh: "bash" }' will let you use
                            // the language "sh" which will highlight using the
                            // bash highlighter.
                            aliases: {},
                            // This toggles the display of line numbers alongside the code.
                            // To use it, add the following line in src/layouts/index.js
                            // right after importing the prism color scheme:
                            //  `require("prismjs/plugins/line-numbers/prism-line-numbers.css");`
                            // Defaults to false.
                            showLineNumbers: false,
                            // If setting this to true, the parser won't handle and highlight inline
                            // code used in markdown i.e. single backtick code like `this`.
                            noInlineHighlight: false,
                        },
                    },
                ],
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
        'gatsby-plugin-offline',
        {
            resolve: `gatsby-plugin-algolia`,
            options: {
                appId: process.env.ALGOLIA_APP_ID,
                apiKey: process.env.ALGOLIA_API_KEY,
                indexName: process.env.ALGOLIA_INDEX_NAME, // for all queries
                queries,
            },
        },
    ],
}
