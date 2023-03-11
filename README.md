
You're forking my site to build your own?  That's fine, godspeed.

# Gatsby

I switched from Jekyll to Gatsby a while back.  I'm really not sure that was the right move, but here we are.

### Building and deploying

This your first time?

1. clone the repo
2. run `npm i`.  this installs the dependencies such as gatbsy, react, etc.
3. To start developing and building the site, run `npm run develop`.
4.  To deploy changes, execute:  `npm run deploy`.  
5.  If you want to get fancy, set up CI to run deploy for you when you push code changes back to the remote.


## Upgrading gatsby from 2 to 4

```
npm install gatsby-plugin-catch-links@latest gatsby-plugin-manifest@latest gatsby-image@latest node-sass@latest gatsby-remark-prismjs@latest gatsby-transformer-sharp@latest gatsby-plugin-sharp@latest gatsby-plugin-sass@latest bootstrap@latest 
 
 
  npm install  gatsby-plugin-google-analytics@latest gatsby-plugin-offline@latest  gatsby-plugin-react-helmet@latest  gatsby-plugin-typography@latest  gatsby-source-filesystem@latest  gatsby-transformer-remark@latest


```

gatsby-image@3.11.0: gatsby-image is now gatsby-plugin-image

After the above update of doom, i needed to add an icon to my `package.json`, I went ahead and grabbed a [free one from icons8](https://icons8.com/) .I needed it because of `gatsby-plugin-manifest` which appears to provide features very far removed from necessary for a personal blog site.



