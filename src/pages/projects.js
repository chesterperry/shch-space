import * as React from "react"

import LayoutGrid from "../components/layoutGrid"
import Seo from "../components/seo"
import { Link } from "gatsby"
import { graphql, useStaticQuery } from "gatsby"
import { ImagePreview } from "../components/imagePreview"
import { useState } from "react"



const ProjectsList = () => {
  const [imageName, setImage] = useState(null)
  const { googleSheet } = useStaticQuery(graphql`
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

  return (
    <LayoutGrid>
      <div className=" h-screen w-screen draw-grid-20 grid md:grid-cols-2 grid-cols-1 grid-flow-col-dense ">
        <div className="p-2.5 h-screen w-full grid grid-cols-2 grid-rows-5 grid-flow-row-dense ">
          <div className="col-span-2 flex flex-col">
            <h3 className="basis-2/3">РАЗДЕЛ</h3>

            <h1 className="basis-1/3">ПРОЕКТЫ</h1>
          </div>

          <div className="col-span-2 ">
            Короткое описание почему эти проекты здесь, возможно в будущем часть
            из них будет не актуальна для презентации вместе с обновлениями,
            работа в процессе
          </div>
          <div className="col-span-2 row-span-2 overflow-y-scroll">
            {googleSheet.projects.map(data => (
              <div key={data.id}
                onMouseOver={() => setImage(data.image1)}
                className="flex h-8 hover:underline hover:decoration-3 mr-3 underline-offset-2"
              >
                <span className="basis-2/6 truncate">{data.project}</span>
                <span className="basis-1/6">{data.year}</span>
                <span className="basis-2/6 truncate">{data.object}</span>
                <span className="basis-1/6 flex place-content-center">
                  {data.roleCode}{" "}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-2.5 h-screen w-full  grid-cols-2 grid-rows-5 grid-flow-row-dense md:grid hidden">
          <div className="col-span-2   flex flex-col "></div>
          <div className="col-span-2 row-span-3 grid ">
            <ImagePreview imageName={imageName} />
          </div>
          <div className="col-span-2 ">009</div>
        </div>
      </div>
    </LayoutGrid>
  )
}

export const Head = () => <Seo title="Test:grid" />

export default ProjectsList
