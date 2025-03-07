import p5 from 'p5'
// import utils from './p5.utils.min.js'
import {hexToRgbArray} from './utilities.js'

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
  getBasicTypoV2Store,
  getOverlayStore,
  getFontsStore,
  getUploadImageStore
  // setCanvasSizeStore,
  // generatePosition
} from './store'

// let tools = new p5.Utils();
// let utils

let pendingImageUrl = null;

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
let imagesVinylVinyl = {}
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

//let aDC
//let mint
//let liberation
//let meaculpa
//let luxuriousScript
//let pinyonScript
//let italianno

let graphics
let blendedLayer
let shapesLayer
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

let randomsBuffer
let amplitude
let frequency
// let varRandomScaleFactor
// let varRandomX
// let varRandomY
let imageBuffer

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

window.resetNoise = function() {
  genNoise()
}

window.resetPixels = function() {
  genPixels()
}

window.resetImages = function() {
  randomImages()
}

window.resetRandoms = function() {
  // allRandoms()
  randomImages()
}

window.resetLight = function() {
  const module3D = get3DStore()
  let colorArray1
  if (Array.isArray(module3D.color1)) {
    colorArray1 = module3D.color1
  } else {
    colorArray1 = hexToRgbArray(module3D.color1)
  }
  let r1 = colorArray1[0]
  let g1 = colorArray1[1]
  let b1 = colorArray1[2]
  let colorArray2
  if (Array.isArray(module3D.color2)) {
    colorArray2 = module3D.color2
  } else {
    colorArray2 = hexToRgbArray(module3D.color2)
  }
  let r2 = colorArray2[0]
  let g2 = colorArray2[1]
  let b2 = colorArray2[2]
  setLight(r1, r2, g1, g2, b1, b2)
}

window.handleUploadedImage = function(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        // Just store the URL - we'll load it within the p5 context later
        pendingImageUrl = e.target.result;
        resolve({success: true});
      } catch (err) {
        console.error("Error processing image:", err);
        reject(err);
      }
    };
    reader.onerror = (err) => {
      console.error("File reader error:", err);
      reject(err);
    };
    reader.readAsDataURL(file);
  });
};

function setLight(r1, r2, g1, g2, b1, b2) {
  graphics.directionalLight(r1, g1, b1, 100, 0, 0)
  graphics.directionalLight(r2, g2, b2, -100, 0, 0)
}

function randomAmplitude() {
  amplitude = randomsBuffer.random(25, 30)
}

function randomFrequency() {
  frequency = randomsBuffer.random(4.5, 5)
}

function calculateTextBoxPositions(R, n, textWidth) {
  const positions = [];
  const centerX = canvasSize / 2;
  const centerY = canvasSize / 2;
  const angleStep = 2 * Math.PI / n;
  let currentAngle = 0;

  for (let i = 0; i < n; i++) {
    const x = centerX + R * Math.cos(currentAngle);
    const y = centerY + R * Math.sin(currentAngle);

    if (i > 0) {
      const previousPos = positions[positions.length - 1];
      const dist = Math.sqrt(Math.pow(x - previousPos.x, 2) + Math.pow(y - previousPos.y, 2));
      const requiredDist = textWidth;

      if (dist < requiredDist) {
        currentAngle += Math.acos((2 * R * R - requiredDist * requiredDist) / (2 * R * R));
        const adjustedX = centerX + R * Math.cos(currentAngle);
        const adjustedY = centerY + R * Math.sin(currentAngle);
        positions.push({ x: adjustedX, y: adjustedY });
      } else {
        positions.push({ x, y });
      }
    } else {
      positions.push({ x, y });
    }

    currentAngle += angleStep;
  }

  return positions;
}

// function newRandoms(a, b) {
//   let randomNumber
//   return randomNumber = randomsBuffer.random(a, b) 
// }

// ici obligé de sortir la génération or de la fonction draw vu qu'on utilise du random MAIS c'est dans un for loop, donc on peut pas juste sortir la fonction random, mais pas grave pcq on peut juste call cette fonction avec window.
function randomImages() {
  imageBuffer.clear()

  const objects = getImageStore()

  let currentObject
  let imageObject

  if (objects.collections.includes('Shoes') && objects.currentCollection == 'Shoes') {
    currentObject = objects.preset.Shoes.current
    imageObject = imagesObj[currentObject]
  }
  if (objects.collections.includes('Tools') && objects.currentCollection == 'Tools') {
    currentObject = objects.preset.Tools.current
    imageObject = imagesObj[currentObject]
  }

  let scaleFactor = (canvasSize-200) / Math.max(imageObject.width, imageObject.height)

  let scaledWidth = imageObject.width * scaleFactor
  let scaledHeight = imageObject.height * scaleFactor

  for (let i = 0; i < 10; i++) {

    let varRandomScaleFactor = randomsBuffer.random(0.5, 1.5);
    // Calculate the new width and height of the image based on the scale factor
    let newScaledWidth = scaledWidth * varRandomScaleFactor;
    let newScaledHeight = scaledHeight * varRandomScaleFactor;

    // Calculate the maximum x and y positions to keep the image within the canvas
    let maxX = canvasSize - newScaledWidth;
    let maxY = canvasSize - newScaledHeight;

    // Generate random x and y positions within the canvas boundaries
    let x = randomsBuffer.random(0, maxX);
    let y = randomsBuffer.random(0, maxY);

    // Draw the image at the calculated position and size
    imageBuffer.image(imageObject, x, y, scaledWidth, scaledHeight);
  }
}

