import * as React from "react"

import LayoutGrid from "../components/layout.grid"
import Seo from "../components/seo"
import { graphql, Link } from "gatsby"
import SlideShow from "../components/slideshow"
import LinkBeautifier from "../components/link.beautifier"
import IconOutward from "../components/icon.outward"
import HorizontalLine from "../components/element.hline"
import TextFormat from "../components/text.format"

export default function Grid({ data, pageContext }) {
  const project = data.allGoogleProjectsSheet.nodes[0]
  return (
    <LayoutGrid>
      <div className="min-h-fit w-screen flex justify-center">
        <div className="p-2.5 md:p-10 md:w-1/2 w-full max-w-4xl">
          <div className="grid w-full  grid-cols-2 gap-2 flex-none">
            <div className="h-60 col-span-2">
              <h3 className="h-16">
                <Link className=" no-underline hover:underline" to="/#projects">
                  INDEX ←
                </Link>
              </h3>

              <h1 className="h-32">{project.project}</h1>
            </div>

            <div className="h-24  md:row-span-1 ">
              <h4 className="h-5">ПЕРИОД</h4>
              <HorizontalLine/>
              <span className="mb-12 uppercase md:text-3xl text-xl font-light">
                {project?.year}
              </span>
            </div>
            <div className="h-24  md:row-span-1">
              <h4 className="h-5">РОЛЬ</h4>
              <HorizontalLine/>

              <span className="mb-12 uppercase md:text-3xl text-xl  font-light">
                {project?.role}
              </span>
            </div>
            {project?.architector && (
              <div className="h-24  md:row-span-1">
                <h4 className="h-5">АРХИТЕКТОР</h4>
                <HorizontalLine/>

                <span className="mb-12 uppercase md:text-3xl text-xl  font-light">
                  {project?.architector}
                </span>
              </div>
            )}
            {project?.designer && (
              <div className="h-24  md:row-span-1">
                <h4 className="h-5">ДИЗАЙН / ИДЕЯ</h4>
                <HorizontalLine/>

                <span className="mb-12 uppercase md:text-3xl text-xl  font-light">
                  {project?.designer}
                </span>
              </div>
            )}
            {project?.participants && (
              <div className="  h-24  md:row-span-1">
                <h4 className="h-5">УЧАСТНИКИ</h4>
                <HorizontalLine/>

                <span className="mb-12 uppercase md:text-3xl text-xl  font-light">
                  <TextFormat>{project?.participants}</TextFormat>
                </span>
              </div>
            )}
            {project?.link && (
              <div className="  h-24  md:row-span-1">
                <h4 className="h-5">ССЫЛКА<IconOutward></IconOutward></h4>
                <HorizontalLine/>

                <span className="mb-12 uppercase md:text-3xl text-xl  font-light">
                  <LinkBeautifier link={project?.link} />
                </span>
              </div>
            )}
          </div>
          <div className=" grid md:hidden mb-12   md:max-h-max max-h-[240px] ">
            <SlideShow images={project?.imageSource} />
          </div>
          {project?.comment && (
            <div className="overflow-visible md:col-span-1 mt-8">
              <h4 className="basis-1/3">КОММЕНТАРИЙ</h4>
              <HorizontalLine/>

              <p className="basis-2/3 ">{project?.comment}</p>
            </div>
          )}
          <div className="grid grid-cols-2 mt-16">
            <div className="col-span-1   flex flex-row  md:hidden">
              {pageContext.previousSlug && (
                <Link
                  className=" no-underline hover:underline"
                  to={`/projects/${pageContext.previousSlug}`}
                >
                  <span className="mb-12">← ПРЕДЫДУЩИЙ</span>
                </Link>
              )}
            </div>
            <div className="col-span-1  flex flex-row justify-end md:hidden">
              {pageContext.nextSlug && (
                <Link
                  className=" no-underline hover:underline"
                  to={`/projects/${pageContext.nextSlug}`}
                >
                  <span className="mb-12"> СЛЕДУЮЩИЙ →</span>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="p-2.5  md:p-10  md:grid grid-cols-2 grid-rows-5 grid-flow-row-dense md:basis-1/2 hidden max-w-4xl">
          <div className="col-span-1   flex flex-row ">
            {pageContext.previousSlug && (
              <Link
                className=" no-underline hover:underline"
                to={`/projects/${pageContext.previousSlug}`}
              >
                <span className="mb-12">← {pageContext.previousProject}</span>
              </Link>
            )}
          </div>
          <div className="col-span-1  flex flex-row justify-end">
            {pageContext.nextSlug && (
              <Link
                className=" no-underline hover:underline"
                to={`/projects/${pageContext.nextSlug}`}
              >
                <span className="mb-12"> {pageContext.nextProject} →</span>
              </Link>
            )}
          </div>
          <div className="col-span-2 row-span-3 grid">
            {project?.imageSource &&
              (project?.imageSource.includes(".") ? (
                <img
                  className=" self-center justify-center w-full "
                  src={`../../${project?.imageSource}`}
                />
              ) : (
                <SlideShow images={project?.imageSource} />
              ))}
          </div>
          <div className="col-span-2 ">
            <div className="mt-2">
              {project.imageSource && project.imageCredentials
                ? `Фото: ${project.project} - ${project.imageCredentials}`
                : ""}
            </div>
          </div>
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
  query Page($id: String) {
    allGoogleProjectsSheet(filter: { id: { eq: $id } }) {
      nodes {
        id
        imageSource
        object
        project
        role
        roleCode
        year
        comment
        architector
        designer
        participants
        imageCredentials
        link
      }
    }
  }
`
