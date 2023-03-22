import React from "react"
import { useEffect } from "react"
import { useRef } from "react"

const Cube = props => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    canvas.width  = props.width;
    canvas.height = props.height; 

    function scale(factor0, factor1, factor2) {
        nodes.forEach(function (node) {
          node[0] *= factor0
          node[1] *= factor1
          node[2] *= factor2
        })
      }
    
      function rotateCuboid(angleX, angleY) {
        var sinX = Math.sin(angleX)
        var cosX = Math.cos(angleX)
    
        var sinY = Math.sin(angleY)
        var cosY = Math.cos(angleY)
    
        nodes.forEach(function (node) {
          var x = node[0]
          var y = node[1]
          var z = node[2]
    
          node[0] = x * cosX - z * sinX
          node[2] = z * cosX + x * sinX
    
          z = node[2]
    
          node[1] = y * cosY - z * sinY
          node[2] = z * cosY + y * sinY
        })
      }
    
      function findBackPoint(array) {
        let backZ = array.reduce((acc, cV) => {
          return acc < cV[2] ? acc : cV[2]
        }, 0)
        return array.findIndex(el => el[2] === backZ)
      }
    
      function isZeroZ(node) {
        return Math.abs(node[2] - 100) < 2 ? true : false
      }
    
      function drawCuboid() {
        context.save()
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.translate(canvas.width / 2, canvas.height / 2)
        context.strokeStyle = "#FFFFFF"
        context.lineWidth = 2
    
        const style = ["red", "orange", "green", "blue", "pink", "brown"]
        let backPoint = findBackPoint(nodes)
        faces.forEach((face, i) => {
          if (face.includes(backPoint)) {
            return
          }
          const f1 = nodes[face[0]]
          const f2 = nodes[face[1]]
          const f3 = nodes[face[2]]
          const f4 = nodes[face[3]]
          context.save()
          context.fillStyle = style[i]
          let fp = new Path2D()
          fp.moveTo(f1[0], f1[1])
          fp.lineTo(f2[0], f2[1])
          fp.lineTo(f3[0], f3[1])
          fp.lineTo(f4[0], f4[1])
          fp.lineTo(f1[0], f1[1])
          fp.closePath()
          context.fill(fp)
          context.restore()
        })
        context.beginPath()
        edges.forEach(function (edge) {
          var p1 = nodes[edge[0]]
          var p2 = nodes[edge[1]]
          if (edge.includes(backPoint)) {
            return
          }
          context.moveTo(p1[0], p1[1])
          context.lineTo(p2[0], p2[1])
        })
        context.closePath()
        context.stroke()
        context.restore()
      }
    
      scale(canvas.width/4, canvas.width/4, canvas.width/4)
    
      function toggleRendering() {
        isRendering = !isRendering
        init()
        return
      }
    
      function init() {
        if (!isRendering) return
        rotateCuboid(Math.PI / 120, Math.PI / 270)
        drawCuboid()
        window.requestAnimationFrame(init)
      }
    
      window.addEventListener("click", toggleRendering)

    init()
  })

  let isRendering = true

  var nodes = [
    [-1, -1, -1],
    [-1, -1, 1],
    [-1, 1, -1],
    [-1, 1, 1],
    [1, -1, -1],
    [1, -1, 1],
    [1, 1, -1],
    [1, 1, 1],
  ]

  var edges = [
    [0, 1],
    [1, 3],
    [3, 2],
    [2, 0],
    [4, 5],
    [5, 7],
    [7, 6],
    [6, 4],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
  ]

  var faces = [
    [0, 4, 6, 2],
    [2, 6, 7, 3],
    [0, 2, 3, 1],
    [1, 3, 7, 5],
    [0, 1, 5, 4],
    [4, 5, 7, 6],
  ]

  

  return <canvas ref={canvasRef} {...props} />
}

export default Cube;
