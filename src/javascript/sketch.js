import p5 from 'p5'
import { utils } from './p5.utils.min.js'

import {
  getModuleList,
  getShapesStore,
  getParticlesStore,
  getImageStore,
  getBackgroundStore,
  getBackgroundImageStore,
  getBlendStore,
  getVinylStore,
  getText1Store,
  getLinesStore,
  get3DStore,
  getFontsStore
  // setCanvasSizeStore,
  // generatePosition
} from './store'

let moduleList = {}

let canvasContainerId = ''

let canvasSize
let parentDiv
let parentDivInfo
let parentDivWidth
let parentDivHeight


let imagesObj = {}

let imagesBgNC = {}
let imagesBgCars = {}
let imageBg

let imagesWholeVinyl = {}
let imagesLabelVinyl = {}
let imageVinyl

let fontEsenin
let mainTextFont;
let otherTextFont;

let graphics
let blendedLayer
// let layerTxtBlend

let prevModule3DX;
let prevModule3DY;


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function drawModules(p) {

  /////////////////////////////////////////// MODULE BACKGROUND

  if (moduleList.includes('Background')) {
    const background = getBackgroundStore()
    const blend = getBlendStore()

    if (background.bgTypes.includes('SolidColor') && background.currentBgType === 'SolidColor') {
      const plainColorBackground = background.preset.SolidColor.color

      if (blend.Vinyl == true) {
        blendedLayer.background(
          plainColorBackground
        )
      } else {
        p.background(
          plainColorBackground
        )
      }

    } else if (background.bgTypes.includes('Gradient') && background.currentBgType === 'Gradient') {
      const color1 = background.preset.Gradient.color1
      const color2 = background.preset.Gradient.color2
      const angle = background.preset.Gradient.angle
      // p.background(0)

      let c1 = p.color(color1)
      let c2 = p.color(color2)

      for (let i = 0; i <= canvasSize; i++) {
        let amt = p.map(i, 0, canvasSize, 0, 1)
        let c3 = p.lerpColor(c1, c2, amt)

        if (blend.Vinyl == true) {
          blendedLayer.stroke(c3)
          if (angle == 'vertical') {
            blendedLayer.line(0, i, canvasSize, i)
          }
          if (angle == 'horizontal') {
            blendedLayer.line(i, 0, i, canvasSize)
          }
        } else {
          p.stroke(c3)
          if (angle == 'vertical') {
            p.line(0, i, canvasSize, i)
          }
          if (angle == 'horizontal') {
            p.line(i, 0, i, canvasSize)
          }
        }
      }
    } else {
      if (blend.Vinyl == true) {
        blendedLayer.background(0)
      } else {
        p.background(0)
      }
    }
  }

  /////////////////////////////////////////// MODULE BACKGROUNDIMAGE

  if (moduleList.includes('BackgroundImage')) {

    const backgroundImage = getBackgroundImageStore()

    let currentBgImg

    if (backgroundImage.collections.includes('NightClub') && backgroundImage.currentCollection === 'NightClub') {
      currentBgImg = backgroundImage.preset.NightClub.current
      imageBg = imagesBgNC[currentBgImg]
    } else if (backgroundImage.collections.includes('Cars') && backgroundImage.currentCollection === 'Cars') {
      currentBgImg = backgroundImage.preset.Cars.current
      imageBg = imagesBgCars[currentBgImg]
    }

    const opacity = backgroundImage.preset.sliderValue
    p.background(imageBg, opacity)
  }

  /////////////////////////////////////////// MODULE SHAPES

  if (moduleList.includes('Shapes')) {
    p.noStroke()

    const color = getShapesStore().settings.color
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

  /////////////////////////////////////////// MODULE PARTICLES

  if (moduleList.includes('Particles')) {
    const particles = getParticlesStore()

    const color = particles.color
    p.fill(color)
      
    if (particles.options.includes('Ellipses') && particles.currentParticlesType === 'Ellipses') {
      for (let index = 0; index < particles.sliderValue; index++) {
        p.ellipse (
          (particles.particles[index][0] * canvasSize) / 100,
          (particles.particles[index][1] * canvasSize) / 100,
          particles.particles[index][2],
        )
      }
    } else if (particles.options.includes('Squares') && particles.currentParticlesType === 'Squares') {
      for (let index = 0; index < particles.sliderValue; index++) {
        p.square (
          (particles.particles[index][0] * canvasSize) / 100,
          (particles.particles[index][1] * canvasSize) / 100,
          particles.particles[index][2],
        )
      }
    } else if (particles.options.includes('Mix') && particles.currentParticlesType === 'Mix') {
      for (let index = 0; index < particles.sliderValue; index++) {
        p.square (
          (particles.particles[index][0] * canvasSize) / 100,
          (particles.particles[index][1] * canvasSize) / 100,
          particles.particles[index][2],
        )
        p.ellipse (
          (particles.particles[index][3] * canvasSize) / 100,
          (particles.particles[index][4] * canvasSize) / 100,
          particles.particles[index][5],
        )
      }
    }
  }

  /////////////////////////////////////////// VINYL

  if (moduleList.includes('Vinyl')) {

    const vinyl = getVinylStore()

    let currentVinylImg

    if (vinyl.vinylTypes.includes('Whole') && vinyl.currentVinylType === 'Whole') {
      currentVinylImg = vinyl.preset.Whole.current
      imageVinyl = imagesWholeVinyl[currentVinylImg]
    } else if (vinyl.vinylTypes.includes('Label') && vinyl.currentVinylType === 'Label') {
      currentVinylImg = vinyl.preset.Label.current
      imageVinyl = imagesLabelVinyl[currentVinylImg]
    }

    let sliderValue = vinyl.preset.sliderValue
    let equivalentSize

    if (vinyl.preset.bigger == true) {
      equivalentSize = ((sliderValue * (canvasSize+10)) / 100) + 300
    } else if (vinyl.preset.bigger == false) {
      equivalentSize = (sliderValue * canvasSize) / 100
    }

    let x = (canvasSize - equivalentSize) / 2;
    let y = (canvasSize - equivalentSize) / 2;

    let opacity = parseFloat(vinyl.preset.sliderOpacity)
    // p.tint(255, opacity)

    const blend = getBlendStore()
    
    if (blend.Vinyl == true) {
      // console.log('VINYL');
      p.image(blendedLayer, 0, 0)
      blendedLayer.clear()
      blendedLayer.tint(255, opacity)

      // BLEND, 
      // ADD, 
      // DARKEST, 
      // LIGHTEST, 
      // DIFFERENCE, 
      // EXCLUSION, 
      // MULTIPLY, 
      // OVERLAY, 
      // HARD_LIGHT, 
      // SOFT_LIGHT, 
      // DODGE, 
      // BURN 

      blendedLayer.blendMode(p.BURN)
      blendedLayer.image(
        imageVinyl,
        x,
        y,
        equivalentSize,
        equivalentSize
      )
    } else {
      p.tint(255, opacity)
      p.image(
        imageVinyl,
        x,
        y,
        equivalentSize,
        equivalentSize
      )
    }

    // p.background(imageVinyl, opacity)
  }

  /////////////////////////////////////////// MODULE IMAGE

  if (moduleList.includes('Image')) {
    p.noTint()
    const { current } = getImageStore()
    const image = imagesObj[current]

    let scaleFactor = canvasSize / Math.max(image.width, image.height)

    let scaledWidth = image.width * scaleFactor
    let scaledHeight = image.height * scaleFactor

    let x = (canvasSize - scaledWidth) / 2
    let y = (canvasSize - scaledHeight) / 2

    if (getImageStore().pixelate == true) {
      // let pixelSize = 5
      // for (let y = 0; y < scaledWidth; y += pixelSize) {
      //   for (let x = 0; x < scaledHeight; x += pixelSize) {
      //     // Get the color of the pixel at (x, y)
      //     let col = image.get(x, y);
      //     // Fill a square with the color of the current pixel
      //     p.fill(col);
      //     // Draw a rectangle at (x, y) with size of pixelSize x pixelSize
      //     p.rect(x, y, pixelSize, pixelSize);
      //   }
      // }

      let pixelSize = 5;
      for (let j = 0; j < scaledHeight; j += pixelSize) {
        for (let i = 0; i < scaledWidth; i += pixelSize) {
          // Get the color of the pixel at (i, j) in the scaled image
          let col = image.get(i / scaleFactor, j / scaleFactor);
          // Calculate the position to draw the pixelated pixel
          let drawX = x + i;
          let drawY = y + j;
          // Fill a square with the color of the current pixel
          p.fill(col);
          // Draw a rectangle at (drawX, drawY) with size of pixelSize x pixelSize
          p.rect(drawX, drawY, pixelSize, pixelSize);
        }
      }

    } else {
      p.image(
        image,
        x,
        y,
        scaledWidth,
        scaledHeight
      )
    }
  }

  /////////////////////////////////////////// MODULE lINES

  if (moduleList.includes('Lines')) {
    const lines = getLinesStore()
    // console.log('LINES');

    p.stroke(lines.color)
    p.strokeWeight(lines.strokeWeight);
    for (let index = 0; index < lines.lines.length; index++) {
      p.line(lines.lines[index][0], lines.lines[index][1], lines.lines[index][2], lines.lines[index][3]);
    }
  }

  /////////////////////////////////////////// MODULE TEXT1

  if (moduleList.includes('Text1')) {

    const text1 = getText1Store()

    ////// STYLE
    p.noStroke()
    p.fill(text1.color)
    // console.log(text1.font);
    p.textFont(text1.font)
    p.textAlign(p.CENTER, p.CENTER);
    p.textWrap(p.WORD);
    

    //////////////////// MAIN TEXT
    let textContent
    if (text1.upperCase == true) {
      textContent = text1.text.toUpperCase()
    } else {
      textContent = text1.text
    }

    let x
    let y
    if (text1.random == true) {
      const position1 = text1.txtpositions[0]
      x = (position1.x * canvasSize) / 100
      y = (position1.y * canvasSize) / 100
    } else {
      x = canvasSize / 2;
      y = canvasSize / 2;
    }


    let presetSize = text1.size


    p.textSize(presetSize)
    
    p.rectMode(p.CENTER);

    let textWidth = p.textWidth(textContent)

    // const blend = getBlendStore()
    // if (blend.Text1 == true) {
    //   p.image(blendedLayer, 0, 0)
    //   blendedLayer.clear()
    //   // blendedLayer.blendMode(p.DIFFERENCE)

    //   blendedLayer.text(textContent, x, y, canvasSize, canvasSize);
    // } else {
    //   p.text(textContent, x, y, canvasSize, canvasSize);
    // }

    p.text(textContent, x, y, canvasSize, canvasSize);


    //////// DOP TEXT

    if (text1.dopText == true) {
      p.textAlign(p.CENTER, p.LEFT)
      const maxSize = (2 * canvasSize) / 100
      // p.textFont(otherTextFont);

      let otherText1 = "Dance"
      let otherText2 = "Music"

      const position1 = text1.txtpositions[0]
      const position2 = text1.txtpositions[1]

      // Text 1
      let x1 = (position1.x * canvasSize) / 100
      let y1 = (position1.y * canvasSize) / 100
      let textSize1 = maxSize
      p.textSize(textSize1)
      let textWidth1 = p.textWidth(otherText1)

      while (x1 - textWidth1 / 2 < 0 || x1 + textWidth1 / 2 > p.width - 10) {
        textSize1 -= 1
        p.textSize(textSize1)
        textWidth1 = p.textWidth(otherText1)
      }
      p.text(otherText1, x1, y1)

      // Text 2
      let x2 = (position2.x * canvasSize) / 100
      let y2 = (position2.y * canvasSize) / 100
      let textSize2 = maxSize
      p.textSize(textSize2)
      let textWidth2 = p.textWidth(otherText2)

      while (x2 - textWidth2 / 2 < 0 || x2 + textWidth2 / 2 > p.width - 10 || Math.abs(y2 - y1) < textSize2) {
        textSize2 -= 1
        p.textSize(textSize2)
        textWidth2 = p.textWidth(otherText2);
      }
      p.text(otherText2, x2, y2)
    }





  }

  /////////////////////////////////////////// MODULE 3D

  if (moduleList.includes('Module3D')) {
    p.image(graphics, 0, 0)
    graphics.clear()
    const module3D = get3DStore()

    if (module3D.x !== prevModule3DX || module3D.y !== prevModule3DY) {
      graphics.rotateX(module3D.x);
      graphics.rotateY(module3D.y);
      
      prevModule3DX = module3D.x;
      prevModule3DY = module3D.y;
    }

    graphics.noStroke()
    graphics.directionalLight(189, 98, 189, 100, 0, 0)
    graphics.directionalLight(54, 98, 189, -100, 0, 0)
    graphics.fill(255)

    if (module3D.options.includes('Torus') && module3D.current3DType === 'Torus') {
      graphics.torus(30, 15, 50, 50);
    } else if (module3D.options.includes('Square') && module3D.current3DType === 'Square') {
      graphics.box(30, 15, 50, 50);
    }

  }

}










////////////////////////////////////////////////////////////////////////////         SKETCH


function sketch(p) {

  p.preload = () => {

    //////////////////////////////////////////////////// IMAGE OBJ

    if (moduleList.includes('Image')) {
      const imageFiles = getImageStore().images
      // console.log('SKETCH IMGs', imageFiles);

      Object.keys(imageFiles).forEach((key) => {
        imagesObj = Object.assign({}, imagesObj, {
          [`${key}`]: p.loadImage(imageFiles[key])
        })
      })
    }

    //////////////////////////////////////////////////// IMAGE BG

    if (moduleList.includes('BackgroundImage')) {
      const backgroundImage = getBackgroundImageStore()

      if (backgroundImage.collections.includes('NightClub')) {
        const imageFiles1 = backgroundImage.preset.NightClub.images

        Object.keys(imageFiles1).forEach((key) => {
          imagesBgNC = Object.assign({}, imagesBgNC, {
            [`${key}`]: p.loadImage(imageFiles1[key])
          })
        })
      }
      if (backgroundImage.collections.includes('Cars')) {
        const imageFiles2 = backgroundImage.preset.Cars.images

        Object.keys(imageFiles2).forEach((key) => {
          imagesBgCars = Object.assign({}, imagesBgCars, {
            [`${key}`]: p.loadImage(imageFiles2[key])
          })
        })
      }
    }

    //////////////////////////////////////////////////// IMAGE VINYL

    if (moduleList.includes('Vinyl')) {
      const vinyl = getVinylStore()

      if (vinyl.vinylTypes.includes('Whole')) {
        const imageFiles = vinyl.preset.Whole.images

        Object.keys(imageFiles).forEach((key) => {
          imagesWholeVinyl = Object.assign({}, imagesWholeVinyl, {
            [`${key}`]: p.loadImage(imageFiles[key])
          })
        })
      }
      if (vinyl.vinylTypes.includes('Label')) {
        const imageFiles = vinyl.preset.Label.images

        Object.keys(imageFiles).forEach((key) => {
          imagesLabelVinyl = Object.assign({}, imagesLabelVinyl, {
            [`${key}`]: p.loadImage(imageFiles[key])
          })
        })
      }
    }

    //////////////////////////////////////////////////// FONTS

    // const fontsFiles = getFontsStore()
    // console.log(fontsFiles);

    fontEsenin = p.loadFont('../fonts/esenin-script-one.ttf');
    mainTextFont = p.loadFont('../fonts/esenin-script-one.ttf');
    otherTextFont = p.loadFont('../fonts/esenin-script-one.ttf');
    p.loadFont('../fonts/Acosta.otf')
    p.loadFont('../fonts/wonky.otf')
    p.loadFont('../fonts/Bolgarus.otf')
    p.loadFont('../fonts/YUNGA-Display.otf')
    p.loadFont('../fonts/typekini.ttf')

  }

  p.setup = () => {

    // p.frameRate(2)
    
    let canvas = p.createCanvas(canvasSize, canvasSize)
    canvas.parent(canvasContainerId)

    if (moduleList.includes('Module3D')) {
      graphics = p.createGraphics(canvasSize, canvasSize, p.WEBGL)
      graphics.camera(0, 0, 50*p.sqrt(3), 0, 0, 0, 0, 1, 0);
      graphics.perspective(p.PI/3, 1, 5*p.sqrt(3), 500*p.sqrt(3));
    }
    
    const blend = getBlendStore()
    if (blend) {
      blendedLayer = p.createGraphics(canvasSize, canvasSize)
    }
  }
  
  p.windowResized = () => {
    
    parentDiv = document.getElementById(canvasContainerId);
    parentDivInfo = parentDiv.getBoundingClientRect();
    parentDivWidth = parentDivInfo.width;
    parentDivHeight = parentDivInfo.height;
    
    canvasSize = Math.min(parentDivWidth, parentDivHeight)
    
    p.resizeCanvas(canvasSize, canvasSize)
  }
  
  p.draw = () => {
    drawModules(p)
    
    const blend = getBlendStore()
    if (blend.Text1 == true) {
      p.clear()
      p.blendMode(p.DIFFERENCE)
      drawModules(p)
    } else {
      drawModules(p)
    }
  }
}

///////////////////////////////////////////////////

function initSketch(id, size) {
  canvasContainerId = id

  canvasSize = size
  // console.log('SKETCH SIZE', size);
  // generatePosition(size)

  parentDiv = document.getElementById(canvasContainerId);
  parentDivInfo = parentDiv.getBoundingClientRect();

  moduleList = getModuleList()

  utils = new p5.Utils();

  new p5(sketch)
}

export { initSketch }