import p5 from 'p5'

import {
  getModuleList,
  getShapesStore,
  getParticlesStore,
  getImageStore
} from './store'

let moduleList = {}

let canvasContainerId = ''

let canvasSize = 600

let images = {}

//////////////////////////////////////////

function sketch(p) {

  // p.preload = () => {
  //   const imageFiles = getImageValue().images

  //   Object.keys(imageFiles).forEach((key) => {
  //     images = Object.assign({}, images, {
  //       [`${key}`]: p.loadImage(imageFiles[key])
  //     })
  //   })
  // }

  p.preload = () => {
    if (moduleList.includes('Image')) {
      const imageFiles = getImageStore().images

      Object.keys(imageFiles).forEach((key) => {
        images = Object.assign({}, images, {
          [`${key}`]: p.loadImage(imageFiles[key])
        })
      })
    }
  }

  p.setup = () => {
    const canvas = p.createCanvas(canvasSize, canvasSize)
    canvas.parent(canvasContainerId)
    p.frameRate(100)
    p.noStroke()
  }
  
  p.draw = () => {

    p.background(0)

    /////////////////////////////////////////////////////////// MODULE COLORBACKGROUND

    if (moduleList.includes('ColorBackground')) {
      const colorBackground = getColorBackgroundStore()
      // console.log(getColorBackgroundStore())
      p.background (
        colorBackground[0],
        colorBackground[1],
        colorBackground[2],
      )
    } else {
      p.background(0)
    }

    /////////////////////////////////////////////////////////// MODULE BACKGROUND

    if (moduleList.includes('PlainColorBackground')) {
      const plainColorBackground = getPlainColorBackgroundStore()
      // for (let index = 0; index < plainColorBackground.sliderValue; index++) {
        p.background (
        plainColorBackground.color[0],
        plainColorBackground.color[1],
        plainColorBackground.color[2],
        )
      // }
    }

    // if (config.modules.includes('PlainColorBackground')) {
    //   const backgroundValue = getBackgroundValue()

    //   for (let index = 0; index < backgroundValue.sliderValue; index++) {
    //     p.background (
    //     backgroundValue.color[index][0],
    //     backgroundValue.color[index][1],
    //     backgroundValue.color[index][2],
    //     )
    //   }

    // } else {
    //   p.background(0)
    // }

    /////////////////////////////////////////////////////////// MODULE SHAPES

    if (moduleList.includes('Shapes')) {

      // p.background(0)
      p.fill(255, 0, 255)

      const Value = getShapesStore().sliderValue
      const wValue = parseInt(Value)

      const xCenter = canvasSize / 2
      const yCenter = canvasSize / 2
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

    /////////////////////////////////////////////////////////// MODULE PARTICLES

    if (moduleList.includes('Particles')) {
      const particles = getParticlesStore()

      for (let index = 0; index < particles.sliderValue; index++) {
        p.fill(255)
        p.ellipse (
          particles.particles[index][0],
          particles.particles[index][1],
          particles.particles[index][2],
        )
      }
    }

    // if (config.modules.includes('Particles')) {
    //   const particlesValue = getParticlesValue()

    //   for (let index = 0; index < particlesValue.sliderValue; index++) {
    //     p.fill(0)
    //     p.ellipse (
    //     particlesValue.particles[index][0],
    //     particlesValue.particles[index][1],
    //     particlesValue.particles[index][2],
    //     )
    //   }

    // }

    /////////////////////////////////////////////////////////// MODULE IMAGE

    if (moduleList.includes('Image')) {
      const { current } = getImageStore()
      const image = images[current]

      p.image(
        image,
        (canvasSize - image.width / 2) / 2,
        (canvasSize - image.height / 2) / 2,
        image.width / 2,
        image.height / 2,
        0,
        0,
        image.width,
        image.height,
        p.CONTAIN
      )
    }

    // if (config.modules.includes('Image')) {
    //   const { current } = getImageValue()
    //   const image = images[current]

    //   p.image(
    //     image,
    //     (canvasSize - image.width / 2) / 2,
    //     (canvasSize - image.height / 2) / 2,
    //     image.width / 2,
    //     image.height / 2,
    //     0,
    //     0,
    //     image.width,
    //     image.height,
    //     p.CONTAIN
    //   )
    // }

  }
}

///////////////////////////////////////////////////

function initSketch(id) {
  canvasContainerId = id

  moduleList = getModuleList()

  new p5(sketch)
}

export { initSketch }