import * as React from "react"
import { Link, Script } from "gatsby"

const Header = ({ siteTitle }) => (
  <header className="mx-auto md:m-4 m-2 flex items-center justify-between bg-orange-500 px-1.5 bg-opacity-70 ">
    <Link to="/" className=" text-md no-underline font-medium">
      {siteTitle}
    </Link>
  </header>
)

export default Header
