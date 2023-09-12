import React, {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react"
import {
  arrayToPixels,
  randomWindPixels,
  neighborPixelsInterpolation,
  pixelsToArraysCompose,
  scaleUp,
  resizeImage,
} from "../utils/image.methods"
import * as image_about from "../images/about/11882359_10153510898348908_1376131373014492576_o_10153510898348908.jpg"

const manipulateImageData = (
  imageData: ImageData,
  wind: number,
  pixels: number
): ImageData => {
  const originalPixels = imageData.data
  const originalWidth = imageData.width
  const originalHeight = imageData.height
  const scaledPixels = new Uint8ClampedArray(
    originalPixels.length
  )

  const bufferPixels = neighborPixelsInterpolation(
    originalPixels,
    originalWidth,
    originalHeight,
    pixels
    // 5
  )

  const newArray = arrayToPixels(
    scaleUp(
      randomWindPixels(
        pixelsToArraysCompose(bufferPixels, originalWidth, originalHeight),
        wind
      ),
      1
    )
  )


  return new ImageData(
    newArray,
    originalWidth,
    originalHeight 
  )
}

function ImageManipulation({ debug = true }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [imageData, setImageData] = useState<ImageData | null>(null)
  const [imageBuffer, setImageBuffer] = useState<HTMLCanvasElement | null>(null)
  const [imageWidth, setWidth] = useState(0)
  const [imageHeigth, setHeight] = useState(0)
  const [play, setPlay] = useState(true)
  const [inputsValue, setInputValue] = useState({ wind: 0, pixel: 1, size: .5 })

  const inputChange = (e: FormEvent) => {

    const value = parseFloat(e.target.value)
    const name = e.target.name
 
    // if (name[value] === inputsValue[name]) return;
    console.log(name, value)
    setInputValue({ ...inputsValue, 
      [name]:value
  })
  }

  const handleChangesInput = (e: FormEvent, func: Function) =>
    // useDebounce(func(e), 500)
    func(e)

  useEffect(() => {
    if (imageBuffer) {
      const bufferImage: HTMLCanvasElement | null = resizeImage(
        imageBuffer,
        inputsValue.size
      )
      const bufferContext: CanvasRenderingContext2D | null =
        bufferImage?.getContext("2d") || null
      bufferContext &&
        bufferImage &&
        setImageData(
          bufferContext.getImageData(
            0,
            0,
            bufferImage.width,
            bufferImage.height
          )
        )
      console.log(inputsValue)
      bufferImage && setHeight(bufferImage.height)
      bufferImage && setWidth(bufferImage.width)
    }
  }, [imageBuffer, inputsValue])

  useEffect(() => {
    if (imageData) {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext("2d") || null

      const newImage = manipulateImageData(imageData, inputsValue.wind, inputsValue.pixel)

      ctx?.putImageData(newImage, 0, 0)
    }
  }, [imageData, inputsValue])

  useEffect(() => {
    const file = image_about
    if (file) {
      const image = new Image()

      image.src = file.default
      image.onload = () => {
        const newImage = resizeImage(image, 2)
        setImageBuffer(newImage)
      }
    }
  }, [])

  return (
    <div>
      {debug && (
        <input
          name="size"
          type="range"
          title="size"
          min="0.1"
          max="1"
          step="0.1"
          value={inputsValue.size}
          onInput={e => handleChangesInput(e, inputChange)}
        />
      )}
      {debug && (
        <input
          name="pixel"
          type="range"
          title="pixel"
          min="1"
          max="50"
          step="1"
          value={inputsValue.pixel}
          onInput={e => handleChangesInput(e, inputChange)}
        />
      )}
      {debug && (
        <input
          name="wind"
          type="range"
          title="wind"
          min="0"
          max="250"
          step="5"
          value={inputsValue.wind}
          onInput={e => handleChangesInput(e, inputChange)}
        />
      )}

      <canvas width={imageWidth} height={imageHeigth} ref={canvasRef} />
    </div>
  )
}

export default ImageManipulation

// const useRaf = (onFrame, loadedBuffer) => {
//   const requestRef = useRef<number>(0)
//   const startTimeRef = useRef<number>(0)

//   const callback = time => {
//     if (!startTimeRef.current) startTimeRef.current = time
//     const progress = time - startTimeRef.current
//     onFrame(progress)
//     requestRef.current = requestAnimationFrame(callback)
//   }

//   useEffect(() => {
//     requestRef.current = requestAnimationFrame(callback)
//     if (!requestRef.current) return
//     return () => cancelAnimationFrame(requestRef.current)

//   }, [loadedBuffer])
// }
