import p5 from 'p5'
// import utils from './p5.utils.min.js'
import {sample} from './utilities.js'

import {
  getModuleList,
  getShapesStore,
  getParticlesStore,
  getImageStore,
  getBackgroundStore,
  getBackgroundImageStore,
  getBlendStore,
  getVinylStore,
  getLinesStore,
  get3DStore,
  getBasicTypoStore,
  getOverlayStore,
  getFontsStore
  // setCanvasSizeStore,
  // generatePosition
} from './store'

// let tools = new p5.Utils();
// let utils

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

let imagesPlasticOverlay = {}
let imagesStickerOverlay = {}
let imageOverlay

let fontEsenin
let mainTextFont
let otherTextFont

let ptrootuiReg
let ptrootuiBold
let ptrootuiLight

let graphics
let blendedLayer
// let gradientBuffer
// let shapesLayer
// let layerTxtBlend
let vinylLayer

let prevModule3DX
let prevModule3DY

// FOR GRADIENT
let gradientBg
let c1
let c2

//FOR NOISE
let noiseBg
let pixelsBg
// let r0
// let r1
// let r2
// let r3
// let inc


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

window.resetNoise = function() {
  genNoise()
}

window.resetPixels = function() {
  genPixels()
}


function genNoise() {
  let yoff = 0
  let seed = noiseBg.random(1000);
  let inc

  const background = getBackgroundStore()
  if (background.preset.Noise.currentNoiseType == 'Small') {
    inc = noiseBg.random(0.95, 1)
  } else if (background.preset.Noise.currentNoiseType == 'Medium') {
    inc = noiseBg.random(0.2, 0.25)
  } else if(background.preset.Noise.currentNoiseType == 'Big') {
    inc = noiseBg.random(0, 0.01)
  }

  let redMin = noiseBg.random(0, 100);
  let redMax = noiseBg.random(150, 255);
  let greenMin = noiseBg.random(0, 100);
  let greenMax = noiseBg.random(150, 255);
  let blueMin = noiseBg.random(0, 100);
  let blueMax = noiseBg.random(150, 255);

  noiseBg.pixelDensity(1)
  noiseBg.loadPixels()

  for (let y = 0; y < canvasSize; y++) {
    let xoff = 0
    for (let x = 0; x < canvasSize; x++) {
      let index = (x + y * canvasSize) * 4
      let noiseVal = noiseBg.noise(xoff, yoff, seed)
      // blueish-purple noise
      // let r = noiseBg.map(noiseVal, 0, 1, 0, 255)
      // let g = noiseBg.map(noiseVal, 0, 1, 100, 200)
      // let b = noiseBg.map(noiseVal, 0, 1, 200, 255)
      let r = noiseBg.map(noiseVal, 0, 1, redMin, redMax)
      let g = noiseBg.map(noiseVal, 0, 1, greenMin, greenMax)
      let b = noiseBg.map(noiseVal, 0, 1, blueMin, blueMax)

      noiseBg.pixels[index+0] = r
      noiseBg.pixels[index+1] = g
      noiseBg.pixels[index+2] = b
      noiseBg.pixels[index+3] = 255
      xoff += inc
    }
    yoff += inc
  }
  noiseBg.updatePixels()
}


function genPixels() {
  pixelsBg.noStroke()
  let inc = 0.01
  let scl = 10

  let cols = canvasSize/scl
  let rows = canvasSize/scl
  
  let yoff = 0
  for (let y = 0; y < rows; y++) {
    let xoff = 0
    for (let x = 0; x < cols; x++) {
      // let noiseVal = noiseBg.noise(xoff, yoff, seed) * 255
      let r = pixelsBg.random(255)
      let g = pixelsBg.random(255)
      let b = pixelsBg.random(255)
      xoff += inc
      pixelsBg.fill(r, g, b)
      pixelsBg.rect(x * scl, y * scl, scl, scl)
    }
    yoff += inc
  }
}