function allRandoms() {
  randomAmplitude()
  randomFrequency()
}

// with random colors inside
//function genNoise() {
//  let yoff = 0
//  let seed = noiseBg.random(1000);
//  let inc

//  const background = getBackgroundStore()
//  if (background.preset.Noise.currentNoiseType == 'Small') {
//    inc = noiseBg.random(0.95, 1)
//  } else if (background.preset.Noise.currentNoiseType == 'Medium') {
//    inc = noiseBg.random(0.2, 0.25)
//  } else if(background.preset.Noise.currentNoiseType == 'Big') {
//    inc = noiseBg.random(0, 0.01)
//  }

//  let redMin = noiseBg.random(0, 100);
//  let redMax = noiseBg.random(150, 255);
//  let greenMin = noiseBg.random(0, 100);
//  let greenMax = noiseBg.random(150, 255);
//  let blueMin = noiseBg.random(0, 100);
//  let blueMax = noiseBg.random(150, 255);

//  noiseBg.pixelDensity(1)
//  noiseBg.loadPixels()

//  for (let y = 0; y < canvasSize; y++) {
//    let xoff = 0
//    for (let x = 0; x < canvasSize; x++) {
//      let index = (x + y * canvasSize) * 4
//      let noiseVal = noiseBg.noise(xoff, yoff, seed)
//      // blueish-purple noise
//      // let r = noiseBg.map(noiseVal, 0, 1, 0, 255)
//      // let g = noiseBg.map(noiseVal, 0, 1, 100, 200)
//      // let b = noiseBg.map(noiseVal, 0, 1, 200, 255)
//      let r = noiseBg.map(noiseVal, 0, 1, redMin, redMax)
//      let g = noiseBg.map(noiseVal, 0, 1, greenMin, greenMax)
//      let b = noiseBg.map(noiseVal, 0, 1, blueMin, blueMax)

//      noiseBg.pixels[index+0] = r
//      noiseBg.pixels[index+1] = g
//      noiseBg.pixels[index+2] = b
//      noiseBg.pixels[index+3] = 255
//      xoff += inc
//    }
//    yoff += inc
//  }
//  noiseBg.updatePixels()
//}

