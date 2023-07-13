import * as React from "react"
import { Link } from "gatsby"


const LinkSimple = (props) => <Link className=" no-underline hover:underline" to={props.to}>{props.children}</Link>

export default LinkSimple
