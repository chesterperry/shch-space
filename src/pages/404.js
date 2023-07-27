import * as React from "react"

import LayoutGrid from "../components/layout.grid"
import Seo from "../components/seo"
import { Link } from "gatsby"

const NotFoundPage = () => (
  <LayoutGrid>
  <div className=" min-h-screen w-screen draw-stripes-10 flex justify-center">
  <div className="p-2.5 md:p-10 max-w-4xl min-h-screen w-full grid md:grid-cols-2 grid-cols-1 grid-rows-5 grid-flow-row-dense ">
    <div className=" md:col-span-2"></div>
        <div className='md:col-span-2'>404: по данному адресу страницы нет <Link className="no-underline select-none" to="/"><p className="text-3xl font-extralight hover:after:content-['_←']">Перейти к индексу сайта</p></Link></div>
    </div>
  </div>
</LayoutGrid>
)

export const Head = () => <Seo title="404: по данному адресу страницы нет" />

export default NotFoundPage
