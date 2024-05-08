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
  getText1Store,
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


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function generateNoiseBackground() {
  const background = getBackgroundStore()
  if (background.bgTypes.includes('Noise') && background.currentBgType === 'Noise') {
    const r = background.preset.Noise.value
    // console.log(r);
    p.clear()
    p.background(0)
    
    // let xOff = 0
    // let yOff = 100
    // let increment = 0.01
    // let xN = p.map(p.noise(xOff), 0, 1, 0, canvasSize)
    // let yN = p.map(p.noise(yOff), 0, 1, 0, canvasSize)
    // xOff += 0.01
    // yOff += 0.01
    // p.ellipse(xN, yN, 24, 24)
    
    
    noiseBg.loadPixels()
    noiseBg.pixelDensity(1)
    for (let x = 0; x < canvasSize; x++) {
      for (let y = 0; y < canvasSize; y++) {
        let index = (x + y * canvasSize) * 4
        let r0 = sample(r)
        let r1 = sample(r)
        let r2 = sample(r)
        let r3 = sample(r)
        noiseBg.pixels[index+0] = r0
        noiseBg.pixels[index+1] = r1
        noiseBg.pixels[index+2] = r2
        noiseBg.pixels[index+3] = r3
      }
    }
    noiseBg.updatePixels()
  
    p.image(noiseBg, 0, 0)
  
    p.pixelDensity()
    p.noStroke()
  }
}

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

    }
    // else if (background.bgTypes.includes('Noise') && background.currentBgType === 'Noise') {
    //   const r = background.preset.Noise.value
    //   // console.log(r);
    //   p.clear()
    //   p.background(0)
      
    //   // let xOff = 0
    //   // let yOff = 100
    //   // let increment = 0.01
    //   // let xN = p.map(p.noise(xOff), 0, 1, 0, canvasSize)
    //   // let yN = p.map(p.noise(yOff), 0, 1, 0, canvasSize)
    //   // xOff += 0.01
    //   // yOff += 0.01
    //   // p.ellipse(xN, yN, 24, 24)
      
      
    //   noiseBg.loadPixels()
    //   noiseBg.pixelDensity(1)
    //   for (let x = 0; x < canvasSize; x++) {
    //     for (let y = 0; y < canvasSize; y++) {
    //       let index = (x + y * canvasSize) * 4
    //       let r0 = sample(r)
    //       let r1 = sample(r)
    //       let r2 = sample(r)
    //       let r3 = sample(r)
    //       noiseBg.pixels[index+0] = r0
    //       noiseBg.pixels[index+1] = r1
    //       noiseBg.pixels[index+2] = r2
    //       noiseBg.pixels[index+3] = r3
    //     }
    //   }
    //   noiseBg.updatePixels()

    //   p.image(noiseBg, 0, 0)

    //   p.pixelDensity()
    //   p.noStroke()
    // }

    // else {
    //   if (blend.Vinyl == true) {
    //     blendedLayer.background(0)
    //   } else {
    //     p.background(0)
    //   }
    // }
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

    const opacity = backgroundImage.sliderValue
    p.background(imageBg, opacity)
  }

  /////////////////////////////////////////// MODULE SHAPES

  if (moduleList.includes('Shapes')) {
    const shapes = getShapesStore()

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
    }
    // else {
    //   p.fill(shapes.color)
    // }

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

    if (module3D.options.includes('Torus') && module3D.current3DType === 'Torus') {
      graphics.torus(30, 15, 50, 50);
    } else if (module3D.options.includes('Square') && module3D.current3DType === 'Square') {
      graphics.box(30, 15, 50, 50);
    }

  }

  /////////////////////////////////////////// MODULE TEXT1

  if (moduleList.includes('Text1')) {

    const text1 = getText1Store()

    if (text1.textAlign === 'left') {
      p.textAlign(p.LEFT)
    } else {
      p.textAlign(p.CENTER, p.CENTER);
    }

    ////// STYLE
    p.noStroke()
    
    p.textFont(text1.font)
    p.textWrap(p.WORD);
    

    //////////////////// MAIN TEXT
    let textContent
    if (text1.upperCase == true) {
      textContent = text1.text.toUpperCase()
    } else {
      textContent = text1.text
    }

    let presetSize = text1.size
    let txtSize = (presetSize * canvasSize) / 100
    p.textSize(txtSize)
    p.textLeading(txtSize-20)
    p.fill(text1.color)
    
    let x
    let y
    
    if (text1.random == true) {
      
      // const position1 = text1.txtpositions[0]
      // x = (position1.x * canvasSize) / 100
      // y = (position1.y * canvasSize) / 100
      
      const positionTxt = text1.txtpositions[0]
      x = (positionTxt.x * canvasSize) / 100
      y = (positionTxt.y * canvasSize) / 100
      
      let textWidth = p.textWidth(textContent)
      
      while (canvasSize - x < textWidth) {
        txtSize -= 1
        p.textSize(txtSize)
        textWidth = p.textWidth(textContent);
      }
      p.text(textContent, x, y, canvasSize/3, canvasSize/3);
      // p.text(textContent, x, y)
      
      
      
    } else {
      p.rectMode(p.CENTER);
      x = canvasSize / 2;
      y = canvasSize / 2;
      p.text(textContent, x, y, canvasSize, canvasSize);
    }


    



    // let textWidth = p.textWidth(textContent)

    // const blend = getBlendStore()
    // if (blend.Text1 == true) {
    //   p.image(blendedLayer, 0, 0)
    //   blendedLayer.clear()
    //   // blendedLayer.blendMode(p.DIFFERENCE)

    //   blendedLayer.text(textContent, x, y, canvasSize, canvasSize);
    // } else {
    //   p.text(textContent, x, y, canvasSize, canvasSize);
    // }

    // if (moduleList.includes('Module3D')) {
    //   p.noFill()
    //   p.stroke(text1.color)
    //   p.text(textContent, x, y, canvasSize, canvasSize);
    //   p.noStroke()

    // } else {
    //   p.fill(text1.color)
    //   p.text(textContent, x, y, canvasSize, canvasSize);
    // }



    //////// DOP TEXT

    if (text1.dopText == true) {

      p.textAlign(p.CENTER)
      const maxSize = (2 * canvasSize) / 100
      // p.textFont(otherTextFont);

      
      
      // Text 1
      let otherText1 = "Dance"
      let textSize1 = maxSize
      p.textSize(textSize1)
      
      const position1 = text1.txtpositions[0]
      let x1 = (position1.x * canvasSize) / 100
      let y1 = (position1.y * canvasSize) / 100
      let textWidth1 = p.textWidth(otherText1)
      
      while (x1 - textWidth1 / 2 < 0 || x1 + textWidth1 / 2 > p.width - 10) {
        textSize1 -= 1
        p.textSize(textSize1)
        textWidth1 = p.textWidth(otherText1)
      }
      p.text(otherText1, x1, y1)
      
      // Text 2
      let otherText2 = "Music"
      let textSize2 = maxSize
      p.textSize(textSize2)
      
      const position2 = text1.txtpositions[1]
      let x2 = (position2.x * canvasSize) / 100
      let y2 = (position2.y * canvasSize) / 100
      let textWidth2 = p.textWidth(otherText2)

      while (x2 - textWidth2 / 2 < 0 || x2 + textWidth2 / 2 > p.width - 10 || Math.abs(y2 - y1) < textSize2) {
        textSize2 -= 1
        p.textSize(textSize2)
        textWidth2 = p.textWidth(otherText2);
      }
      p.text(otherText2, x2, y2)
    }


  }

  /////////////////////////////////////////// MODULE BASICTYPO

  if (moduleList.includes('BasicTypo')) {
    const basicTypo = getBasicTypoStore()
    let mainText
    let otherText

    p.noStroke()
    p.textFont(basicTypo.font)
    p.textWrap(p.WORD)
    p.fill(basicTypo.color)

    //OTHER TEXT
    if (basicTypo.dopText == true) {
      p.rectMode(p.CORNER)

      if (basicTypo.upperCase == true) {
        otherText = basicTypo.textarea.toUpperCase()
      } else {
        otherText = basicTypo.textarea
      }

      const positionTxt = basicTypo.txtpositions[0]
      let x = positionTxt.x
      let y = positionTxt.y

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

      if (y == 5) {
        p.textAlign(p.LEFT, p.TOP)
      } else {
        p.textAlign(p.LEFT, p.BOTTOM)
      }

      x = (positionTxt.x * canvasSize) / 100
      y = (positionTxt.y * canvasSize) / 100
      p.text(otherText, x, y, width)
    }

    //MAIN TEXT
    p.textAlign(p.CENTER, p.CENTER)
    if (basicTypo.upperCase == true) {
      mainText = basicTypo.mainText.toUpperCase()
    } else {
      mainText = basicTypo.mainText
    }
    let presetSizeMainText = basicTypo.sizeMainText
    let presetLeadingSizeMainText = basicTypo.leadingMainText
    let MainTextSize = (presetSizeMainText * canvasSize) / 100
    let MainTextLeadingSize = (presetLeadingSizeMainText * canvasSize) / 100
    p.textSize(MainTextSize)
    p.textLeading(MainTextLeadingSize)
    p.rectMode(p.CENTER)
    let xmain = canvasSize / 2;
    let ymain = canvasSize / 2;
    p.text(mainText, xmain, ymain, canvasSize, canvasSize)
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

    let opacity = parseFloat(overlay.opacityValue)
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
    p.loadFont('../fonts/Acosta.otf')
    p.loadFont('../fonts/wonky.otf')
    p.loadFont('../fonts/Bolgarus.otf')
    p.loadFont('../fonts/YUNGA-Display.otf')
    p.loadFont('../fonts/typekini.ttf')
    p.loadFont('../fonts/AUSRINE.ttf')

  }

  p.setup = () => {

    // p.pixelDensity(1)

    // p.frameRate(2)
    // utils = new p5.Utils()
    
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

    if (moduleList.includes('Background')) {
      noiseBg = p.createGraphics(canvasSize, canvasSize)
      noiseBg.noLoop()
      generateNoiseBackground()
      // const background = getBackgroundStore()
      // const r = background.preset.Noise.value
      // noiseBg.loadPixels()
      // noiseBg.pixelDensity(1)
      // for (let x = 0; x < canvasSize; x++) {
      //   for (let y = 0; y < canvasSize; y++) {
      //     let index = (x + y * canvasSize) * 4
      //     let r0 = sample(r)
      //     let r1 = sample(r)
      //     let r2 = sample(r)
      //     let r3 = sample(r)
      //     noiseBg.pixels[index+0] = r0
      //     noiseBg.pixels[index+1] = r1
      //     noiseBg.pixels[index+2] = r2
      //     noiseBg.pixels[index+3] = r3
      //   }
      // }
      // noiseBg.updatePixels()
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