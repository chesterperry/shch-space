import * as React from "react"

import LayoutGrid from "../components/layoutGrid"
import Seo from "../components/seo"
import { graphql, Link } from "gatsby"
import { ImagePreview } from "../components/imagePreview"

export default function Grid({ data }) {
  const project = data.allGoogleProjectsSheet.nodes[0]
  return (
    <LayoutGrid>
      <div className="draw-grid-40 min-h-screen w-screen flex">
        <div className="p-2.5 w-1/2">
          <div className="grid w-full  grid-cols-2 flex-none">
            <div className="h-40 col-span-2">
              <h3 className="h-15">
                <Link className=" no-underline hover:underline" to="/projects/">
                  ПРОЕКТЫ ←
                </Link>
              </h3>

              <h1 className="h-30">{project.project}</h1>
            </div>
            <div className="h-40 md:col-span-1  md:row-span-1">
              <h4 className="h-5">ПЕРИОД</h4>
              <h4 className="mb-12">{project?.year}</h4>
            </div>
            <div className="h-40 md:col-span-1  md:row-span-1">
              <h4 className="h-5">РОЛЬ</h4>
              <span className="mb-12">{project?.role}</span>
            </div>
            {project?.designer && (
              <div className=" flex flex-col md:basis-1/2	h-45 ">
                <h4 className="basis-1/3 h-15">ДИЗАЙН / ИДЕЯ</h4>
                <span className="basis-2/3 h-30">{project?.designer}</span>
              </div>
            )}
            {project?.participants && (
              <div className="  flex flex-col md:basis-1/2	">
                <h4 className="basis-1/3">УЧАСТНИКИ</h4>
                <span className="basis-2/3">{project?.participants}</span>
              </div>
            )}
          </div>
          {project?.comment && (
            <div className="overflow-visible">
              <h4 className="basis-1/3">КОММЕНТАРИЙ</h4>
              <p className="basis-2/3 ">{project?.comment}</p>
              <p className="basis-2/3 ">{project?.comment}</p>
              <p className="basis-2/3 ">{project?.comment}</p>
            </div>
          )}
        </div>
        <div className="p-2.5 max-h-screen w-full  grid-cols-2 grid-rows-5 grid-flow-row-dense md:grid hidden md:basis-1/2">
          <div className="col-span-2   flex flex-col "></div>
          <div className="col-span-2 row-span-3 grid ">
            <ImagePreview imageName={project?.image1} />
          </div>
          <div className="col-span-2 "></div>
        </div>
      </div>
    </LayoutGrid>
  )
}

export const Head = ({ data }) => {
  const project = data.allGoogleProjectsSheet.nodes[0]
  return <Seo title={`ПРОЕКТ | ${project.project} | Oleg Scherbinin`} />
}

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
        comment
        designer
        participants
      }
    }
  }
`
