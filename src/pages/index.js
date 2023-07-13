import * as React from "react"

import LayoutGrid from "../components/layoutGrid"
import Seo from "../components/seo"
import { Link } from "gatsby"
import { graphql, useStaticQuery } from "gatsby"
import { ImagePreview } from "../components/imagePreview"
import { useState } from "react"
import { useEffect } from "react"
import LinkSimple from "../components/link.simple"
import IconOutward from "../components/icon.outward"

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
        <div className="w-screen flex  flex-col ">
        <div className="w-screen draw-grid-20 flex flex-row justify-center ">
        <div className="p-2.5 md:p-10  grid  w-full md:max-w-4xl">
        <div className="flex h-30 md:h-60 flex-col ">
            <h1 className="h-32">ОБО МНЕ</h1>
          </div>
          <div className="mb-12">
              <p>
              Последние 11 лет работаю в компании <LinkSimple to="https://kixbox.ru">KIXBOX<IconOutward></IconOutward></LinkSimple> Моя работа включала в себя управление такими проектами, как <LinkSimple to='/projects/october-skateshop-2018/'>скейтшоп "Октябрь"</LinkSimple> на Новом Арбате и соответствующий <LinkSimple to='/projects/october-online-store-2020/'>интернет-магазин</LinkSimple>, организация шоурумов для SM <LinkSimple to='/projects/sm-bread-2019/'>"Хлебзавод"</LinkSimple> и <LinkSimple to='/projects/sm-white-workshop-2019/'>"Цех Белого"</LinkSimple>, а также организация вечеринок с <LinkSimple to='/projects/fred-perry-x-dolphin-2018/'>диджей-сетами Дельфина</LinkSimple>. Я также работал над проектом магазина <LinkSimple to='/projects/fred-perry-aviapark-2016/'>Fred Perry в Москве.</LinkSimple>
              </p>

              <p>
              В свободное время наслаждаюсь общением с семьей и занимаюсь шоссейным велоспортом. Кроме того, увлекаюсь программированием на JavaScript, веду заметки о дизайне, искусстве и технологиях. Вы можете связаться со мной по почте <LinkSimple to='mailto:oleg.shch@gmail.com'>oleg.shch@gmail.com</LinkSimple> или в <LinkSimple to="https://t.me/olegscherbinin">Telegram</LinkSimple>.
              </p>
          </div>
      </div>
      <div className="md:grid  hidden max-w-4xl md:basis-1/2"></div>
      </div>
      <div className="w-screen draw-grid-20 flex flex-row justify-center min-h-screen">
        <div className="p-2.5 md:p-10  md:basis-1/2 grid md:max-w-4xl w-full">
          <div className="flex h-30 md:h-60 flex-col">
            <h1 className="h-32" id="projects">ПРОЕКТЫ</h1>
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
      </div>
    </LayoutGrid>
  )
}

export const Head = () => {
  return <Seo title={`Oleg Scherbinin`} />
}
export default ProjectsList
