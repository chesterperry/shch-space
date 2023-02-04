import * as React from "react"

import LayoutGrid from "../components/layout-grid"
import Seo from "../components/seo"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { graphql, useStaticQuery } from 'gatsby'


function Dino() {
  return (
    <StaticImage
      className=""
      src="../images/carhartt-wip.jpg"
      alt="carhartt-wip.jpg"
      placeholder="blurred"
      layout="fullWidth"
      transformOptions="fit"
    />
  )
}

function ProjectsList() {
  const data = useStaticQuery(graphql`
  query pageQuery {
    googleSheet {
      projects {
        id
        year
        roleCode
        project
        image1
        object
      }
    }
  }
  `)
  console.log(data);

  const list = [].map(data => (
    <div id={data.id} className="flex h-8 hover:underline hover:decoration-3 mr-3 underline-offset-2">
      <span className="basis-2/6 truncate">{data.googleSheet.projects.project}</span>
      <span className="basis-1/6">{data.year}</span>
      <span className="basis-2/6 truncate">{data.object}</span>
      <span className="basis-1/6 flex place-content-center">{data.role_acronym} </span>
    </div>
  ))
  return <>{list}</>
}

const Grid = () => (
  <LayoutGrid>
    <div className="h-screen w-screen grid md:grid-cols-2 grid-cols-1 grid-flow-col-dense draw-grid-4">
      <div className="p-2.5 h-screen w-full grid grid-cols-2 grid-rows-5 grid-flow-row-dense">
        <div className="col-span-2   flex flex-col">
          <h3 className="basis-2/3">РАЗДЕЛ</h3>

          <h1 className="basis-1/3">ПРОЕКТЫ</h1>
        </div>

        <div className="col-span-2 ">
          Короткое описание почему эти проекты здесь, возможно в будущем часть
          из них будет не актуальна для презентации вместе с обновлениями,
          работа в процессе
        </div>
        <div className="col-span-2 row-span-2 overflow-y-scroll">
          <ProjectsList volume={40} />
        </div>
      </div>
      <div className="p-2.5 h-screen w-full  grid-cols-2 grid-rows-5 grid-flow-row-dense md:grid hidden">
        <div className="col-span-2   flex flex-col "></div>
        <div className="col-span-2 row-span-3 grid ">
          {" "}
          <Dino />
        </div>
        <div className="col-span-2 ">009</div>
      </div>
    </div>
  </LayoutGrid>
)

export const Head = () => <Seo title="Test:grid" />

export default Grid
