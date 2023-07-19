import * as React from "react"
import { Link } from "gatsby"
import IconOutward from "./icon.outward";

const LinkSimple = (props) => { 
    let icon;
    if (typeof props.to === 'string' && props.to !== 'null') icon = props.to.includes('https') ? <IconOutward/> : null;
    return <Link className=" no-underline hover:underline" to={props.to}>{props.children}{icon}</Link>}

export default LinkSimple
