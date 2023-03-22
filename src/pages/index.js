import * as React from "react"

import LayoutGrid from "../components/layoutGrid"
import Seo from "../components/seo"
import { Link } from "gatsby"

const ProjectsList = () => {
  return (
    <LayoutGrid>
      <div className="w-screen min-h-full draw-grid-10 flex justify-center ">
        <div className="p-2.5 md:p-10 h-full md:w-1/2 w-full grid md:grid-cols-2 grid-cols-1 grid-rows-5 grid-flow-row-dense max-w-5xl ">
          <div className=" md:col-span-2 md:row-span-2"></div>
          <div>
            <Link className="no-underline select-none" to="/projects/">
              <p className="text-5xl font-extralight hover:after:content-['_←']">
                ПРОЕКТЫ
              </p>
            </Link>
          </div>
          {/* <div>
            <Link className="no-underline select-none" to="/notes/">
              <p className="text-5xl font-extralight hover:after:content-['_←']">
                ЗАПИСИ
              </p>
            </Link>
          </div> */}
          <div>
            <Link className="no-underline select-none" to="/about/">
              <p className="text-5xl font-extralight hover:after:content-['_←']">
                ОБО МНЕ
              </p>
            </Link>
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
