import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useEffect } from "react"

export const ImagePreview = ({ imageSource, className, loadedStatus}) => {
  const data = useStaticQuery(graphql`
    query AllImages {
      allImages: allFile(
        filter: {
          sourceInstanceName: { eq: "images" }
          extension: { regex: "/jpeg|jpg|png|gif|svg/" }
        }
        sort: { name: ASC }
      ) {
        nodes {
          relativePath
          relativeDirectory
          sharp: childImageSharp {
            gatsbyImageData(formats: [AUTO, WEBP, AVIF], layout: CONSTRAINED, placeholder: NONE)
          }
        }
      }
    }
  `)
  if (!imageSource) return

  function handleOnLoad() {
    if (!loadedStatus) return
    loadedStatus(true)
  }

  const imagesArray = []
  data.allImages.nodes.map(node => {
    const image = getImage(node.sharp)
    imagesArray.push({
      imageName: node.relativePath,
      imageDirectory: node.relativeDirectory,
      gatsbyImage: (
        <GatsbyImage
          loading="eager"
          onLoad={() => handleOnLoad()}
          image={image}
          className={className}
          alt=" "
        />
      ),
    })
  })
  if (imageSource && imageSource.includes(".")) {
    const result = imagesArray.find(el => el.imageName === imageSource)
    return result ? result.gatsbyImage : null
  } else {
    const result = imagesArray.find(el => el.imageDirectory === imageSource)
    return result ? result.gatsbyImage : null
  }
}
