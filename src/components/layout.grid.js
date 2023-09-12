/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"

const LayoutGrid = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const currentYear = new Date(Date.now()).getFullYear()

  return (
<div className="flex flex-col h-full w-full min-h-screen dark:bg-neutral-900"> 
          <div className="fixed place-content-end "> <Header  siteTitle={data.site.siteMetadata?.title + '© '+ currentYear || `Title`} /></div> 
        <main className="flex flex-1 mt-6">{children}</main>
    </div>
  )
}

export default LayoutGrid
