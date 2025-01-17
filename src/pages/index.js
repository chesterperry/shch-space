import * as React from "react"

import LayoutGrid from "../components/layout.grid"
import Seo from "../components/seo"
import { Link } from "gatsby"
import { graphql, useStaticQuery } from "gatsby"
import { ImagePreview } from "../components/imagePreview"
import { useState } from "react"
import { useEffect } from "react"
import LinkSimple from "../components/link.simple"
import About from "../components/about"

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
  const [delayHandler, setDelayHandler] = useState(null)

  const handleMouseEnter = (data) => {
    if (delayHandler) clearTimeout(delayHandler);
    setDelayHandler(
      setTimeout(() => {
        setProjectDetails({
          image: data.imageSource,
          project: data.project,
          credentials: data.imageCredentials,
          slug: data.slug,
        });
      }, 250)
    );
  };

  useEffect (()=> {
    if (dataFiltered.length > 0) {
      let randomProject = Math.floor(Math.random()*dataFiltered.length)
      setProjectDetails({
        image: dataFiltered[randomProject].imageSource,
        project: dataFiltered[randomProject].project,
        credentials: dataFiltered[randomProject].imageCredentials,
    })
  }  
  },[])
  return (
    <LayoutGrid>
        <div className="w-screen flex  flex-col ">
        <div className="w-screen draw-grid-20 flex flex-row justify-center ">
        <div className="p-2.5 md:p-10  grid  w-full md:max-w-4xl">
        <div className="flex h-30 md:h-60 flex-col ">
            <h1 className="h-32">ОБО МНЕ</h1>
          </div>
          <div className="mb-12">
              <About/>
          </div>
      </div>

      <div className="md:grid  hidden max-w-4xl md:basis-1/2">
      </div>
      </div>
      <div className="w-screen draw-grid-20 flex flex-row justify-center min-h-screen">
        <div className="p-2.5 md:p-10  md:basis-1/2 grid md:max-w-4xl w-full">
          <div className="flex h-30 md:h-60 flex-col">
            <h1 className="h-32" id="projects">ПРОЕКТЫ</h1>
          </div>
          <div className="md:col-span-2 mb-12"><p>
            Список избранных проектов, в таблице указаны
            год, моя роль и тип. Названия кликабельны. Внутри могут быть дополнительные фотографии и комментарий.</p>
          </div>
          <div className="md:col-span-2 md:row-span-2 row-span-3">
            {dataFiltered.map(
              (data, index) =>
                data.status === "publish" && (
                  <Link className="no-underline " to={`/projects/${data.slug}`} key={index}>
                    <div
                      key={data.id}
                      onFocus={() =>handleMouseEnter(data)
                      }
                      onMouseOver={() =>
                        handleMouseEnter(data)
                      }
                      className="flex flex-wrap text-lg h-8 hover:underline  hover:decoration-3 hover:decoration-orange-500 mr-3 underline-offset-2"
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
                  className="self-center justify-center fixed-height-img"
                  src={`../../${projectDetails.image}`}
                />
              ) : (
                <ImagePreview imageSource={projectDetails.image} className={"self-center justify-center fixed-height-img"}/>
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
      </div>
    </LayoutGrid>
  )
}

export const Head = () => {
  return <Seo title={`Oleg Scherbinin`} />
}
export default ProjectsList
