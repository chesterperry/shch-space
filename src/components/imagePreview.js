import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export const ImagePreview = ({ imageSource, className }) => {
  const data = useStaticQuery(graphql`
    query AllImages {
      allImages: allFile(
        filter: {
          sourceInstanceName: { eq: "images" }
          extension: { regex: "/jpeg|jpg|png|gif|svg/" }
        }
        sort: {name: ASC}
      ) {
        nodes {
          relativePath
          relativeDirectory
          sharp: childImageSharp {
            gatsbyImageData(
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
              layout: CONSTRAINED
            )
          }
        }
      }
    }
  `)
  if (!imageSource) return

  const imagesArray = []
  data.allImages.nodes.map(node => {
    const image = getImage(node.sharp)
    imagesArray.push({
      imageName: node.relativePath,
      imageDirectory: node.relativeDirectory,
      gatsbyImage: <GatsbyImage image={image} className={className} alt=" " />,
    })
  })
  if(imageSource.includes(".")) {
    const result = imagesArray.find(el => el.imageName === imageSource)
    return result ? result.gatsbyImage : null
  }
  else  {
    const result = imagesArray.find(el => el.imageDirectory === imageSource)
    return result ? result.gatsbyImage : null
  }
 
}
