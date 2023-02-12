/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Oleg Scherbinin Space`,
    description: ``,
    author: `@olegscherbinin`,
    siteUrl: `https://olegscherbinin.com/`,
  },
  plugins: [
    {
      resolve: 'gatsby-source-google-spreadsheets',
      options: {
        spreadsheetId: '1jUe-z_gbKj5G6uyQ0Ib3C8zTZA9tLXoRssYop0TYO4M',
        // apiKey: 'AIzaSyCmGBALyn4XbjiqYZlLfTPHYUoHfGIkhRc',
        credentials: require(`./oleg-scherbinin-project-15aca17500ca.json`)
      }
    },
    'gatsby-plugin-postcss',
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`,
      },
    },
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/src/posts`,
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },

    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
  ],
}
