import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export const ImagePreview = (requestImage, className) => {
  const data = useStaticQuery(graphql`
    query AllImages {
      allImages: allFile(
        filter: {
          sourceInstanceName: { eq: "images" }
          extension: { regex: "/jpeg|jpg|png|gif|svg/" }
        }
      ) {
        nodes {
          relativePath
          relativeDirectory
          sharp: childImageSharp {
            gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF], layout: CONSTRAINED)
          }
        }
      }
    }
  `)

  const imagesArray = []

  data.allImages.nodes.map(node => {
    const image = getImage(node.sharp)
    imagesArray.push({
      imageName: node.relativePath,
      gatsbyImage: <GatsbyImage image={image} alt=" " />,
    })
  })
  const result = imagesArray.find(el => el.imageName === requestImage.imageName)
  return result ? result.gatsbyImage : null
}
