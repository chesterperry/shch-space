import * as React from "react"

import LayoutGrid from "../src/components/layoutGrid"
import Seo from "../src/components/seo"
import { Link } from "gatsby"
import { graphql, useStaticQuery } from "gatsby"
import { ImagePreview } from "../src/components/imagePreview"
import { useState } from "react"
import { useEffect } from "react"

const ProjectsList = () => {

  const { googleSheet } = useStaticQuery(graphql`
    query pageQuery {
      googleSheet {
        projects {
          id
          year
          roleCode
          project
          imageSource
          slug
          object
          imageCredentials
          status
        }
      }
    }
  `)

  const dataFiltered = googleSheet.projects.filter(el => el.status === "publish" )

  const [projectDetails, setProjectDetails] = useState({
    image: null,
    credentials: null,
    project: null,
  })

  useEffect (()=> {
    if (dataFiltered.length > 0) {
      let randomProject = Math.floor(Math.random()*dataFiltered.length)
      setProjectDetails({
        image: dataFiltered[randomProject].imageSource,
        project: dataFiltered[randomProject].project,
        credentials: dataFiltered[randomProject].imageCredentials,
    })
    console.log(randomProject)
  }  
  },[])


  return (
    <LayoutGrid>
      <div className="w-screen draw-grid-20 flex flex-row justify-center">
        <div className="p-2.5 md:p-10  md:basis-1/2 grid md:max-w-4xl w-full">
          <div className="flex h-60 flex-col">
            <h3 className="h-16">
              <Link className=" no-underline hover:underline" to="/">
                INDEX ←
              </Link>
            </h3>
            <h1 className="h-32">ПРОЕКТЫ</h1>
          </div>
          <div className="md:col-span-2 mb-12">
            Список проектов в которых я принимал участие, в таблице указаны
            год, моя роль и тип проекта. Названия кликабельны. Внутри дополнительные фотографии и комментарий.
          </div>
          <div className="md:col-span-2 md:row-span-2 row-span-3">
            {dataFiltered.map(
              (data, index) =>
                data.status === "publish" && (
                  <Link className="no-underline " to={`/projects/${data.slug}`} key={index}>
                    <div
                      key={data.id}
                      onFocus={() =>
                        setProjectDetails({
                          image: data.imageSource,
                          project: data.project,
                          credentials: data.imageCredentials,
                        })
                      }
                      onMouseOver={() =>
                        setProjectDetails({
                          image: data.imageSource,
                          project: data.project,
                          credentials: data.imageCredentials,
                          slug: data.slug,
                        })
                      }
                      className="flex flex-wrap text-lg h-8 hover:underline  hover:decoration-3 mr-3 underline-offset-2"
                    >
                      <span className="md:basis-3/6 basis-5/6 truncate">
                        {data.project}
                      </span>
                      <span className="md:basis-1/6 basis-1/6 ">
                        {data.year}
                      </span>
                      <span className="md:basis-1/6 md:flex hidden truncate">
                        {data.object}
                      </span>
                      <span className="md:basis-1/6 md:flex hidden place-content-center">
                        {data.roleCode}
                      </span>
                    </div>
                  </Link>
                )
            )}
          </div>
        </div>
        <div className="p-2.5  md:p-10  md:grid grid-cols-2 grid-rows-5 grid-flow-row-dense md:basis-1/2 hidden max-w-4xl">
          <div className="col-span-2   flex flex-col "></div>
          <div className="col-span-2 row-span-3 grid">
            {projectDetails.image &&
              (projectDetails.image.includes(".") ? (
                <img
                  className=" self-center justify-center w-full"
                  src={`../../${projectDetails.image}`}
                />
              ) : (
                <ImagePreview imageSource={projectDetails.image} />
              ))}
          </div>

          <div className="col-span-2 ">
            <div className="mt-2">
              {" "}
              {projectDetails.image && projectDetails.credentials
                ? `Фото: ${projectDetails.project} - ${projectDetails.credentials}`
                : ""}
            </div>
          </div>
        </div>
      </div>
    </LayoutGrid>
  )
}

export const Head = () => {
  return <Seo title={`ПРОЕКТЫ | Oleg Scherbinin`} />
}
export default ProjectsList
