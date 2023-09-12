import React, {
    FormEvent,
    useEffect,
    useRef,
    useState,
  } from "react"

function ImageManipulation({ debug = true }) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const height = window.innerHeight
    const width = window.innerWidth
    useEffect(()=> {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const grid = {
            width: 10,
            height: 10
        }
        if (ctx) {
            ctx.fillStyle = "green";
            ctx.rect(0,0,width, height)
            ctx.fill()
            for( let y = 1; y <= grid.height; y++){
                for(let x = 1; x <= grid.width; x++) {
                    ctx?.beginPath();
                    ctx?.ellipse(x*100,y*100,45,25,-40 + x,0,360)
                    ctx.fillStyle = "blue";
                    ctx?.fill()
                    ctx?.beginPath();

                    ctx?.ellipse(x*100,y*100,9,45 ,-40 - y,0,360)
                    ctx.fillStyle = "yellow";
                    ctx?.fill()
                }
            }
        }

    })
   
  
    return (
      <div>
        <canvas width={width} height={height} ref={canvasRef} />
      </div>
    )
  }
  
  export default ImageManipulation