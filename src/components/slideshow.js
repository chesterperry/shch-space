import { graphql, useStaticQuery } from "gatsby"
import React, { useEffect, useState } from "react"
import { ImagePreview } from "./imagePreview"

const SlideShow = ({ images: contentPath }) => {
  const data = useStaticQuery(graphql`
    query AllImagesLocation {
      allImages: allFile(
        filter: {
          sourceInstanceName: { eq: "images" }
          extension: { regex: "/jpeg|jpg|png|webp|bmp/" }
        }
        sort: { name: ASC }
      ) {
        nodes {
          relativePath
          relativeDirectory
        }
      }
    }
  `)
  const propImages = contentPath ? contentPath : []
  const images = propImages.includes(".")
    ? [propImages]
    : data.allImages.nodes.filter(el => el.relativeDirectory === propImages)
  const [imageName, setImageName] = useState({ ...images[0] })
  // if (images.length <= 1) return <ImagePreview imageSource={imageName.relativePath} />
  const [count, setCount] = useState(0)
  const [isPlaying, togglePlay] = useState(true)
  const [cached, setCached] = useState(false)
  console.log(cached, count, imageName)

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      // if (!cached) return () => clearInterval(interval)
      setCount(count + 1)
      if (count === images.length - 1) setCount(0)
      setImageName({ ...images[count] })
      // if (cached) setCached(false)
    }, 3000)
    return () => clearInterval(interval)
  }, [count, isPlaying, cached])

  return (
    images.map((el,index) =>    <div
      className={`col-span-2 row-span-3 grid max-height-[500px] ${index === count ? '' : 'hidden'} `}
      onClick={() => togglePlay(!isPlaying)}
    >
      <p className='z-10 content-center row-start-1 row-end-2 col-start-1 col-end-2 justify-self-center self-center'> Загрузка... </p>
      <ImagePreview loadedStatus={setCached} imageSource={el.relativePath} className='z-30 col-start-1 col-end-2 row-start-1 row-end-2' />

    </div>)
  )
}

export default SlideShow
