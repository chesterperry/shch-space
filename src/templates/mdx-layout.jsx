import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { Link } from "gatsby"
import LayoutGrid from "../components/layout.grid"

const shortcodes = { Link } // Provide common components here

export default function PageTemplate({ data, children }) {
  return (
    <LayoutGrid>
      <div className="draw-grid-40 min-h-fit w-screen flex justify-center">
        <div className="p-2.5 md:p-10 w-full md:max-w-4xl">
          <div className="grid w-full  md:grid-cols-1 grid-cols-1 flex-none">
            <div className="h-60 md:col-span-1 col-span-1 ">
              <h3 className="h-16">
                <Link className=" no-underline hover:underline" to="/notes/">
                  ЗАПИСИ ←
                </Link>
              </h3>

              <h1 className="h-32">{data.mdx.frontmatter.title}</h1>
            </div>
            <div className="flex col-span-1 md:col-span-2 flex-col"><MDXProvider components={shortcodes}>{children}</MDXProvider></div>
          </div>
        </div>
      </div>
    </LayoutGrid>
  )
}

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
      }
    }
  }
`