function glow(p, glowColor, blur) { 
  p.drawingContext.shadowColor = p.color(glowColor)
  p.drawingContext.shadowBlur = blur
}




function drawModules(p) {

  /////////////////////////////////////////// MODULE BACKGROUND

  if (moduleList.includes('Background')) {
    const background = getBackgroundStore()
    const blend = getBlendStore()

    if (background.backgroundTypes.includes('SolidColor') && background.currentBackgroundType === 'SolidColor') {
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

    } else if (background.backgroundTypes.includes('Gradient') && background.currentBackgroundType === 'Gradient') {
      const color1 = background.preset.Gradient.color1
      const color2 = background.preset.Gradient.color2
      const angle = background.preset.Gradient.angle

      p.clear()
      // let gradientBg

      if (blend.Vinyl == true) {
        if (angle == 'vertical') {
          gradientBg = blendedLayer.drawingContext.createLinearGradient (0, 0, 0, canvasSize)
        }
        if (angle == 'horizontal') {
          gradientBg = blendedLayer.drawingContext.createLinearGradient (0, 0, canvasSize, 0)
        }
      } else {
        if (angle == 'vertical') {
          gradientBg = p.drawingContext.createLinearGradient (0, 0, 0, canvasSize)
        }
        if (angle == 'horizontal') {
          gradientBg = p.drawingContext.createLinearGradient (0, 0, canvasSize, 0)
        }
      }

      let colorA
      let colorB
      if (typeof color1 == 'object') {
        colorA = p.color(color1)
      } else {
        colorA = color1
      }
      if (typeof color2 == 'object') {
        colorB = p.color(color2)
      } else {
        colorB = color2
      }

      gradientBg.addColorStop(0, colorA)
      gradientBg.addColorStop(1, colorB)

      if (blend.Vinyl == true) {
        blendedLayer.drawingContext.fillStyle = gradientBg
        blendedLayer.rect(0, 0, canvasSize, canvasSize);
      } else {
        p.drawingContext.fillStyle = gradientBg
        p.rect(canvasSize/2, canvasSize/2, canvasSize, canvasSize)
      }
      
      // p.drawingContext.fillStyle = gradientBg

    } else if (background.backgroundTypes.includes('Noise') && background.currentBackgroundType === 'Noise') {
      p.clear()
      p.background(0)
      p.image(noiseBg, 0, 0)
      p.pixelDensity()
      p.noStroke()
    } else if (background.backgroundTypes.includes('Pixels') && background.currentBackgroundType === 'Pixels') {
      p.clear()
      p.background(0)
      p.image(pixelsBg, 0, 0)
      p.pixelDensity()
      p.noStroke()
    }
  }

  /////////////////////////////////////////// MODULE BACKGROUNDIMAGE

  if (moduleList.includes('BackgroundImage')) {

    const backgroundImage = getBackgroundImageStore()

    let currentBgImg

    if (backgroundImage.backgroundImageCollections.includes('NightClub') && backgroundImage.currentBackgroundImageCollection === 'NightClub') {
      currentBgImg = backgroundImage.preset.NightClub.current
      imageBg = imagesBgNC[currentBgImg]
    } else if (backgroundImage.backgroundImageCollections.includes('Cars') && backgroundImage.currentBackgroundImageCollection === 'Cars') {
      currentBgImg = backgroundImage.preset.Cars.current
      imageBg = imagesBgCars[currentBgImg]
    }

    const opacity = backgroundImage.opacity
    p.background(imageBg, opacity)
  }

  /////////////////////////////////////////// MODULE SHAPES

  if (moduleList.includes('Shapes')) {
    const shapes = getShapesStore()

    if (shapes.types.includes('Ellipses') && shapes.currentType == 'Ellipses') {
      if (shapes.settings.gradient == true) {
        const background = getBackgroundStore()
        const color1 = background.preset.Gradient.color1
        const color2 = background.preset.Gradient.color2
        // const angle = background.preset.Gradient.angle
  
        c1 = p.color(color2)
        c2 = p.color(color1)
  
        p.noStroke()
  
        let gradientShapes = p.drawingContext.createLinearGradient(
          0, 0, canvasSize, canvasSize
        )
        gradientShapes.addColorStop(0, c1)
        gradientShapes.addColorStop(1, c2)
  
        p.drawingContext.fillStyle = gradientShapes
      } else {
        p.fill(shapes.settings.color)
      }
  
      /////// shapes
  
      const Value = shapes.settings.sliderValue
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
    } else if (shapes.types.includes('Custom1') && shapes.currentType == 'Custom1') {
      p.fill(shapes.settings.color)
      p.beginShape()
      p.curveVertex(100, 50)
      p.curveVertex(200, 20)
      p.curveVertex(200, 100)
      p.curveVertex(50, 75)
      p.curveVertex(25, 50)
      // p.bezierVertex(100, 50)
      // p.bezierVertex(200, 20)
      // p.bezierVertex(200, 100)
      // p.bezierVertex(50, 75)
      // p.bezierVertex(25, 50)
      // p.vertex(100, 200)
      // p.vertex(200, 50)
      // p.vertex(300, 200)
      p.endShape(p.CLOSE)
      p.noFill()
    } else if (shapes.types.includes('Custom2') && shapes.currentType == 'Custom2') {
      p.fill(shapes.settings.color)
      // p.stroke(255)
      p.beginShape()
      p.angleMode(p.DEGREES)
      let spacing = 50
      for (let a = 0; a < 360; a += spacing) {
        let x = 100 * p.sin(a) + 200
        let y = 100 * p.cos(a) + 200
        p.vertex(x, y)
      }
      p.endShape(p.CLOSE)
      p.noFill()
    }


  }

  /////////////////////////////////////////// MODULE PARTICLES

  if (moduleList.includes('Particles')) {
    const particles = getParticlesStore()

    const color = particles.color
    if (particles.stroke == true) {
      p.stroke(color)
    } else {
      // p.tint(color, particles.opacity)
      p.fill(color)
      // p.noTint()
    }

    // console.log(color);
      
    if (particles.options.includes('Ellipses') && particles.currentParticlesType === 'Ellipses') {
      for (let index = 0; index < particles.sliderValue; index++) {
        p.ellipse (
          (particles.particles[index][0] * canvasSize) / 100,
          (particles.particles[index][1] * canvasSize) / 100,
          (particles.particles[index][2] * canvasSize) / 100
          // particles.particles[index][2],
        )
      }
    } else if (particles.options.includes('Squares') && particles.currentParticlesType === 'Squares') {
      for (let index = 0; index < particles.sliderValue; index++) {
        p.square (
          (particles.particles[index][0] * canvasSize) / 100,
          (particles.particles[index][1] * canvasSize) / 100,
          (particles.particles[index][2] * canvasSize) / 100
          // particles.particles[index][2],
        )
      }
    } else if (particles.options.includes('Mix') && particles.currentParticlesType === 'Mix') {
      for (let index = 0; index < particles.sliderValue; index++) {
        p.square (
          (particles.particles[index][0] * canvasSize) / 100,
          (particles.particles[index][1] * canvasSize) / 100,
          (particles.particles[index][2] * canvasSize) / 100
          // particles.particles[index][2],
        )
        p.ellipse (
          (particles.particles[index][3] * canvasSize) / 100,
          (particles.particles[index][4] * canvasSize) / 100,
          (particles.particles[index][5] * canvasSize) / 100
          // particles.particles[index][5],
        )
      }
    }

    p.noTint()
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

    let sliderValue = vinyl.sliderValue
    let equivalentSize

    if (vinyl.bigger == true) {
      equivalentSize = ((sliderValue * (canvasSize+10)) / 100) + 300
    } else if (vinyl.bigger == false) {
      equivalentSize = (sliderValue * canvasSize) / 100
    }

    let x = (canvasSize - equivalentSize) / 2;
    let y = (canvasSize - equivalentSize) / 2;

    let opacity = parseFloat(vinyl.sliderOpacity)
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
      p.image(vinylLayer, 0, 0)
      vinylLayer.clear()
      vinylLayer.tint(255, opacity)
      vinylLayer.image(
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
    // const { current } = getImageStore()
    // const image = imagesObj[current]

    const objects = getImageStore()

    let currentObject
    let imageObject

    if (objects.collections.includes('Shoes') && objects.currentCollection == 'Shoes') {
      currentObject = objects.preset.Shoes.current
      imageObject = imagesObj[currentObject]
    }

    let scaleFactor = canvasSize / Math.max(imageObject.width, imageObject.height)

    let scaledWidth = imageObject.width * scaleFactor
    let scaledHeight = imageObject.height * scaleFactor

    let x = (canvasSize - scaledWidth) / 2
    let y = (canvasSize - scaledHeight) / 2

    p.image(
      imageObject,
      x,
      y,
      scaledWidth,
      scaledHeight
    )

    // if (getImageStore().pixelate == true) {
    //   // let pixelSize = 5
    //   // for (let y = 0; y < scaledWidth; y += pixelSize) {
    //   //   for (let x = 0; x < scaledHeight; x += pixelSize) {
    //   //     // Get the color of the pixel at (x, y)
    //   //     let col = image.get(x, y);
    //   //     // Fill a square with the color of the current pixel
    //   //     p.fill(col);
    //   //     // Draw a rectangle at (x, y) with size of pixelSize x pixelSize
    //   //     p.rect(x, y, pixelSize, pixelSize);
    //   //   }
    //   // }

    //   let pixelSize = 5;
    //   for (let j = 0; j < scaledHeight; j += pixelSize) {
    //     for (let i = 0; i < scaledWidth; i += pixelSize) {
    //       // Get the color of the pixel at (i, j) in the scaled image
    //       let col = image.get(i / scaleFactor, j / scaleFactor);
    //       // Calculate the position to draw the pixelated pixel
    //       let drawX = x + i;
    //       let drawY = y + j;
    //       // Fill a square with the color of the current pixel
    //       p.fill(col);
    //       // Draw a rectangle at (drawX, drawY) with size of pixelSize x pixelSize
    //       p.rect(drawX, drawY, pixelSize, pixelSize);
    //     }
    //   }

    // } else {
    //   p.image(
    //     image,
    //     x,
    //     y,
    //     scaledWidth,
    //     scaledHeight
    //   )
    // }
  }

  /////////////////////////////////////////// MODULE lINES

  if (moduleList.includes('Lines')) {
    const lines = getLinesStore()

    p.stroke(lines.color)
    p.strokeWeight(lines.strokeWeight);
    for (let index = 0; index < lines.lines.length; index++) {
      p.line(
        (lines.lines[index][0] * canvasSize) / 100,
        (lines.lines[index][1] * canvasSize) / 100,
        (lines.lines[index][2] * canvasSize) / 100,
        (lines.lines[index][3] * canvasSize) / 100
      );
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

    if (module3D.types.includes('Torus') && module3D.current3DType === 'Torus') {
      graphics.torus(30, 15, 50, 50);
    } else if (module3D.types.includes('Square') && module3D.current3DType === 'Square') {
      graphics.box(30, 15, 50, 50);
    }

  }

  /////////////////////////////////////////// MODULE BASICTYPO

  if (moduleList.includes('BasicTypo')) {
    const basicTypo = getBasicTypoStore()
    let mainText
    let otherTexts = basicTypo.textarea

    
    // p.textFont(basicTypo.font)
    
    if (basicTypo.styles.includes('NORMAL') && basicTypo.styleMainText == 'NORMAL' && basicTypo.font == 'PT-Root-UI') {
      p.textFont(ptrootuiReg)
    } else if (basicTypo.styles.includes('BOLD') && basicTypo.styleMainText == 'BOLD' && basicTypo.font == 'PT-Root-UI') {
      p.textFont(ptrootuiBold)
    } else if (basicTypo.styles.includes('LIGHT') && basicTypo.styleMainText == 'LIGHT' && basicTypo.font == 'PT-Root-UI') {
      p.textFont(ptrootuiLight)
    } else {
      p.textFont(basicTypo.font)
    }
    
    ////////////////////////////  STYLES
    
    p.noStroke()
    p.textStyle(basicTypo.styleMainText)
    p.textWrap(p.WORD)
    p.fill(basicTypo.color)

    if (basicTypo.glow == true) {
      glow(p, (255), 5)
      glow(p, (255), 10)
      glow(p, (255), 30)
    }

    if (basicTypo.stroke == true) {
      p.noFill()
      p.stroke(basicTypo.color)
      p.strokeWeight((0.9 * canvasSize) / 100)

      // let gradient = p.drawingContext.createConicGradient(0, canvasSize/2, canvasSize/2,)
      // const background = getBackgroundStore()
      // const color1 = background.preset.Gradient.color1
      // const color2 = background.preset.Gradient.color2
      // gradient.addColorStop(0, p.color(color1))
      // gradient.addColorStop(1, p.color(color2))
      // p.drawingContext.strokeStyle = gradient
    }

    ////////////////////////////  OTHER TEXT
    if (basicTypo.dopText == true) {
      p.rectMode(p.CORNER)
      
      let presetSizeTextarea = basicTypo.sizeTextarea
      let presetLeadingSizeTextarea = basicTypo.leadingTextarea
      // console.log(presetSizeTextarea);
      let otherTextSize = (presetSizeTextarea * canvasSize) / 100
      let otherTextLeadingSize = (presetLeadingSizeTextarea * canvasSize) / 100
      p.textSize(otherTextSize)
      // p.textLeading(otherTextSize-2)
      p.textLeading(otherTextLeadingSize)
      
      const prct10 = (10 * canvasSize) / 100
      let width = (canvasSize - prct10) / 3

      if (typeof otherTexts === 'string') {
        if (basicTypo.upperCase == true) {
          otherTexts = basicTypo.textarea.toUpperCase()
        } else {
          otherTexts = basicTypo.textarea
        }
        const positionTxt = basicTypo.txtpositions[0]
        let x = positionTxt.x
        let y = positionTxt.y
        if (y == 5) {
          p.textAlign(p.LEFT, p.TOP)
        } else {
          p.textAlign(p.LEFT, p.BOTTOM)
        }
        x = (positionTxt.x * canvasSize) / 100
        y = (positionTxt.y * canvasSize) / 100
        p.text(otherTexts, x, y, width)
      } else {
        for (let i = 0; i < otherTexts.length; i++) {
          const currentText = otherTexts[i].value;
          const positionTxt = basicTypo.txtpositions[i];
          let x = positionTxt.x
          let y = positionTxt.y
          if (y == 5) {
            p.textAlign(p.LEFT, p.TOP)
          } else {
            p.textAlign(p.LEFT, p.BOTTOM)
          }
          x = (positionTxt.x * canvasSize) / 100;
          y = (positionTxt.y * canvasSize) / 100;
          p.text(currentText, x, y, width);
        }
      }

    }

    //MAIN TEXT
    p.textAlign(p.CENTER, p.CENTER)
    if (basicTypo.upperCase == true) {
      mainText = basicTypo.mainText.toUpperCase()
    } else {
      mainText = basicTypo.mainText
    }

    let presetSizeMainText = basicTypo.sizeMainText.sliderValue
    let presetLeadingSizeMainText = basicTypo.leadingMainText
    let MainTextSize = (presetSizeMainText * canvasSize) / 100
    let MainTextLeadingSize = (presetLeadingSizeMainText * canvasSize) / 100
    p.textSize(MainTextSize)
    p.textLeading(MainTextLeadingSize)
    p.rectMode(p.CENTER)

    let xmain = canvasSize / 2;
    let ymain = canvasSize / 2;
    // p.text(mainText, xmain, ymain, canvasSize, canvasSize)
    let color = 0
    let txtSize = MainTextSize
    if (basicTypo.chrome == true) {
      for (let i = 10; i >= 0; i--) {
        let offsetX = i * 3;
        let offsetY = i * 3;
        // let gradientFill = p.drawingContext.createLinearGradient(0, 0, canvasSize/2, canvasSize/2,)
        // gradientFill.addColorStop(0, p.color(0))
        // gradientFill.addColorStop(0.5, p.color(255))
        // gradientFill.addColorStop(1, p.color(0))
        // p.drawingContext.fillStyle = gradientFill
        p.fill(color, color, color);
        // p.text(mainText, xmain + offsetX, ymain + offsetY);
        p.textSize(txtSize)
        p.text(mainText, xmain , ymain);
        color += 20
        txtSize -= 1
      }
      p.drawingContext.shadowBlur = 10
      p.drawingContext.shadowColor = p.color(255)
      p.stroke(255);
      // let gradient = p.drawingContext.createConicGradient( 0, canvasSize/2, canvasSize/2,)
      // gradient.addColorStop(0, p.color(0))
      // gradient.addColorStop(0.5, p.color(255))
      // gradient.addColorStop(1, p.color(0))
      // p.drawingContext.strokeStyle = gradient
      // p.strokeWeight((0.3 * canvasSize) / 100)
      // let gradientFill = p.drawingContext.createLinearGradient(0, 0, canvasSize/2, canvasSize/2,)
      // gradientFill.addColorStop(0, p.color(0))
      // gradientFill.addColorStop(0.5, p.color(255))
      // gradientFill.addColorStop(1, p.color(0))
      // p.drawingContext.fillStyle = gradientFill
      // p.noFill()
      p.text(mainText, xmain, ymain);
    } else {
      p.text(mainText, xmain, ymain, canvasSize, canvasSize)
    }


    p.drawingContext.shadowBlur = 0
  }


  /////////////////////////////////////////// MODULE CRAZYTYPO

  // if (moduleList.includes('crazyTypo')) {
  //   let characters = crazyTypo.text.split('')
  //   let fontCollection = ['Acosta', 'esenin-script-one', 'wonky', 'Bolgarus', 'typekini', 'AUSRINE', 'YUNGA-Display']
  //   // let font sample(fontCollection)
  //   // for (let index = 0; index < fontCollection.length; index++) {
  //   //   const element = array[index];
      
  //   // }
  // }

    /////////////////////////////////////////// MODULE BACKGROUNDIMAGE

  if (moduleList.includes('Overlay')) {
    const overlay = getOverlayStore()

    let currentOverlay

    if (overlay.collections.includes('Plastic') && overlay.currentCollection === 'Plastic') {
      currentOverlay = overlay.preset.Plastic.current
      imageOverlay = imagesPlasticOverlay[currentOverlay]
    } else if (overlay.collections.includes('Stickers') && overlay.currentCollection === 'Stickers') {
      currentOverlay = overlay.preset.Stickers.current
      imageOverlay = imagesStickerOverlay[currentOverlay]
    }

    let opacity = parseFloat(overlay.opacity)
    // console.log(opacity);
    // p.background(imageBg, opacity)
    p.image(blendedLayer, 0, 0)
    blendedLayer.clear()
    blendedLayer.tint(255, opacity)
    blendedLayer.blendMode(p.ADD)
    blendedLayer.image(
      imageOverlay,
      0,
      0,
      canvasSize,
      canvasSize
    )
  }

}










////////////////////////////////////////////////////////////////////////////         SKETCH


function sketch(p) {

  p.preload = () => {

    //////////////////////////////////////////////////// IMAGE OBJ

    if (moduleList.includes('Image')) {
      const objects = getImageStore()

      if (objects.collections.includes('Shoes')) {
        const imageFiles = objects.preset.Shoes.images

        Object.keys(imageFiles).forEach((key) => {
          imagesObj = Object.assign({}, imagesObj, {
            [`${key}`]: p.loadImage(imageFiles[key])
          })
        })
      }
    }

    //////////////////////////////////////////////////// IMAGE BG

    if (moduleList.includes('BackgroundImage')) {
      const backgroundImage = getBackgroundImageStore()

      if (backgroundImage.backgroundImageCollections.includes('NightClub')) {
        const imageFiles1 = backgroundImage.preset.NightClub.images

        Object.keys(imageFiles1).forEach((key) => {
          imagesBgNC = Object.assign({}, imagesBgNC, {
            [`${key}`]: p.loadImage(imageFiles1[key])
          })
        })
      }
      if (backgroundImage.backgroundImageCollections.includes('Cars')) {
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

    //////////////////////////////////////////////////// IMAGE OVERLAY

    if (moduleList.includes('Overlay')) {
      const overlay = getOverlayStore()

      if (overlay.collections.includes('Plastic')) {
        const imageFiles = overlay.preset.Plastic.images

        Object.keys(imageFiles).forEach((key) => {
          imagesPlasticOverlay = Object.assign({}, imagesPlasticOverlay, {
            [`${key}`]: p.loadImage(imageFiles[key])
          })
        })
      }
      if (overlay.collections.includes('Stickers')) {
        const imageFiles = overlay.preset.Stickers.images

        Object.keys(imageFiles).forEach((key) => {
          imagesStickerOverlay = Object.assign({}, imagesStickerOverlay, {
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

    ptrootuiReg = p.loadFont('../fonts/PT-Root-UI_Regular.woff')
    ptrootuiBold = p.loadFont('../fonts/PT-Root-UI_Bold.woff')
    ptrootuiLight = p.loadFont('../fonts/PT-Root-UI_Light.woff')
    
    p.loadFont('../fonts/Acosta.otf')
    p.loadFont('../fonts/wonky.otf')
    p.loadFont('../fonts/Bolgarus.otf')
    p.loadFont('../fonts/YUNGA-Display.otf')
    p.loadFont('../fonts/typekini.ttf')
    p.loadFont('../fonts/AUSRINE.ttf')

  }

  p.setup = () => {
    
    let canvas = p.createCanvas(canvasSize, canvasSize)
    canvas.parent(canvasContainerId)

    if (moduleList.includes('Vinyl')) {
      vinylLayer = p.createGraphics(canvasSize, canvasSize)
    }

    if (moduleList.includes('Module3D')) {
      graphics = p.createGraphics(canvasSize, canvasSize, p.WEBGL)
      graphics.camera(0, 0, 50*p.sqrt(3), 0, 0, 0, 0, 1, 0);
      graphics.perspective(p.PI/3, 1, 5*p.sqrt(3), 500*p.sqrt(3));
    }

    const background = getBackgroundStore()
    if (moduleList.includes('Background') && background.backgroundTypes.includes('Noise')) {
      noiseBg = p.createGraphics(canvasSize, canvasSize)
      noiseBg.noLoop()
      genNoise()
      pixelsBg = p.createGraphics(canvasSize, canvasSize)
      pixelsBg.noLoop()
      genPixels()
    }

    // if (moduleList.includes('Shapes')) {
    //   gradientBuffer = p.createGraphics(canvasSize, canvasSize)
    // }
    
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
    p.rect(canvasSize, canvasSize, canvasSize, canvasSize)
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

  // let utils = new p5.Utils()
  new p5(sketch)
}

// utils = new p5.Utils()
// utils = new p5.Utils(sketch)

export { initSketch }