//try with tint color from store
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

  //let redMin = noiseBg.random(0, 100);
  //let redMax = noiseBg.random(150, 255);
  //let greenMin = noiseBg.random(0, 100);
  //let greenMax = noiseBg.random(150, 255);
  //let blueMin = noiseBg.random(0, 100);
  //let blueMax = noiseBg.random(150, 255);

  let colorArray
  if (Array.isArray(background.preset.Noise.tintColor)) {
    colorArray = background.preset.Noise.tintColor
    //p.tint(tintColor[0], tintColor[1], tintColor[2], 128)
  } else {
    colorArray = hexToRgbArray(background.preset.Noise.tintColor)
    //p.tint(tintColor[0], tintColor[1], tintColor[2], 128)
  }

  let rC = colorArray[0];
  let gC = colorArray[1];
  let bC = colorArray[2];

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
      //Random colors
      //let r = noiseBg.map(noiseVal, 0, 1, redMin, redMax)
      //let g = noiseBg.map(noiseVal, 0, 1, greenMin, greenMax)
      //let b = noiseBg.map(noiseVal, 0, 1, blueMin, blueMax)
      //black&white
      //let r = noiseBg.map(noiseVal, 0, 1, 0, 255)
      //let g = noiseBg.map(noiseVal, 0, 1, 0, 255)
      //let b = noiseBg.map(noiseVal, 0, 1, 0, 255)
      //from store
      let r = noiseBg.map(noiseVal, 0, 1, 0, rC)
      let g = noiseBg.map(noiseVal, 0, 1, 0, gC)
      let b = noiseBg.map(noiseVal, 0, 1, 0, bC)

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
  //console.log('yes');
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
      const gradient = background.preset.Gradient
      const color1 = gradient.color1
      const color2 = gradient.color2
      

      const angle = gradient.angle.value

      p.clear()
      // let gradientBg

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

      // console.log(gradient.currentGradientType);

      if (blend.Vinyl == true) {
        if (angle == 'vertical') {
          gradientBg = blendedLayer.drawingContext.createLinearGradient (0, 0, 0, canvasSize)
        }
        if (angle == 'horizontal') {
          gradientBg = blendedLayer.drawingContext.createLinearGradient (0, 0, canvasSize, 0)
        }
      } else {
        if (gradient.currentGradientType == 'Radial') {

          gradientBg = p.drawingContext.createRadialGradient (canvasSize/2, canvasSize/2, 0, canvasSize/2, canvasSize/2, 350) 
          //Comment mettre plusieurs radial gradient??? -> soft noise gradient
          // gradientBg = p.drawingContext.createRadialGradient (canvasSize, canvasSize, 0, canvasSize, canvasSize, 350) 

        } else if (gradient.currentGradientType == 'Linear') {
          if (angle == 'angle1') {
            gradientBg = p.drawingContext.createLinearGradient (0, 0, canvasSize, 0)
          }
          if (angle == 'angle2') {
            gradientBg = p.drawingContext.createLinearGradient (0, 0, 0, canvasSize)
          }
          if (angle == 'angle3') {
            gradientBg = p.drawingContext.createLinearGradient (canvasSize, 0, 0, 0)
          }
          if (angle == 'angle4') {
            gradientBg = p.drawingContext.createLinearGradient (0, canvasSize, 0, 0)
          }
        }
      }

      let stopColor = colorA
      let lastColor

      let stop = 0
      let newStop

      gradientBg.addColorStop(stop, stopColor)

      let Q = gradient.stops.quantity


      ///
      // function hexToHsl(hex) {
      //   // Convert hex to RGB
      //   let r = parseInt(hex.slice(1, 3), 16);
      //   let g = parseInt(hex.slice(3, 5), 16);
      //   let b = parseInt(hex.slice(5, 7), 16);

      //   // Convert RGB to HSL
      //   r /= 255;
      //   g /= 255;
      //   b /= 255;

      //   let max = Math.max(r, g, b);
      //   let min = Math.min(r, g, b);
      //   let h, s, l = (max + min) / 2;

      //   if (max === min) {
      //       h = s = 0; // achromatic
      //   } else {
      //       let d = max - min;
      //       s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      //       switch (max) {
      //           case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      //           case g: h = (b - r) / d + 2; break;
      //           case b: h = (r - g) / d + 4; break;
      //       }
      //       h /= 6;
      //     }

      //     // Convert HSL values to percentage and round
      //     h = Math.round(h * 360);
      //     s = Math.round(s * 100);
      //     l = Math.round(l * 100);

      //     return { h, s, l };
      // }// Output: {h: 207, s: 70, l: 53}

      // function hsbToRgb(h, s, b) {
      //     s /= 100;
      //     b /= 100;
      //     const k = (n) => (n + h / 60) % 6;
      //     const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));

      //     const r = Math.round(255 * f(5));
      //     const g = Math.round(255 * f(3));
      //     const bVal = Math.round(255 * f(1));

      //     return { r, g, b: bVal };
      // }

      ///

      // let hsbColorValues= hexToHsl(colorA)
      // let h = hsbColorValues.h
      // let s = hsbColorValues.s
      // let b = hsbColorValues.b
      // // let hsbColor = `${hsbColorValues.h},${hsbColorValues.s},${hsbColorValues.l}`

      // if (Q == 0) {
      //   gradientBg.addColorStop(0, colorA)
      //   gradientBg.addColorStop(1, colorB)
      // } else {
      //   for (let i = 0; i < Q; i++) {
  
      //     newStop = stop + 1/(Q+1)
  
      //     // if (stopColor == colorA) {
      //     //   stopColor = colorB
      //     // } else if (stopColor == colorB) {
      //     //   stopColor = colorA
      //     // }

      //     // let colorValues= hexToHsl(gColor)
      //     // {h: 207, s: 70, l: 53}
      //     let newH = h + 10
      //     // let hsbColor = `${newH},${values.s},${values.l}`
      //     p.colorMode(p.HSB)
      //     let newColor = p.color(newH, s, b)
      //     let rgbColor = hsbToRgb(newColor)
      //     let finalColor = `${rgbColor.r},${rgbColor.g},${rgbColor.b}`


      //     gradientBg.addColorStop(newStop, finalColor)

      //     // gColor = newColor
      //     h = newH


      //     stop = newStop
      //   }
      //   p.colorMode(p.RGB)
      //   gradientBg.addColorStop(1, colorB);

      // }



      /// WORKING BASIC ALTERNATION

      if (Q == 0) {
        gradientBg.addColorStop(0, colorA)
        gradientBg.addColorStop(1, colorB)
      } else {
        for (let i = 0; i < Q; i++) {
  
          newStop = stop + 1/(Q+1)
  
          if (stopColor == colorA) {
            stopColor = colorB
          } else if (stopColor == colorB) {
            stopColor = colorA
          }
          gradientBg.addColorStop(newStop, stopColor)


          stop = newStop
        }

        if (stopColor == colorA) {
          lastColor = colorB;
        } else if (stopColor == colorB) {
          lastColor = colorA;
        }
        gradientBg.addColorStop(1, lastColor);
      }

      // gradientBg.addColorStop(0, colorA)
      // gradientBg.addColorStop(0.3, colorB)
      // gradientBg.addColorStop(0.6, colorA)
      // gradientBg.addColorStop(1, colorB)

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
      p.background(255)
      
      //let tintColor
      //if (Array.isArray(background.preset.Noise.tintColor)) {
      //  tintColor = background.preset.Noise.tintColor
      //  p.tint(tintColor[0], tintColor[1], tintColor[2], 128)
      //} else {
      //  tintColor = hexToRgbArray(background.preset.Noise.tintColor)
      //  p.tint(tintColor[0], tintColor[1], tintColor[2], 128)
      //}

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

      if (shapes.blend == true) {
        p.blendMode(p.DIFFERENCE)
        p.image(shapesLayer, 0, 0)
        shapesLayer.clear()
        shapesLayer.noStroke()

        shapesLayer.ellipse(xCenter, yCenter, wCircle)
      
        shapesLayer.ellipse(xCenterER1, yCenter, wEV1, hEV1)
        shapesLayer.ellipse(xCenterEL1, yCenter, wEV1, hEV1)
        shapesLayer.ellipse(xCenterER2, yCenter, wEV2, hEV2)
        shapesLayer.ellipse(xCenterEL2, yCenter, wEV2, hEV2)
        
        shapesLayer.ellipse(yCenter, xCenterER1, wCircle, wEV1)
        shapesLayer.ellipse(yCenter, xCenterEL1, wCircle, wEV1)
        shapesLayer.ellipse(yCenter, xCenterER2, hEV1, wEV2)
        shapesLayer.ellipse(yCenter, xCenterEL2, hEV1, wEV2)

        p.blendMode(p.BLEND)
      } else {
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

    }

    if (shapes.types.includes('Coversea') && shapes.currentType == 'Coversea') {
      
      let scalingFactors=[1, 0.7766003799274739, 0.7975911550512838, 0.8194409105542975, 0.8441930895718139, 0.8694941663460238, 0.8938675340986638, 0.916042384939555, 0.9351918645714109, 0.950997999690028, 0.9635649636253911, 0.973262351511485]
      let initialW = canvasSize
      //let initialW = shapes.settings.sliderValue
      let newW

      if (shapes.blend == true) {
        p.blendMode(p.DIFFERENCE)
        p.image(shapesLayer, 0, 0)
        shapesLayer.clear()
        shapesLayer.noStroke()
        shapesLayer.rectMode(p.CENTER)
        
        for (let i = 0; i < 13; i += 1) {
          shapesLayer.fill(shapes.settings.color)
          let sf = scalingFactors[i]
          newW = initialW*sf
          shapesLayer.rect(canvasSize / 2,canvasSize / 2,newW,newW,55)
          shapesLayer.erase()
          shapesLayer.ellipse(canvasSize / 2,canvasSize / 2,newW)
          initialW = newW
          //c -= 20
          shapesLayer.noErase()
        }
        p.blendMode(p.BLEND)
      } else {
        //p.clear()
        p.noStroke()
        p.rectMode(p.CENTER)
        
        for (let i = 0; i < 13; i += 1) {
          p.fill(shapes.settings.color)
          let sf = scalingFactors[i]
          newW = initialW*sf
          p.rect(canvasSize / 2,canvasSize / 2,newW,newW,55)
          p.erase()
          p.ellipse(canvasSize / 2,canvasSize / 2,newW)
          initialW = newW
          //c -= 20
          p.noErase()
        }
      }

      
      
    }




    //if (shapes.types.includes('Custom1') && shapes.currentType == 'Custom1') {
    //  p.fill(shapes.settings.color)
    //  p.beginShape()
    //  p.curveVertex(100, 50)
    //  p.curveVertex(200, 20)
    //  p.curveVertex(200, 100)
    //  p.curveVertex(50, 75)
    //  p.curveVertex(25, 50)
    //  // p.bezierVertex(100, 50)
    //  // p.bezierVertex(200, 20)
    //  // p.bezierVertex(200, 100)
    //  // p.bezierVertex(50, 75)
    //  // p.bezierVertex(25, 50)
    //  // p.vertex(100, 200)
    //  // p.vertex(200, 50)
    //  // p.vertex(300, 200)
    //  p.endShape(p.CLOSE)
    //  p.noFill()
    //} else if (shapes.types.includes('Custom2') && shapes.currentType == 'Custom2') {
    //  p.fill(shapes.settings.color)
    //  // p.stroke(255)
    //  p.beginShape()
    //  p.angleMode(p.DEGREES)
    //  let spacing = 50
    //  for (let a = 0; a < 360; a += spacing) {
    //    let x = 100 * p.sin(a) + 200
    //    let y = 100 * p.cos(a) + 200
    //    p.vertex(x, y)
    //  }
    //  p.endShape(p.CLOSE)
    //  p.noFill()
    //}


  }

  /////////////////////////////////////////// MODULE PARTICLES

  if (moduleList.includes('Particles')) {
    const particles = getParticlesStore()

    const presetColor = particles.color
    let color
    if (typeof presetColor == 'string') {
      color = hexToRgbArray(presetColor)
    } else {
      color = presetColor
    }

    const alphaValue = particles.opacity
    if (particles.stroke == true) {
      p.stroke(...color)
    } else {
      p.fill(...color, alphaValue)
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
    } else if (vinyl.vinylTypes.includes('Vinyl') && vinyl.currentVinylType === 'Vinyl') {
      currentVinylImg = vinyl.preset.Vinyl.current
      imageVinyl = imagesVinylVinyl[currentVinylImg]
    }

    let vinylSize = vinyl.size
    let equivalentSize

    if (vinyl.bigger == true) {
      equivalentSize = ((vinylSize * (canvasSize+10)) / 100) + 300
    } else if (vinyl.bigger == false) {
      equivalentSize = (vinylSize * canvasSize) / 100
    }

    let x = (canvasSize - equivalentSize) / 2;
    let y = (canvasSize - equivalentSize) / 2;

    let opacity = parseFloat(vinyl.opacity)
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
      // p.image(vinylLayer, 0, 0)
      // vinylLayer.clear()
      // vinylLayer.tint(255, opacity)
      // vinylLayer.image(
      //   imageVinyl,
      //   x,
      //   y,
      //   equivalentSize,
      //   equivalentSize
      // )

      // p.tint(255, opacity)

      let tintColor
      if (Array.isArray(vinyl.tintColor)) {
        tintColor = vinyl.tintColor
        p.tint(tintColor[0], tintColor[1], tintColor[2], opacity)
      } else {
        tintColor = hexToRgbArray(vinyl.tintColor)
        p.tint(tintColor[0], tintColor[1], tintColor[2], opacity)
      }

      // let tintColor = hexToRgbArray(vinyl.tintColor)
      // p.tint(tintColor[0], tintColor[1], tintColor[2], opacity);

      p.image(imageVinyl,
        x,
        y,
        equivalentSize,
        equivalentSize)
      p.noTint()
    }

    // console.log(canvasSize);
    // console.log(equivalentSize);

    // p.background(imageVinyl, opacity)
  }

  /////////////////////////////////////////// MODULE UPLOADIMAGE

  if (moduleList.includes('UploadImage')) {
    const uploadImage = getUploadImageStore();
    
    if (uploadImage.uploadedImage) {
      const margin = 10; // 50px margin from edges
      let x, y;
      const positionName = uploadImage.positions[uploadImage.positionIndex];
      const imgSize = (uploadImage.size * canvasSize) / 100;
      //const opacity = (uploadImage.opacity / 100) * 255;
      const opacity = parseFloat(uploadImage.opacity)
      
      // Set position based on positionIndex
      switch(positionName) {
        case 'top-left':
          x = margin;
          y = margin;
          break;
        case 'top-middle':
          x = (canvasSize - imgSize) / 2;
          y = margin;
          break;
        case 'top-right':
          x = canvasSize - imgSize - margin;
          y = margin;
          break;
        case 'middle-left':
          x = margin;
          y = (canvasSize - imgSize) / 2;
          break;
        case 'middle-right':
          x = canvasSize - imgSize - margin;
          y = (canvasSize - imgSize) / 2;
          break;
        case 'bottom-left':
          x = margin;
          y = canvasSize - imgSize - margin;
          break;
        case 'bottom-middle':
          x = (canvasSize - imgSize) / 2;
          y = canvasSize - imgSize - margin;
          break;
        case 'bottom-right':
          x = canvasSize - imgSize - margin;
          y = canvasSize - imgSize - margin;
          break;
        default:
          x = margin;
          y = margin;
      }
      
      p.tint(255, opacity);
      p.image(uploadImage.uploadedImage, x, y, imgSize, imgSize);
      p.noTint();
    }
  }

  /////////////////////////////////////////// MODULE IMAGE

  if (moduleList.includes('Image')) {
    p.noTint()
    // const { current } = getImageStore()
    // const image = imagesObj[current]

    const objects = getImageStore()

    if  (objects.multiplication) {
      p.image(imageBuffer, 0, 0)
    } else {
      let currentObject
      let imageObject
  
      if (objects.collections.includes('Shoes') && objects.currentCollection == 'Shoes') {
        currentObject = objects.preset.Shoes.current
        imageObject = imagesObj[currentObject]
      }
      if (objects.collections.includes('Tools') && objects.currentCollection == 'Tools') {
        currentObject = objects.preset.Tools.current
        imageObject = imagesObj[currentObject]
      }
  
      //let scaleFactor = (canvasSize-200) / Math.max(imageObject.width, imageObject.height)
  
      //let scaledWidth = imageObject.width * scaleFactor
      //let scaledHeight = imageObject.height * scaleFactor
  
      //let imgWidth = scaledWidth;
      //let imgHeight = scaledHeight;
      //let xMax = canvasSize-scaledWidth
      p.image(imageObject, 0, 0, canvasSize, canvasSize);

      //// console.log(xMax);
      //for (let x = 0; x < xMax; x += 10) {
      //  // Calculate the y position using a sine wave
      //  let y = canvasSize / 2 + amplitude * p.sin(x * frequency);
      //  y = Math.max(imgHeight / 2, Math.min(y, canvasSize - imgHeight / 2));
      //  // console.log(y);
      //  // Draw the image at the calculated position
      //  // p.tint('red')
      //  // p.imageMode(p.CORNER)
      //  p.image(imageObject, x, y - imgHeight / 2, scaledWidth, scaledHeight);
      //  // p.image(imageObject, x, y, scaledWidth, scaledHeight);
      //}
    }



  }

  /////////////////////////////////////////// MODULE lINES

  if (moduleList.includes('Lines')) {
    const lines = getLinesStore()
    
    p.noFill()
    p.stroke(lines.color)
    p.strokeWeight(lines.strokeWeight);

    let allPointSets = lines.preset.Curves.pointsSets

    if (lines.currentLineType == 'Curves') {
      for (let points of allPointSets) {
        p.beginShape();
        for (let point of points) {
          p.curveVertex(point.x * canvasSize / 100, point.y * canvasSize / 100);
        }
        p.endShape();
      }
    }

    if (lines.currentLineType == 'Arcs') {
      p.angleMode(p.DEGREES)
      for (let index = 0; index < lines.preset.Arcs.arcs.length; index++) {
        p.arc(
          (lines.preset.Arcs.arcs[index][0] * canvasSize) / 100,
          (lines.preset.Arcs.arcs[index][1] * canvasSize) / 100,
          (lines.preset.Arcs.arcs[index][2] * canvasSize) / 100,
          (lines.preset.Arcs.arcs[index][3] * canvasSize) / 100,
          lines.preset.Arcs.arcs[index][4],
          lines.preset.Arcs.arcs[index][5]
          )
      }
    }

    if (lines.currentLineType == 'Straight') {
      for (let index = 0; index < lines.preset.Straight.straightLines.length; index++) {
        p.line(
          (lines.preset.Straight.straightLines[index][0] * canvasSize) / 100,
          (lines.preset.Straight.straightLines[index][1] * canvasSize) / 100,
          (lines.preset.Straight.straightLines[index][2] * canvasSize) / 100,
          (lines.preset.Straight.straightLines[index][3] * canvasSize) / 100
        );
      }
    }

    if (lines.currentLineType == 'Bouncing') {
      let startX = (lines.preset.Bouncing.bouncingRandom[0] * canvasSize) / 100
      let startY = (lines.preset.Bouncing.bouncingRandom[1] * canvasSize) / 100
      let endX = (lines.preset.Bouncing.bouncingRandom[2] * canvasSize) / 100
      let endY = (lines.preset.Bouncing.bouncingRandom[3] * canvasSize) / 100

      let deltaStartX = (lines.preset.Bouncing.bouncingRange[0] * canvasSize) / 100
      let deltaStartY = (lines.preset.Bouncing.bouncingRange[1] * canvasSize) / 100
      let deltaEndX = (lines.preset.Bouncing.bouncingRange[2] * canvasSize) / 100
      let deltaEndY = (lines.preset.Bouncing.bouncingRange[3] * canvasSize) / 100

       for (let i = 0; i < lines.preset.Bouncing.quantity; i++) {
        
        // p.stroke(255, 50);
        p.line(startX, startY, endX, endY);

        startX += deltaStartX;
        startY += deltaStartY;
        endX += deltaEndX;
        endY += deltaEndY;

        if (startX < 0 || startX > canvasSize) {
          deltaStartX *= -1;
        }

        if (startY < 0 || startY > canvasSize) {
          deltaStartY *= -1;
        }

        if (endX < 0 || endX > canvasSize) {
          deltaEndX *= -1;
        }

        if (endY < 0 || endY > canvasSize) {
          deltaEndY *= -1;
        }
      }
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

    //let colorArray1
    //if (Array.isArray(module3D.color1)) {
    //  colorArray1 = module3D.color1
    //} else {
    //  colorArray1 = hexToRgbArray(module3D.color1)
    //}
    //let colorArray2
    //if (Array.isArray(module3D.color2)) {
    //  colorArray2 = module3D.color2
    //} else {
    //  colorArray2 = hexToRgbArray(module3D.color2)
    //}

    //let r1 = colorArray1[0]
    //let g1 = colorArray1[1]
    //let b1 = colorArray1[2]
    //let r2 = colorArray2[0]
    //let g2 = colorArray2[1]
    //let b2 = colorArray2[2]
    
    //graphics.directionalLight(189, 98, 189, 100, 0, 0)
    graphics.directionalLight(250, 250, 250, 100, 0, 0)
    //graphics.directionalLight(54, 98, 189, -100, 0, 0)
    graphics.directionalLight(100, 100, 100, -100, 0, 0)
    //graphics.directionalLight(colorArray1[0], colorArray1[1], colorArray1[2], 100, 0, 0)
    //graphics.directionalLight(colorArray2[0], colorArray2[1], colorArray2[2], -100, 0, 0)

    //setLight(r1, r2, g1, g2, b1, b2)
    //graphics.fill(255)

    //if (module3D.types.includes('Torus') && module3D.current3DType === 'Torus') {
    //  graphics.torus(30, 15, 50, 50);
    //} else if (module3D.types.includes('Square') && module3D.current3DType === 'Square') {
    //  graphics.box(30, 15, 50, 50);
    //}

    let fct = module3D.sliderValue
    //console.log(module3D.size);

    if (module3D.types.includes('Torus') && module3D.current3DType === 'Torus') {
      graphics.torus(30*fct, 15*fct, 50, 50)
    } else if (module3D.types.includes('Square') && module3D.current3DType === 'Square') {
      graphics.box(30*fct, 15*fct, 50, 50)
    }

  }

  /////////////////////////////////////////// MODULE BASICTYPO V2

  if (moduleList.includes('BasicTypoV2')) {
    const basicTypov2 = getBasicTypoV2Store()
    let textInput

    if (basicTypov2.styles.includes('NORMAL') && basicTypov2.styleText == 'NORMAL' && basicTypov2.font == 'PT-Root-UI') {
      p.textFont(ptrootuiReg)
    } else if (basicTypov2.styles.includes('BOLD') && basicTypov2.styleText == 'BOLD' && basicTypov2.font == 'PT-Root-UI') {
      p.textFont(ptrootuiBold)
    } else if (basicTypov2.styles.includes('LIGHT') && basicTypov2.styleText == 'LIGHT' && basicTypov2.font == 'PT-Root-UI') {
      p.textFont(ptrootuiLight)
    } else {
      p.textFont(basicTypov2.font)
    }

    p.noStroke()
    p.textStyle(basicTypov2.styleText)
    p.textWrap(p.WORD)
    p.fill(basicTypov2.color)
    p.fill('white')

    if (basicTypov2.upperCase == true) {
      textInput = basicTypov2.textInput.toUpperCase()
    } else {
      textInput = basicTypov2.textInput
    }

    // let presetSizeText = basicTypov2.sizeText.sliderValue
    let presetLeadingSizeText = basicTypov2.leadingText
    // let TextSize = (presetSizeText * canvasSize) / 100
    let TextLeadingSize = (presetLeadingSizeText * canvasSize) / 100
    p.textSize(10)
    p.textLeading(TextLeadingSize)

    let txtWidth = p.textWidth(textInput)
    // let positions = basicTypov2.txtpositions

    //Ca marche mais pas pour les extremites haut et bas -> les text se superposent
    // for (let i = 0; i < basicTypov2.nText; i++) {
    //   p.text(textInput, ((positions[i].x)*canvasSize/100)-(txtWidth/2), (positions[i].y)*canvasSize/100)
    // }

    //ChatGPT try adapt calculation
    const positions = calculateTextBoxPositions(100, 50, txtWidth);

    for (let i = 0; i < positions.length; i++) {
      const pos = positions[i];
      p.textAlign(p.CENTER, p.CENTER);
      p.text('Text', pos.x, pos.y);
    }
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

  /////////////////////////////////////////// MODULE BASICTYPO

  if (moduleList.includes('BasicTypo')) {
    const basicTypo = getBasicTypoStore()
    let mainText
    
    ////////////////////////////  STYLES
    
    p.noStroke()
    // p.textStyle(basicTypo.styleMainText)
    // p.textWrap(p.WORD)
    
    ////////////////////////////  OTHER TEXT
    if (basicTypo.dopText == true) {
      p.textFont(basicTypo.fontOtherText)
      p.fill(basicTypo.otherText.color)
      let otherTexts = basicTypo.otherText.values
      
      let presetSizeOtherText = basicTypo.otherText.size.sliderValue
      let presetLeadingOtherText = basicTypo.otherText.leading.sliderValue

      let otherTextSize = (presetSizeOtherText * canvasSize) / 100
      let otherTextLeading = (presetLeadingOtherText * canvasSize) / 100
      
      p.textSize(otherTextSize)
      p.textLeading(otherTextLeading)


      let positions = basicTypo.textPositions
      
      // 
      const offset = canvasSize * 0.1 / 2
      const textZone = canvasSize - offset * 2
      const maxWidth = textZone / 3;
      const center = (canvasSize - maxWidth) / 2
      const right = canvasSize - maxWidth - offset
      const bottom = canvasSize - offset
      //

      p.rectMode(p.CORNER)

      let currentText
      
      for (let i = 0; i < otherTexts.length; i++) {

        if (basicTypo.upperCase == true) {
          currentText = otherTexts[i].toUpperCase()
        } else {
          currentText = otherTexts[i];
        }

        const positionTxt = positions[i]


        if (positionTxt[0] == 'left' && positionTxt[1] == 'top') {
          p.textAlign(p.LEFT, p.TOP);
          p.text(currentText, offset, offset, maxWidth);
        }

        if (positionTxt[0] == 'center' && positionTxt[1] == 'top') {
          p.textAlign(p.CENTER, p.TOP);
          p.text(currentText, center, offset, maxWidth);
        }

        if (positionTxt[0] == 'right' && positionTxt[1] == 'top') {
          p.textAlign(p.RIGHT, p.TOP);
          p.text(currentText, right, offset, maxWidth);
        }

        if (positionTxt[0] == 'left' && positionTxt[1] == 'bottom') {
          p.textAlign(p.LEFT, p.BOTTOM);
          p.text(currentText, offset, bottom, maxWidth);
        }

        if (positionTxt[0] == 'center' && positionTxt[1] == 'bottom') {
          p.textAlign(p.CENTER, p.BOTTOM);
          p.text(currentText, center, bottom, maxWidth);
        }

        if (positionTxt[0] == 'right' && positionTxt[1] == 'bottom') {
          p.textAlign(p.RIGHT, p.BOTTOM);
          p.text(currentText, right, bottom, maxWidth);
        }
      }
  

    }

    //MAIN TEXT
    p.fill(basicTypo.mainText.color)
    //console.log(basicTypo.fontMainText);
    //pinyonScript
    p.textFont(basicTypo.fontMainText)
    p.textAlign(p.CENTER, p.CENTER)

    if (basicTypo.upperCase == true) {
      mainText = basicTypo.mainText.value.toUpperCase()
    } else {
      mainText = basicTypo.mainText.value
    }

    let presetSizeMainText = basicTypo.mainText.size.sliderValue
    let presetLeadingMainText = basicTypo.mainText.leading.sliderValue
    let MainTextSize = (presetSizeMainText * canvasSize) / 100
    let MainTextLeading = (presetLeadingMainText * canvasSize) / 100
    p.textSize(MainTextSize)
    p.textLeading(MainTextLeading)
    p.rectMode(p.CENTER)

    let xmain = canvasSize / 2;
    let ymain = canvasSize / 2;

    p.text(mainText, xmain, ymain, canvasSize, canvasSize)


    p.drawingContext.shadowBlur = 0
  }

}





function getDivSize() {
  return new Promise((resolve, reject) => {
    parentDiv = document.getElementById(canvasContainerId);
    parentDivInfo = parentDiv.getBoundingClientRect();
    parentDivWidth = parentDivInfo.width;
    parentDivHeight = parentDivInfo.height;
    
    let newCanvasSize = Math.min(parentDivWidth, parentDivHeight)
    resolve([newCanvasSize])
  })
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
      if (objects.collections.includes('Tools')) {
        const imageFiles = objects.preset.Tools.images

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
      if (vinyl.vinylTypes.includes('Vinyl')) {
        const imageFiles = vinyl.preset.Vinyl.images

        Object.keys(imageFiles).forEach((key) => {
          imagesVinylVinyl = Object.assign({}, imagesVinylVinyl, {
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

    //fontEsenin = p.loadFont('../fonts/esenin-script-one.ttf');
    //mainTextFont = p.loadFont('../fonts/esenin-script-one.ttf');
    //otherTextFont = p.loadFont('../fonts/esenin-script-one.ttf');

    //ptrootuiReg = p.loadFont('../fonts/PT-Root-UI_Regular.woff')
    //ptrootuiBold = p.loadFont('../fonts/PT-Root-UI_Bold.woff')
    //ptrootuiLight = p.loadFont('../fonts/PT-Root-UI_Light.woff')
    
    //p.loadFont('../fonts/Acosta.otf')
    //p.loadFont('../fonts/wonky.otf')
    //p.loadFont('../fonts/Bolgarus.otf')
    //p.loadFont('../fonts/YUNGA-Display.otf')
    //p.loadFont('../fonts/typekini.ttf')
    //p.loadFont('../fonts/AUSRINE.ttf')
    
    p.loadFont('../fonts/Aileron-Bold.otf')

    //////

    //aDC = p.loadFont('../fonts/ADC-Semi-Bold.otf')
    //mint = p.loadFont('../fonts/MintSansRegular.otf')
    //liberation = p.loadFont('../fonts/LiberationSans-Regular.ttf')

    //meaculpa = p.loadFont('../fonts/MeaCulpa-Regular.ttf')
    //luxuriousScript = p.loadFont('../fonts/LuxuriousScript-Regular.ttf')
    //pinyonScript = p.loadFont('../fonts/PinyonScript-Regular.ttf')
    //italianno = p.loadFont('../fonts/Italianno-Regular.ttf')
    
    


    
    
    
    

  }

  function checkPendingImage() {
    if (pendingImageUrl) {
      const uploadImage = getUploadImageStore();
      
      p.loadImage(pendingImageUrl, 
        // Success callback
        loadedImg => {
          uploadImage.uploadedImage = loadedImg;
          
          // Randomize position if not locked
          if (!uploadImage.positionLock) {
            const positions = uploadImage.positions;
            const randomIndex = Math.floor(Math.random() * positions.length);
            uploadImage.positionIndex = randomIndex;
          }
          
          // Clear the pending URL
          pendingImageUrl = null;
        },
        // Error callback
        err => {
          console.error("Failed to load image:", err);
          pendingImageUrl = null;
        }
      );
    }
  }

  p.setup = () => {
    
    let canvas = p.createCanvas(canvasSize, canvasSize)
    canvas.parent(canvasContainerId)

    canvas.style('display', 'block');
    canvas.style('margin', '0');
    canvas.style('padding', '0');

    // random100(p)
    randomsBuffer = p.createGraphics(canvasSize, canvasSize)
    allRandoms()

    shapesLayer = p.createGraphics(canvasSize, canvasSize)

    if (moduleList.includes('Image')) {
      imageBuffer = p.createGraphics(canvasSize, canvasSize)
      randomImages()
    }

    // if (moduleList.includes('Vinyl')) {
    //   getDivSize().then((canvasSize) => {
    //     vinylLayer = p.createGraphics(canvasSize, canvasSize)
    //   })
    // }

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
    }
    if (moduleList.includes('Background') && background.backgroundTypes.includes('Pixels')) {
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
      // parentDiv = document.getElementById(canvasContainerId);
      // parentDivInfo = parentDiv.getBoundingClientRect();
      // parentDivWidth = parentDivInfo.width;
      // parentDivHeight = parentDivInfo.height;
      
      // canvasSize = Math.min(parentDivWidth, parentDivHeight)

      //myold
      //getDivSize().then((newCanvasSize) => {
      //  canvasSize = newCanvasSize
      //  p.resizeCanvas(canvasSize, canvasSize)
      //  p.rect(canvasSize, canvasSize, canvasSize, canvasSize)
      //})
      //newClaude
      getDivSize().then((newCanvasSize) => {
        canvasSize = newCanvasSize[0] // Make sure we get the first element of the array
        p.resizeCanvas(canvasSize, canvasSize)
        // Remove this line:
        // p.rect(canvasSize, canvasSize, canvasSize, canvasSize)
      })
  }


  
  p.draw = () => {
    // Check for any pending image at the start of each frame
    checkPendingImage();

    drawModules(p)
    
    const blend = getBlendStore()
    if (blend.difference == true) {
      p.clear()
      p.blendMode(p.DIFFERENCE)
      drawModules(p)
    } else {
      drawModules(p)
    }
  }
}

///////////////////////////////////////////////////

let cover

function initSketch(id, size) {
  canvasContainerId = id

  canvasSize = size
  // console.log('SKETCH SIZE', size);
  // generatePosition(size)

  parentDiv = document.getElementById(canvasContainerId);
  parentDivInfo = parentDiv.getBoundingClientRect();

  moduleList = getModuleList()

  // let utils = new p5.Utils()
  cover = new p5(sketch)
}



function saveCanvasAsImage() {
  if (cover) {
    cover.saveCanvas('my_cover', 'jpg'); // Calls saveCanvas on the stored instance
  }
}



// utils = new p5.Utils()
// utils = new p5.Utils(sketch)

export { initSketch, saveCanvasAsImage }