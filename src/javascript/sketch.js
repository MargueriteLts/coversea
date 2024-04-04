import p5 from 'p5'

import {
  getModuleList,
  getShapesStore,
  getParticlesStore,
  getImageStore,
  getBackgroundStore,
  getColorPickerStore,
  getBackgroundImageStore,
  getBlendStore
} from './store'

let moduleList = {}

let canvasContainerId = ''

let canvasSize = 600

let imagesObj = {}
let imagesBg = {}

//////////////////////////////////////////

function drawModules(p) {

  /////////////////////////////////////////////////////////// MODULE BACKGROUND

  if (moduleList.includes('Background')) {
    const background = getBackgroundStore()

    if (background.bgTypes.includes('SolidColor') && background.currentBgType === 'SolidColor') {
      const plainColorBackground = background.preset.SolidColor.color

      p.background(
        plainColorBackground
      )
    } else if (background.bgTypes.includes('Gradient') && background.currentBgType === 'Gradient') {
      const color1 = background.preset.Gradient.color1
      const color2 = background.preset.Gradient.color2
      const angle = background.preset.Gradient.angle
      p.background(0)

      let c1 = p.color(color1)
      let c2 = p.color(color2)

      for (let i = 0; i <= canvasSize; i++) {
        let amt = p.map(i, 0, canvasSize, 0, 1)
        let c3 = p.lerpColor(c1, c2, amt)
        
        p.stroke(c3)
        if (angle == 'vertical') {
          p.line(0, i, canvasSize, i)
        }
        if (angle == 'horizontal') {
          p.line(i, 0, i, canvasSize)
        }
      }


    } else {
      p.background(0)
    }
  }

  /////////////////////////////////////////////////////////// MODULE BACKGROUNDIMAGE

  if (moduleList.includes('BackgroundImage')) {

    const backgroundImage = getBackgroundImageStore()

    let currentImg
    let imageBg

    if (backgroundImage.collections.includes('NightClub') && backgroundImage.currentCollection === 'NightClub') {
      currentImg = backgroundImage.preset.NightClub.current
      imageBg = imagesBg[currentImg]
    } else if (backgroundImage.collections.includes('Cars') && backgroundImage.currentCollection === 'Cars') {
      currentImg = backgroundImage.preset.Cars.current
      imageBg = imagesBg[currentImg]
    }


    p.image(
      imageBg,
      0,
      0,
      imageBg.width,
      imageBg.height,
      0,
      0,
      imageBg.width,
      imageBg.height,
      p.CONTAIN
    )
  }

  /////////////////////////////////////////////////////////// MODULE SHAPES

  if (moduleList.includes('Shapes')) {

    p.noStroke()

    const color = getColorPickerStore('shapes')
    p.fill(color)

    const Value = getShapesStore().settings.sliderValue
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

  /////////////////////////////////////////////////////////// MODULE IMAGE

  if (moduleList.includes('Image')) {
    const { current } = getImageStore()
    const image = imagesObj[current]

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

}




function sketch(p) {

  p.preload = () => {
    if (moduleList.includes('Image')) {
      const imageFiles = getImageStore().images

      Object.keys(imageFiles).forEach((key) => {
        imagesObj = Object.assign({}, imagesObj, {
          [`${key}`]: p.loadImage(imageFiles[key])
        })
      })
      console.log(imagesObj);
    }

    if (moduleList.includes('BackgroundImage')) {
      const backgroundImage = getBackgroundImageStore()

      if (backgroundImage.collections.includes('NightClub') && backgroundImage.currentCollection === 'NightClub') {
        const imageFiles = backgroundImage.preset.NightClub.images

        Object.keys(imageFiles).forEach((key) => {
          imagesBg = Object.assign({}, imagesBg, {
            [`${key}`]: p.loadImage(imageFiles[key])
          })
        })
        console.log(imagesBg);
      }

      if (backgroundImage.collections.includes('Cars') && backgroundImage.currentCollection === 'Cars') {
        const imageFiles = backgroundImage.preset.Cars.images

        Object.keys(imageFiles).forEach((key) => {
          imagesBg = Object.assign({}, imagesBg, {
            [`${key}`]: p.loadImage(imageFiles[key])
          })
        })
        console.log(imagesBg);
      }

    }

  }

  p.setup = () => {
    const canvas = p.createCanvas(canvasSize, canvasSize)
    canvas.parent(canvasContainerId)
    // const blend = getBlendStore()
    // if (blend) {
    //   p.blendMode(p.DIFFERENCE)
    // }
    // p.frameRate(100)
    p.noStroke()
    // if (blend) {
    //   p.blendMode(p.DIFFERENCE)
    // }
    // p.noLoop()
  }
  
  p.draw = () => {

    // p.background(0)
    
    const blend = getBlendStore()
    
    if (blend) {
      p.clear()
      p.blendMode(p.DIFFERENCE)
      drawModules(p)
    } else {
      drawModules(p)
    }

    // drawModules(p)

  }
}

///////////////////////////////////////////////////

function initSketch(id) {
  canvasContainerId = id

  moduleList = getModuleList()

  new p5(sketch)
}

export { initSketch }