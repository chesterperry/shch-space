/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */

const path = require("path")
const postTemplate = path.resolve(`./src/templates/mdx-layout.jsx`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  })

  const result = await graphql(`
    query {
      allMdx {
        nodes {
          id
          frontmatter {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild("Error loading MDX result", result.errors)
  }

  // Create blog post pages.
  const posts = result.data.allMdx.nodes

  // you'll call `createPage` for each result
  posts.forEach(node => {
    createPage({
      // As mentioned above you could also query something else like frontmatter.title above and use a helper function
      // like slugify to create a slug
      path: `/notes/${node.frontmatter.slug}`,
      // Provide the path to the MDX content file so webpack can pick it up and transform it into JSX
      component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      // You can use the values in this context in
      // our page layout component
      context: { id: node.id },
    })
  })

  const queryGS = await graphql(`
  query GPNodes {
    allGoogleProjectsSheet(filter: {status: {eq: "publish"}}, sort: {year: DESC}) {
      edges {
        next {
          slug
          project
        }
        previous {
          slug
          project
        }
        node {
          id
          slug
        }
      }
    }
  }
  `)

  const projectPages = queryGS.data.allGoogleProjectsSheet.edges
  projectPages.forEach(edge => {
    createPage({
      // As mentioned above you could also query something else like frontmatter.title above and use a helper function
      // like slugify to create a slug
      path: "/projects/" + edge.node.slug,
      // Provide the path to the MDX content file so webpack can pick it up and transform it into JSX
      component: require.resolve("./src/templates/projectPage.js"),
      // You can use the values in this context in
      // our page layout component
      context: {
        id: edge.node.id,
        previousSlug: edge?.previous?.slug || null,
        previousProject: edge?.previous?.project || null,
        nextSlug: edge?.next?.slug || null,
        nextProject: edge?.next?.project || null,
      },
    })
  })
}
