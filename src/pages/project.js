import * as React from "react"

import LayoutGrid from "../components/layout-grid"
import Seo from "../components/seo"
import { Link } from "gatsby"

const Grid = () => (
  <LayoutGrid>
    <div className="p-2.5 sm:h-screen h-full w-screen grid sm:grid-cols-2 grid-cols-1 grid-flow-col-dense">
      <div className="h-screen sm:h-full w-full grid grid-cols-2 grid-rows-5 grid-flow-row-dense">
        <div className="col-span-2  bg-slate-50 flex flex-col">
          <h3 className="basis-2/3">SWCTION</h3>

          <h1 className="basis-1/3">GRID</h1>
        </div>

        <div className=" bg-slate-50">003</div>
        <div className=" bg-slate-600 ">004</div>
        <div className=" bg-slate-600">005</div>
        <div className=" bg-slate-50">006</div>

        <div className="col-span-2 row-span-2 bg-slate-50">
          007
        </div>
      </div>
      <div className="h-full w-full  grid-cols-2 grid-rows-5 grid-flow-row-dense sm:grid hidden">
      <div className="col-span-2  bg-slate-600 flex flex-col ">
          <h3 className="basis-2/3">SWCTION</h3>

          <h1 className="basis-1/3">GRID</h1>
        </div>
        <div className="col-span-2 row-span-3 bg-slate-50">
          008
        </div>
        <div className="col-span-2 bg-slate-600">
          009
        </div>
      </div>
    </div>
  </LayoutGrid>
)

export const Head = () => <Seo title="Test:grid" />

export default Grid
