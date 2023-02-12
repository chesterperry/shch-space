import * as React from "react"

import LayoutGrid from "../components/layoutGrid"
import Seo from "../components/seo"
import { Link } from "gatsby"



const ProjectsList = () => {

  return (
    <LayoutGrid>
      <div className=" min-h-screen w-screen draw-grid-10 grid md:grid-cols-2 grid-cols-1 grid-flow-col-dense ">
      <div className="p-2.5 min-h-screen w-full grid md:grid-cols-2 grid-cols-1 grid-rows-5 grid-flow-row-dense ">
        <div className=" md:col-span-2"></div>
            <div><Link className="no-underline select-none" to="/projects/"><p className="text-5xl font-extralight hover:after:content-['_←']">ПРОЕКТЫ</p></Link></div>
            <div><Link className="no-underline select-none" to="/projects/"><p className="text-5xl font-extralight hover:after:content-['_←']">ОБО МНЕ</p></Link></div>
            <div><Link className="no-underline select-none" to="/projects/"><p className="text-5xl font-extralight hover:after:content-['_←']">ОБО МНЕ</p></Link></div>
            <div><Link className="no-underline select-none" to="/projects/"><p className="text-5xl font-extralight hover:after:content-['_←']">ОБО МНЕ</p></Link></div>
        </div>
      </div>
    </LayoutGrid>
  )
}

export const Head = () => {
  return <Seo title={`Oleg Scherbinin`} />
}
export default ProjectsList
