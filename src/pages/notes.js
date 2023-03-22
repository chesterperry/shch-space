import * as React from "react"

import LayoutGrid from "../components/layoutGrid"
import Seo from "../components/seo"
import { Link } from "gatsby"
import { graphql, useStaticQuery } from "gatsby"
import { ImagePreview } from "../components/imagePreview"
import { useState } from "react"

const ProjectsList = () => {
  const [noteDetails, setNoteDetails] = useState(null)

  const { allMdx } = useStaticQuery(graphql`
    query ListNotes {
      allMdx {
        nodes {
          excerpt
          id
          frontmatter {
            title
            slug
          }
        }
      }
    }
  `)
  return (
    <LayoutGrid>
      <div className=" w-screen draw-grid-20 flex flex-row justify-center">
        <div className="p-2.5  md:p-10  md:basis-1/2 grid grid-rows-5 max-w-2xl">
          <div className="flex flex-col">
            <h3 className="h-16">
              <Link className=" no-underline hover:underline" to="/">
                INDEX ←
              </Link>
            </h3>
            <h1 className="h-32">ЗАПИСИ</h1>
          </div>
          <div className="col-span-2 mb-12">
            Короткое описание почему эти проекты здесь, возможно в будущем часть
            из них будет не актуальна для презентации вместе с обновлениями,
            работа в процессе
          </div>
          <div className="col-span-2 md:row-span-3 row-span-3">
            {allMdx.nodes.map(data => (
              <Link
                className="no-underline "
                to={`/notes/${data.frontmatter.slug}`}
              >
                <div
                  key={data.id}
                  onMouseOver={() => 
                    setNoteDetails({excerpt: data.excerpt, title:data.frontmatter.title})
                  }
                  onMouseLeave ={() => setNoteDetails(null)}
                  className="text-lg h-8 hover:underline  hover:decoration-3 mr-3 underline-offset-2"
                >
                  <p>{data.frontmatter.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="p-2.5  md:p-10 md:grid grid-cols-2 grid-rows-5 grid-flow-row-dense md:basis-1/2 hidden max-w-3xl">
          <div className="col-span-2   flex flex-col "></div>
          <div className="col-span-2 row-span-3 flex flex-col align-text-top ">
            <h4 className="">{noteDetails && noteDetails.title}</h4>
            <p>{noteDetails && noteDetails.excerpt}</p>
          </div>
          <div className="col-span-2 "></div>
        </div>
      </div>
    </LayoutGrid>
  )
}

export const Head = () => {
  return <Seo title={`ПРОЕКТЫ | Oleg Scherbinin`} />
}
export default ProjectsList
