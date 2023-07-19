import * as React from "react"


const TextFormat = ({children}) => {

    if (typeof children === 'string') {
        console.log(children.search(/\([\w\W]+\)/gm))
        if (children.search(/\([\w\W]+\)/gm)== -1) return children;
        let sup = children.match(/\([\w\W]+\)/gm);
        sup = sup
        return <>{children.replace(/\([\w\W]+\)/gm, "").trimEnd()}<sup className="sups">{sup}</sup></>
    } 
}

export default TextFormat
