import { graphql, useStaticQuery } from "gatsby"
import React, { useEffect, useRef, useState } from "react"
import { ImagePreview } from "./imagePreview"

const SlideShow = (props) => {
  const data = useStaticQuery(graphql`
  query AllImagesLocation {
    allImages: allFile(
      filter: {sourceInstanceName: {eq: "images"}, extension: {regex: "/jpeg|jpg|png|gif|svg/"}}
      sort: {name: ASC}
    ) {
      nodes {
        relativePath
        relativeDirectory
      }
    }
  }
`)
const propImages = props.images ? props.images : [];
const images = propImages.includes(".") ? [propImages] : 
data.allImages.nodes.filter(el => el.relativeDirectory === propImages) 

const [imageName, setImageName] = useState({...images[0]})
const [count, setCount] = useState(1)
const [isPlaying, togglePlay] = useState(true)


useEffect(() => {
  if (!isPlaying || images.length <= 1) return

  const interval = setInterval(() => {
    setCount(count + 1)
    if (count === images.length - 1) setCount(0)
    setImageName({...images[count]})
  }, 2000)
  return () => clearInterval(interval)
}, [count, isPlaying])

return (
  <div className="col-span-2 row-span-3 grid "
  onClick={() => togglePlay(!isPlaying)}
  >
    <ImagePreview imageSource={imageName.relativePath}/>
  </div>
)
}

export default SlideShow
