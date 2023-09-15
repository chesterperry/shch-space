import React, { FormEvent, useEffect, useRef, useState } from "react"

//точки хранятся в массиве, методы работы: получение списка точек, изменение всех точек, получение конкретной точки, обновление конкретной точки, удаление конкретной точки, удаление всех точек, создание точки, создание нескольких точек
// точка имеет кординаты и радиус методы получение данных точки, обновление конкретной точки

class Point {
  private id: string
  constructor(public x: number, public y: number, public radius: number) {
    this.id = "" + x + y
  }

  public get() {
    return { x: this.x, y: this.y, radius: this.radius, id: this.id }
  }

  public move(_x: number, _y: number) {
    this.x = _x
    this.y = _y
  }

  public resize(_radius: number) {
    this.radius = _radius
  }
}

class Points {
  private points: Point[]
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D

  constructor(
    public color: number[],
    public impact?: number,
    public threshold?: number
  ) {
    this.points = []
    this.canvas = document.createElement("canvas")
    // --------------------- ПОМЕНЯТЬ ---------------------
    this.canvas.width = 1000
    this.canvas.height = 1000
    // ----------------------------------------------------
    this.threshold = threshold || 140
    this.ctx = this.canvas.getContext("2d")! 
    // const scale = window.devicePixelRatio || 1
    // this.ctx.scale(scale,scale)
  }

  add(point: Point) {
    this.points.push(point)
  }

  remove(point: Point) {
    this.points = this.points.filter(p => p !== point)
  }

  draw(context: CanvasRenderingContext2D) {
    this.clearCanvas()
      this.points.forEach(point => {
        this.ctx.beginPath()
        const grad = this.ctx.createRadialGradient(
          point.x,
          point.y,
          1,
          point.x,
          point.y,
          point.radius
        )
        grad.addColorStop(0, `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, 1)`)
        grad.addColorStop(1, `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, 0)`)
        this.ctx.fillStyle = grad
        this.ctx.arc(point.x, point.y, point.radius, 0, Math.PI*4)
        this.ctx.fill();
      })
      let imageData: ImageData = this.ctx.getImageData(
          0,
          0,
          this.canvas.width,
          this.canvas.height
        ),
        pix = imageData.data

      for (let i = 0, n = pix.length; i < n; i += 4) {
        if (pix[i + 3] < this.threshold) {
          pix[i + 3] /= 6
          if (pix[i + 3] > this.threshold / 4) {
            pix[i + 3] = 0
          }
        }
      }
      context.putImageData(imageData, 0, 0)
  
}
  check () {
    this.points.forEach(point => console.log(point.get()))
  }

  clearCanvas() {
    this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}

function ImageManipulation({ debug = true }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const height = 1000 //window.innerHeight
  const width = 1000 // window.innerWidth
  const threshold = 200

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    const scale = window.devicePixelRatio
    // const scale = 1;
    // const tempCanvas = document.createElement("canvas")

    canvas.width  = Math.floor(width * scale)
    canvas.height =  Math.floor(height * scale)
    // const tempCtx = tempCanvas.getContext("2d")
    const grid = {
      width: 10,
      height: 10,
    }

    const points = new Points([240,15,45])

      for (let y = 1; y <= grid.height; y++) {
        for (let x = 1; x <= grid.width; x++) {
          points.add(new Point(x*100 + 20,y*100 + 20, 40 + 5*x + y))
          points.add(new Point(x*100 - 20,y*100 - 20, 5*x + y))
        }
      }  

    points.check()
    ctx && points.draw(ctx);

  })
  
  return (
    <div>
      <canvas width={width} height={height} ref={canvasRef} />
    </div>
  )
}

export default ImageManipulation
