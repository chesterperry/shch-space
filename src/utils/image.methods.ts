type ComposedArray = number[][][];

export function pixelsToArraysCompose(pixelsData: Uint8ClampedArray, width: number, height: number): ComposedArray {
  let composedArray: ComposedArray | null = []
  for (let y = 0; y < height; y++) {
    composedArray[y] = []
    for (let x = 0; x < width; x++) {
      let index: number = (x + width * y) * 4
      const test = pixelsData[index];
      composedArray[y].push([
        pixelsData[index],
        pixelsData[index + 1],
        pixelsData[index + 2],
        pixelsData[index + 3],
      ])
    }
  }
  return composedArray
}

export function arrayToPixels(twoDimArray: ComposedArray): Uint8ClampedArray {
  const pixels = twoDimArray[0].length*twoDimArray.length*4; 
  let pixelsData: Uint8ClampedArray = new Uint8ClampedArray(pixels);
  let offset = 0;
  for (let y = 0; y < twoDimArray.length; y++) {
    for (let x = 0; x < twoDimArray[y].length; x++) {
      pixelsData.set(twoDimArray[y][x], offset)
      offset += 4
    }
  }
  return pixelsData
}

export function scaleUp(twoDimArray: ComposedArray, scaleUpFactor: number): ComposedArray {
  let bufferArray: ComposedArray | null = []
  let resultArray: ComposedArray | null = []
  for (let y = 0; y < twoDimArray.length; y++) {
    bufferArray[y] = []
    for (let x = 0; x < twoDimArray[y].length; x++) {
      for (let m = 0; m < scaleUpFactor; m++) {
        bufferArray[y].push(twoDimArray[y][x])
      }
    }
  }
  for (let y = 0; y < bufferArray.length; y++) {
    for (let m = 0; m < scaleUpFactor; m++) {
      resultArray.push(bufferArray[y])
    }
  }
  return resultArray
}


export function randomWindPixels(twoDimArray: ComposedArray, FORCE: number): ComposedArray {
  let resultArray: ComposedArray | null = []
  for (let y = 0; y < twoDimArray.length; y++) {
    resultArray[y] = []
    for (let x = 0; x < twoDimArray[y].length; x++) {
      let dx = ((Math.random() * 2 * FORCE) - 1 * FORCE) | 0
      let dy = ((Math.random() * 2 * FORCE) - 1 * FORCE) | 0
      if (typeof twoDimArray[y + dy] !== 'undefined' && typeof twoDimArray[y + dy][x + dx] !== 'undefined') {
        resultArray[y].push(twoDimArray[y + dy][x + dx])
      } else {
        resultArray[y].push(twoDimArray[y][x])
      }
    }
  }
  return resultArray
}

export function neighborPixelsInterpolation(iPixels: Uint8ClampedArray, iWidth: number, iHeight: number, STEP: number):Uint8ClampedArray {
  const bufferPixels = new Uint8ClampedArray(iPixels.length)
  for (let y = 0; y < iHeight; y += STEP) {
    for (let x = 0; x < iWidth; x += STEP) {
      let colorFrequencies = {}
      for (let i = 0; i < STEP; i++) {
        for (let j = 0; j < STEP; j++) {
          const currentX = x + i
          const currentY = y + j
          const pixelIndex = (currentY * iWidth + currentX) * 4

          let color: number[] = [
            iPixels[pixelIndex],
            iPixels[pixelIndex + 1],
            iPixels[pixelIndex + 2],
          ]

          colorFrequencies[color.toString()] = colorFrequencies.hasOwnProperty(color.toString())
            ? colorFrequencies[color.toString()] + 1
            : 1
        }
      }
      let dominantColor: string = '';
      let maxFrequency = 0
      for (const [key, value] of Object.entries(colorFrequencies)) {
        if (colorFrequencies[key] > maxFrequency) {
          maxFrequency = colorFrequencies[key]
          dominantColor = key;
        }
      }
      for (let i = 0; i < STEP; i++) {
        for (let j = 0; j < STEP; j++) {
          const colors: number[] = dominantColor.split(",").map(colorString => parseInt(colorString))
          const currentX = x + i
          const currentY = y + j
          const pixelIndex = (currentY * iWidth + currentX) * 4
          bufferPixels[pixelIndex] = colors[0]
          bufferPixels[pixelIndex + 1] = colors[1]
          bufferPixels[pixelIndex + 2] = colors[2]
          bufferPixels[pixelIndex + 3] = iPixels[pixelIndex + 3]
        }
      }
    }
  }
  return bufferPixels;
}




export function savePixels(master, copy) {
  for (let i = 0; i < copy.length; i++) {
    copy[i] = master[i]
  }
}

// export function middleColor(twoDimArray, STEP) {
//     let bufferArray = []
//     let resultArray = []
//     for (let y = 0; y < twoDimArray.length; y++) {
//       bufferArray[y] = []
//       for (let x = 0; x < twoDimArray[y].length; x++) {
//         for (let m = 0; m < scaleUpFactor; m++) {
//           bufferArray[y].push(twoDimArray[y][x])
//         }
//       }
//     }
//     for (let y = 0; y < bufferArray.length; y++) {
//       for (let m = 0; m < scaleUpFactor; m++) {
//         resultArray.push(bufferArray[y])
//       }
//     }
//     return resultArray
//   }


export function resizeImage(imgToResize: HTMLImageElement | HTMLCanvasElement, resizingFactor: number = .5): HTMLCanvasElement | null {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (context && imgToResize) {
    const originalWidth = imgToResize.width;
    const originalHeight = imgToResize.height;

    const canvasWidth = originalWidth * resizingFactor;
    const canvasHeight = originalHeight * resizingFactor;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    context.drawImage(
      imgToResize,
      0,
      0,
      canvasWidth,
      canvasHeight
    )
  }
  return canvas;
}