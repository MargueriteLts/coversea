import p5 from 'p5'
import { sample, getRandomArbitrary } from './utilities'
import { getBackgroundValue, getShapesValue, getConfig, getParticlesValue } from './store'

let config = {}

let canvasContainerId = ''

let canvasSize = 600

let r = 0
let g = 0
let b = 0

//////////////////////////////////////////

function sketch(p) {

  p.setup = () => {
    const canvas = p.createCanvas(canvasSize, canvasSize)
    canvas.parent(canvasContainerId)
    p.frameRate(10)
  }
  
  p.draw = () => {

    if (config.modules.includes('PlainColorBackground')) {
      const sliderValue = parseInt(getBackgroundValue())
      r = getRandomArbitrary(0, sliderValue)
      g = getRandomArbitrary(0, sliderValue)
      b = getRandomArbitrary(0, sliderValue)
      p.background(r, g, b)
    } else {
      p.background(0)
    }

    if (config.modules.includes('Shapes')) {

      // r = getRandomArbitrary(0, 255)
      // g = getRandomArbitrary(0, 255)
      // b = getRandomArbitrary(0, 255)
      // p.fill(r, g, b)
      p.fill(255, 255, 255)

      const Value = getShapesValue()
      // const canvasSizeValue = parseInt(Value)
      const wValue = parseInt(Value)

      // canvasSize

      const xCenter = canvasSize / 2
      const yCenter = canvasSize / 2
      // const w = getRandomArbitrary(10, 60) * canvasSize / 100
      const w = wValue * canvasSize / 100
      
      const paddingW = 3 * canvasSize / 100
      const paddingH = 5 * canvasSize / 100
      
      const wCircle = w - paddingW
      
      const xCenterER1 = xCenter + (w / 2) + (6,5 * canvasSize / 100)
      const xCenterEL1 = xCenter - (w / 2) - (6,5 * canvasSize / 100)
      const wEV1 = (13 * canvasSize / 100) - paddingW
      const hEV1 = w + (26 * canvasSize / 100) - paddingH
      
      const xCenterER2 = xCenterER1 + ((canvasSize - w) / 4)
      const xCenterEL2 = canvasSize - xCenterER2
      const wEV2 = ((canvasSize - w) / 2) - (13 * canvasSize / 100) - paddingW
      const hEV2 = canvasSize - paddingH
      
      p.ellipse(xCenter, yCenter, wCircle)
      
      p.ellipse(xCenterER1, yCenter, wEV1, hEV1)
      p.ellipse(xCenterEL1, yCenter, wEV1, hEV1)
      p.ellipse(xCenterER2, yCenter, wEV2, hEV2)
      p.ellipse(xCenterEL2, yCenter, wEV2, hEV2)
      
      p.ellipse(yCenter, xCenterER1, wCircle, wEV1)
      p.ellipse(yCenter, xCenterEL1, wCircle, wEV1)
      p.ellipse(yCenter, xCenterER2, hEV1, wEV2)
      p.ellipse(yCenter, xCenterEL2, hEV1, wEV2)
    }

    if (config.modules.includes('Particles')) {
      const particlesValue = getParticlesValue()
      for (let index = 0; index < particlesValue.sliderValue; index++) {
        p.fill(255)
        p.ellipse (
        particlesValue.particles[index][0],
        particlesValue.particles[index][1],
        particlesValue.particles[index][2],
        )
      }
    }
  }
}

///////////////////////////////////////////////////

function initSketch(id) {
  canvasContainerId = id

  config = getConfig()

  new p5(sketch)
}

export { initSketch }