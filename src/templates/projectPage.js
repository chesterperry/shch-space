import * as React from "react"

import LayoutGrid from "../components/layoutGrid"
import Seo from "../components/seo"
import { graphql, Link } from "gatsby"
import { ImagePreview } from "../components/imagePreview"

export default function Grid({ data }) {
  const project = data.allGoogleProjectsSheet.nodes[0]
  console.log(project, query)
  return (
    <LayoutGrid>
      <div className="h-screen w-screen grid md:grid-cols-2 grid-cols-1 grid-flow-col-dense draw-grid-40">
        <div className="p-2.5 h-screen w-full grid grid-cols-2 grid-rows-5 grid-flow-row-dense ">
          <div className="col-span-2   flex flex-col">
            <h3 className="basis-2/3">
              <Link
                className=" no-underline hover:underline"
                to="/projects/"
              >
                ПРОЕКТЫ
              </Link>
            </h3>

            <h1 className="basis-1/3">{project.project}</h1>
          </div>

          <div className="  flex flex-col">
            <h4 className="basis-1/3">ПЕРИОД</h4>
            <span className="basis-2/3">{project?.year}</span>
          </div>
          <div className="  flex flex-col">
            <h4 className="basis-1/3">РОЛЬ</h4>
            <span className="basis-2/3">{project?.role}</span>
          </div>
          <div className=" flex flex-col">
            <h4 className="basis-1/3">ДИЗАЙНЕР</h4>
            <span className="basis-2/3">{project?.designer}</span>
          </div>
          <div className="  flex flex-col">
            <h4 className="basis-1/3">УЧАСТНИКИ</h4>
            <span className="basis-2/3">{project?.participants}</span>
          </div>

          <div className="col-span-2 row-span-2 flex flex-col">
            <h4 className="basis-1/3">КОММЕНТАРИЙ</h4>
            <span className="basis-2/3">{project?.comment}</span>
          </div>
        </div>
        <div className="p-2.5 h-screen w-full  grid-cols-2 grid-rows-5 grid-flow-row-dense md:grid hidden">
          <div className="col-span-2   flex flex-col ">
            <h3 className="basis-2/3">SWCTION</h3>

            <h1 className="basis-1/3">GRID</h1>
          </div>
          <div className="col-span-2 row-span-3 grid ">
            <ImagePreview imageName={project?.image1} />
          </div>
          <div className="col-span-2 ">009</div>
        </div>
      </div>
    </LayoutGrid>
  )
}

export const Head = () => <Seo title="Test:grid" />

export const query = graphql`
  query ($id: String) {
    allGoogleProjectsSheet(filter: { id: { eq: $id } }) {
      nodes {
        id
        image1
        object
        project
        role
        roleCode
        year
      }
    }
  }
`
