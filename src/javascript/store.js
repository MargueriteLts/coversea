import { sample, getRandomArbitrary, importAll } from './utilities'

import * as generator1 from '../generators/generator1.js'
import * as generator1_2 from '../generators/generator1_2.js'
import * as generator1_3 from '../generators/generator1_3.js'
import * as generator2 from '../generators/generator2.js'
import * as generator2_2 from '../generators/generator2_2.js'
import * as generator2_3 from '../generators/generator2_3.js'
import * as generator3 from '../generators/generator3.js'
import * as generator3_2 from '../generators/generator3_2.js'
import * as generator4 from '../generators/generator4.js'
import * as generator4_2 from '../generators/generator4_2.js'
import * as generator4_3 from '../generators/generator4_3.js'
import * as generator4_4 from '../generators/generator4_4.js'
import * as generator4_5 from '../generators/generator4_5.js'
import * as generator5 from '../generators/generator5.js'
import * as generator5_2 from '../generators/generator5_2.js'
import * as generator6 from '../generators/generator6.js'
import * as generator6_2 from '../generators/generator6_2.js'
import * as generator7 from '../generators/generator7.js'
import * as generator7_2 from '../generators/generator7_2.js'
import * as generator7_3 from '../generators/generator7_3.js'
import * as generator8 from '../generators/generator8.js'
import * as generator8_2 from '../generators/generator8_2.js'
import * as generator8_3 from '../generators/generator8_3.js'
import * as generator9 from '../generators/generator9.js'
import * as generator9_2 from '../generators/generator9_2.js'
import * as generator9_3 from '../generators/generator9_3.js'
import * as generator10 from '../generators/generator10.js'
import * as generator10_2 from '../generators/generator10_2.js'
import * as generator10_3 from '../generators/generator10_3.js'
import * as teaserGenerator from '../generators/teaserGenerator.js'

const generators = {
  generator1,
  generator1_2,
  generator1_3,
  generator2,
  generator2_2,
  generator2_3,
  generator3,
  generator3_2,
  generator4,
  generator4_2,
  generator4_3,
  generator4_4,
  generator4_5,
  generator5,
  generator5_2,
  generator6,
  generator6_2,
  generator7,
  generator7_2,
  generator7_3,
  generator8,
  generator8_2,
  generator8_3,
  generator9,
  generator9_2,
  generator9_3,
  generator10,
  generator10_2,
  generator10_3,
  teaserGenerator
}

let moduleList,
blendStore,
moduleBackgroundStore,
moduleBackgroundImageStore,
moduleBasicTypoStore,
moduleBasicTypoV2Store,
moduleImageStore,
module3DStore,
moduleLinesStore,
moduleParticlesStore,
moduleShapesStore,
moduleVinylStore,
moduleOverlayStore,
allFonts,
moduleUploadImageStore
// canvasSize

function initStore(generatorName) {
  moduleList = generators[generatorName].modules

  blendStore = generators[generatorName].preset.blend

  allFonts = initFontsStore()

  moduleList.forEach(moduleName => {
    if (moduleName == 'Background') {
      moduleBackgroundStore = initBackgroundStore(generators[generatorName].preset['Background'])
    }

    if (moduleName == 'Shapes') {
      moduleShapesStore = initShapesStore(generators[generatorName].preset['Shapes'])
    }

    if (moduleName == 'Particles') {
      moduleParticlesStore = initParticles(generators[generatorName].preset['Particles'])
    }

    if (moduleName == 'UploadImage') {
      moduleUploadImageStore = initUploadImageStore(generators[generatorName].preset['UploadImage']);
    }

    if (moduleName == 'Image') {
      moduleImageStore = initImages(generators[generatorName].preset['Image'])
    }

    if (moduleName == 'BackgroundImage') {
      moduleBackgroundImageStore = initBackgroundImageStore(generators[generatorName].preset['BackgroundImage'])
    }

    if (moduleName == 'Vinyl') {
      moduleVinylStore = initVinylStore(generators[generatorName].preset['Vinyl'])
    }

    if (moduleName == 'BasicTypo') {
      moduleBasicTypoStore = initBasicTypoStore(generators[generatorName].preset['BasicTypo'])
    }

    if (moduleName == 'BasicTypoV2') {
      moduleBasicTypoV2Store = initBasicTypoV2Store(generators[generatorName].preset['BasicTypoV2'])
    }

    if (moduleName == 'Lines') {
      moduleLinesStore = initLinesStore(generators[generatorName].preset['Lines'])
    }
    if (moduleName == 'Module3D') {
      module3DStore = init3DStore(generators[generatorName].preset['Module3D'])
    }
    if (moduleName == 'Overlay') {
      moduleOverlayStore = initOverlayStore(generators[generatorName].preset['Overlay'])
    }
  })
}

function getModuleList() {
  return moduleList
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////// BLEND

function getBlendStore() {
  return blendStore
}

/////// GENERATE FUNCTIONS

function generateColor() {
  const color = []

  color.push(parseInt(getRandomArbitrary(0, 255)))
  color.push(parseInt(getRandomArbitrary(0, 255)))
  color.push(parseInt(getRandomArbitrary(0, 255)))

  return color
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // swap elements
  }
  return array;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Background

////////////////////// BACKGROUND

// function generateNoise() {
//   const value = []

//   value.push(parseInt(getRandomArbitrary(0, 255)))
//   value.push(parseInt(getRandomArbitrary(0, 255)))
//   value.push(parseInt(getRandomArbitrary(0, 255)))
//   value.push(parseInt(getRandomArbitrary(0, 255)))

//   return value
// }

function initBackgroundStore(background) {
  background = Object.assign({}, background, { moduleName: 'Background', locked: false })

  background.backgroundTypes.forEach((backgroundType) => {
    if (backgroundType == 'SolidColor') {
      background.preset.SolidColor = Object.assign({}, background.preset.SolidColor, { text: 'Solid color', locked: false, })
    }

    if (backgroundType == 'Gradient') {
      background.preset.Gradient = Object.assign({}, background.preset.Gradient, { text: 'Gradient', angle: {value: 'angle1', locked: false}, locked: false })
    }

    if (backgroundType == 'Noise') {
      const images = importAll(
        require.context('../images/ui/tabBackgrounds/noise', false, /\.(png|jpe?g|svg)$/)
      )

      background.preset.Noise = Object.assign({}, background.preset.Noise, { text: 'Noise', locked: false, tabBackgrounds: images})

      background.preset.Noise.NoiseTypes.forEach((noiseType) => {
        if (noiseType == 'Small') {
          background.preset.Noise.preset.Small = Object.assign({}, background.preset.Noise.preset.Small, { text: 'SMALL'})
        }
        if (noiseType == 'Medium') {
          background.preset.Noise.preset.Medium = Object.assign({}, background.preset.Noise.preset.Medium, { text: 'MEDIUM'})
        }
        if (noiseType == 'Big') {
          background.preset.Noise.preset.Big = Object.assign({}, background.preset.Noise.preset.Big, { text: 'BIG'})
        }
      })
    }

    if (backgroundType == 'Pixels') {
      background.preset.Pixels = Object.assign({}, background.preset.Pixels, { text: 'Pixels', locked: false })
    }
  })

  return background
}

function getBackgroundStore() {
  return moduleBackgroundStore
}

function setBackgroundStore(type, value) {
  let color1, color2

  return new Promise((resolve, reject) => {
    if (type === 'CurrentTabChange') {
      moduleBackgroundStore.currentBackgroundType = value
      resolve([value])
    }

    if (type === 'CurrentGradientType') {
      moduleBackgroundStore.preset.Gradient.currentGradientType = value
      // resolve([value])
      resolve([moduleBackgroundStore.preset.Gradient.currentGradientType])
    }

    if (type === 'SolidColor') {
      moduleBackgroundStore.preset.SolidColor.color = value
      resolve([value])
    }

    if (type === 'Gradient') {
      color1 = generateColor()
      color2 = generateColor()
      moduleBackgroundStore.preset.Gradient.color1 = color1
      moduleBackgroundStore.preset.Gradient.color2 = color2
      resolve([color1, color2])
    }
    if (type === 'GradientColor1') {
      moduleBackgroundStore.preset.Gradient.color1 = value
      resolve([value, moduleBackgroundStore.preset.Gradient.color2])
    }
    if (type === 'GradientColor2') {
      moduleBackgroundStore.preset.Gradient.color2 = value
      resolve([moduleBackgroundStore.preset.Gradient.color1, value])
    }
    if (type === 'AngleGradient') {
      moduleBackgroundStore.preset.Gradient.angle.value = changeGradientAngle()
      resolve([moduleBackgroundStore.preset.Gradient.angle.value])
    }
    if (type == 'RandomizeAngleGradient') {
      moduleBackgroundStore.preset.Gradient.angle.value = value
    }
    if (type == 'RandomizeGradientType') {
      moduleBackgroundStore.preset.Gradient.currentGradientType = value
    }
    if (type === 'stopQuantity') {
      moduleBackgroundStore.preset.Gradient.stops.quantity = parseInt(value)
      // resolve([moduleBackgroundStore.preset.Gradient.stops.quantity])
      //??
      // console.log('store value', moduleBackgroundStore.preset.Gradient.stops.quantity);
      resolve([value])
    }
    if (type === 'TintColor') {
      moduleBackgroundStore.preset.Noise.tintColor = value
      resolve([value])
    }

    if (type === 'currentTabImageChange') {
      moduleBackgroundStore.preset.Noise.currentNoiseType = value
      window.resetNoise()
    }

    //

    if (type == 'lockTabs') {
      moduleBackgroundStore.locked = value
    }
    if (type == 'lockSolidColor') {
      moduleBackgroundStore.preset.SolidColor.locked = value
    }
    if (type == 'lockGradient') {
      moduleBackgroundStore.preset.Gradient.locked = value
    }
    if (type == 'lockGradientType') {
      moduleBackgroundStore.preset.Gradient.typeLocked = value
    }
    if (type == 'lockGradientAngle') {
      moduleBackgroundStore.preset.Gradient.angle.locked = value
    }
    if (type == 'lockGradientStopQuantity') {
      moduleBackgroundStore.preset.Gradient.stops.locked = value
    }
    if (type == 'lockNoise') {
      moduleBackgroundStore.preset.Noise.locked = value
    }
    if (type == 'lockTintColor') {
      moduleBackgroundStore.preset.Noise.tintColorLock = value
    }
    if (type == 'lockPixels') {
      moduleBackgroundStore.preset.Pixels.locked = value
    }

  })
}

function changeGradientAngle() {
  let angle = ''

  if (moduleBackgroundStore.preset.Gradient.angle.value === 'angle1') {
    angle = 'angle2'
  }
  if (moduleBackgroundStore.preset.Gradient.angle.value === 'angle2') {
    angle = 'angle3'
  }
  if (moduleBackgroundStore.preset.Gradient.angle.value === 'angle3') {
    angle = 'angle4'
  }
  if (moduleBackgroundStore.preset.Gradient.angle.value === 'angle4') {
    angle = 'angle1'
  }

  return angle
}

////////////////////// BACKGROUND IMAGE

function initBackgroundImageStore(preset) {
  const collection1 = importAll(
    require.context('../images/sketchGraphics/backgroundImages/collection1NightClub', false, /\.(png|jpe?g|svg)$/)
  )
  const collection2 = importAll(
    require.context('../images/sketchGraphics/backgroundImages/collection2Cars', false, /\.(png|jpe?g|svg)$/)
  )

  const images = importAll(
    require.context('../images/ui/tabBackgrounds/backgroundImages', false, /\.(png|jpe?g|svg)$/)
  )

  preset = Object.assign({}, preset, { moduleName: 'Background Image', tabBackgrounds: images })

  preset.backgroundImageCollections.forEach((collection) => {
    if (collection === 'NightClub') {
      preset.preset.NightClub = Object.assign({}, preset.preset.NightClub, { text: 'Night Club', images: collection1, current: sample(Object.keys(collection1)) })
    }

    if (collection === 'Cars') {
      preset.preset.Cars = Object.assign({}, preset.preset.Cars, { text: 'Cars', images: collection2, current: sample(Object.keys(collection2)) })
    }
  })

  return preset
}

function getBackgroundImageStore() {
  return moduleBackgroundImageStore
}

function setBackgroundImageStore(type, value) {
  return new Promise((resolve, reject) => {
    if (type === 'CurrentTabChange') {
      moduleBackgroundImageStore.currentBackgroundImageCollection = value
      resolve([value])
    }

    if (type === 'NightClub') {
      moduleBackgroundImageStore.preset.NightClub.current = sample(Object.keys(moduleBackgroundImageStore.preset.NightClub.images))
    }
    if (type === 'Cars') {
      moduleBackgroundImageStore.preset.Cars.current = sample(Object.keys(moduleBackgroundImageStore.preset.Cars.images))
    }
    if (type === 'opacity') {
      moduleBackgroundImageStore.opacity = value
      resolve([value])
    }

    //
    if (type == 'lockTabs') {
      moduleBackgroundImageStore.locked = value
    }
    if (type == 'lockOpacity') {
      moduleBackgroundImageStore.opacityLock = value
    }

  })
}

// Graphics

////////////////////// UPLOAD IMAGES

function initUploadImageStore(preset) {
  preset = Object.assign({}, preset, { 
    moduleName: 'Upload Image',
    //size: 50, // Default size as 50% of canvas
    //opacity: 100, // Default opacity as 100%
    //positionIndex: 0, // Default position (top-left)
    //positions: [
    //  'top-left', 'top-middle', 'top-right',
    //  'middle-left', 'middle-right',
    //  'bottom-left', 'bottom-middle', 'bottom-right'
    //],
    uploadedImage: null,
    sizeLock: false,
    opacityLock: false,
    positionLock: false
  });
  
  return preset;
}

function getUploadImageStore() {
  return moduleUploadImageStore;
}

function setUploadImageStore(type, value) {
  return new Promise((resolve, reject) => {
    if (type === 'size') {
      moduleUploadImageStore.size = value;
      resolve([value]);
    }
    if (type === 'opacity') {
      moduleUploadImageStore.opacity = value;
      resolve([value]);
    }
    if (type === 'uploadImage') {
      moduleUploadImageStore.uploadedImage = value;
      
      // Randomize position when a new image is uploaded (if not locked)
      if (!moduleUploadImageStore.positionLock) {
      randomizeImagePosition();
      }
      
      resolve([value]);
    }
    
    // Lock controls
    if (type === 'lockSize') {
      moduleUploadImageStore.sizeLock = value;
    }
    if (type === 'lockOpacity') {
      moduleUploadImageStore.opacityLock = value;
    }
    if (type === 'lockPosition') {
      moduleUploadImageStore.positionLock = value;
    }
  });
}

// New helper function to randomize the image position
function randomizeImagePosition() {
  if (moduleUploadImageStore && moduleUploadImageStore.uploadedImage) {
    const positions = moduleUploadImageStore.positions;
    const randomIndex = Math.floor(Math.random() * positions.length);
    moduleUploadImageStore.positionIndex = randomIndex;
  }
}

////////////////////// IMAGES

function initImages(preset) {
  const shoesCollection = importAll(
    require.context('../images/sketchGraphics/shoes', false, /\.(png|jpe?g|svg)$/)
  )
  const toolsCollection = importAll(
    require.context('../images/sketchGraphics/tools', false, /\.(png|jpe?g|svg)$/)
  )

  const images = importAll(
    require.context('../images/ui/tabBackgrounds/objects', false, /\.(png|jpe?g|svg)$/)
  )

  preset = Object.assign({}, preset, { moduleName: 'Objects', tabBackgrounds: images })

  preset.collections.forEach((collection) => {
    if (collection == 'Shoes') {
      preset.preset.Shoes = Object.assign({}, preset.preset.Shoes, { text: 'Shoes', images: shoesCollection, current: sample(Object.keys(shoesCollection)) })
    }
    if (collection == 'Tools') {
      preset.preset.Tools = Object.assign({}, preset.preset.Tools, { text: 'Tools', images: toolsCollection, current: sample(Object.keys(toolsCollection)) })
    }
  })

  return preset
  // return {
  //   images: images,
  //   current: sample(Object.keys(images)),
  //   pixelate: preset.pixelate
  // }
}

function getImageStore() {
  return moduleImageStore
}

function setImageStore(type, value) {
  return new Promise((resolve, reject) => { 
    if (type === 'CurrentTabChange') {
      moduleImageStore.currentCollection = value
      resolve([value])
    }

    if (type === 'Shoes') {
      moduleImageStore.preset.Shoes.current = sample(Object.keys(moduleImageStore.preset.Shoes.images))
    }
    if (type === 'Tools') {
      moduleImageStore.preset.Tools.current = sample(Object.keys(moduleImageStore.preset.Tools.images))
    }

    if (type == 'lockTabs') {
      moduleImageStore.locked = value
    }
  })
}

////////////////////// LINES


function generateRandomPoints(numPoints) {
  let points = [];
  for (let i = 0; i < numPoints; i++) {
    let x =  getRandomArbitrary(0, 100);
    let y =  getRandomArbitrary(0, 100);
    points.push({ x: x, y: y });
  }

  return points;
}

function generateMultiplePointSets(numSets, numPoints) {
  let allPoints = [];
  for (let i = 0; i < numSets; i++) {
    let points = generateRandomPoints(numPoints);
    allPoints.push(points);
  }
  return allPoints;
}

function generateLines(quantity, layout) {
  const lines = []

  if (layout == 'Horizontal') {
    for (let index = 0; index < quantity; index++) {
      let y = getRandomArbitrary(0, 100)
      lines.push([
        getRandomArbitrary(0, 100),
        y,
        getRandomArbitrary(0, 100),
        y
      ])
    }
  }

  if (layout == 'Vertical') {
    for (let index = 0; index < quantity; index++) {
      let x = getRandomArbitrary(0, 100)
      lines.push([
        x,
        getRandomArbitrary(0, 100),
        x,
        getRandomArbitrary(0, 100)
      ])
    }
  }

  if (layout == 'Bazar') {
    for (let index = 0; index < quantity; index++) {
      lines.push([
        getRandomArbitrary(0, 100),
        getRandomArbitrary(0, 100),
        getRandomArbitrary(0, 100),
        getRandomArbitrary(0, 100)
      ])
    }
  }

  return lines
}

function generateArcs(quantity, layout) {
  const lines = []

  if (layout == 'Bazar') {
    for (let index = 0; index < quantity; index++) {
      lines.push([
        getRandomArbitrary(0, 100),
        getRandomArbitrary(0, 100),
        getRandomArbitrary(0, 100),
        getRandomArbitrary(0, 100),
        getRandomArbitrary(0, 360),
        getRandomArbitrary(0, 360)
        // (getRandomArbitrary(0, 360)* Math.PI ) /180,
        // (getRandomArbitrary(0, 360)* Math.PI ) /180
      ])
    }
  }

  if (layout == 'Vertical') {
    let y = getRandomArbitrary(0, 100)
    let w = getRandomArbitrary(0, 100)
    let h = getRandomArbitrary(0, 100)
    // let angle = (getRandomArbitrary(0, 360)* Math.PI ) /180
    let angle1 = getRandomArbitrary(0, 360)
    let angle2 = getRandomArbitrary(0, 360)

    let rows = 5

    for (let row = 0; row < rows; row++) {
      let y = getRandomArbitrary(0, 100)
      let newY = y

      for (let index = 0; index < quantity; index++) {
        lines.push([
          getRandomArbitrary(0, 100),
          y,
          w,
          h,
          angle1,
          angle2
        ]);

        if (index === Math.floor(quantity / 2)) {
          newY = getRandomArbitrary(0, 100);
          for (let innerIndex = index; innerIndex < quantity; innerIndex++) {
            lines.push([
              getRandomArbitrary(0, 100),
              newY,
              w,
              h,
              angle1,
              angle2
            ]);
          }
          break;
        }
      }
    }
  }
  return lines
}

function bouncingRandom() {
  let points = [
    getRandomArbitrary(0, 100),
    getRandomArbitrary(0, 100),
    getRandomArbitrary(0, 100),
    getRandomArbitrary(0, 100)
  ]
  return points
}

function bouncingRange(range) {
  let points = [
    getRandomArbitrary(-range, range),
    getRandomArbitrary(-range, range),
    getRandomArbitrary(-range, range),
    getRandomArbitrary(-range, range)
  ]
  return points
}

//////

function initLinesStore(lines) {
  lines = Object.assign({}, lines, {
    moduleName: 'Lines',
    quantityLocked: false,
    lineTypeLocked: false,
    strokeWeightLocked: false,
    colorLocked: false
  })

  lines.linesTypes.forEach((lineType) => {
    if (lineType == 'Straight') {
      lines.preset.Straight = Object.assign({}, lines.preset.Straight, { text: 'Straight Lines', straightLines: generateLines(lines.preset.Straight.quantity, lines.layout) })
    }
    if (lineType == 'Curves') {
      lines.preset.Curves = Object.assign({}, lines.preset.Curves, { text: 'Curvy Lines', pointsSets: generateMultiplePointSets(lines.preset.Curves.quantity, lines.preset.Curves.points) })
    }
    if (lineType == 'Arcs') {
      lines.preset.Arcs = Object.assign({}, lines.preset.Arcs, { text: 'Arcs', arcs: generateArcs(lines.preset.Arcs.quantity, lines.layout) })
    }
    if (lineType == 'Bouncing') {
      lines.preset.Bouncing = Object.assign({}, lines.preset.Bouncing, { text: 'Bouncing Lines', bouncingRandom: bouncingRandom(), bouncingRange: bouncingRange(2) })
    }
  })

  if (lines.currentLineType == 'Straight') {
    lines = Object.assign({}, lines, { sliderValueQuantity: lines.preset.Straight.quantity, maxQuantity: lines.preset.Straight.max })
  }
  if (lines.currentLineType == 'Curves') {
    lines = Object.assign({}, lines, { sliderValueQuantity: lines.preset.Curves.quantity, maxQuantity: lines.preset.Curves.max })
  }
  if (lines.currentLineType == 'Arcs') {
    lines = Object.assign({}, lines, { sliderValueQuantity: lines.preset.Arcs.quantity, maxQuantity: lines.preset.Arcs.max })
  }
  if (lines.currentLineType == 'Bouncing') {
    lines = Object.assign({}, lines, { sliderValueQuantity: lines.preset.Bouncing.quantity, maxQuantity: lines.preset.Bouncing.max })
  }
  
  return lines
}

function getLinesStore() {
  return moduleLinesStore
}

function setLinesStore(type, value) {
  return new Promise((resolve, reject) => {

    if (type === 'CurrentTypeChange') {
      moduleLinesStore.currentLineType = value
      if (value == 'Straight') {
        moduleLinesStore.maxQuantity = moduleLinesStore.preset.Straight.max
        moduleLinesStore.sliderValueQuantity = moduleLinesStore.preset.Straight.quantity
      }
      if (value == 'Curves') {
        moduleLinesStore.maxQuantity = moduleLinesStore.preset.Curves.max
      }
      if (value == 'Arcs') {
        moduleLinesStore.maxQuantity = moduleLinesStore.preset.Arcs.max
      }
      if (value == 'Bouncing') {
        moduleLinesStore.maxQuantity = moduleLinesStore.preset.Bouncing.max
      }
      resolve([value])
    }

    if (type === 'SolidColor') {
      moduleLinesStore.color = value
      resolve([value])
    }
    if (type === 'strokeWeight') {
      moduleLinesStore.strokeWeight = value
    }

    if (type === 'linesQuantity') {
      moduleLinesStore.sliderValueQuantity = value

      if (moduleLinesStore.currentLineType == 'Straight') {
        moduleLinesStore.preset.Straight.quantity = value
        //moduleLinesStore.maxQuantity = moduleLinesStore.preset.Straight.max
        moduleLinesStore.preset.Straight.straightLines= generateLines(moduleLinesStore.preset.Straight.quantity, moduleLinesStore.layout)
        resolve([value])
      }
      if (moduleLinesStore.currentLineType == 'Curves') {
        moduleLinesStore.preset.Curves.quantity = value
        //moduleLinesStore.preset.Curves.pointsSets= generateMultiplePointSets(moduleLinesStore.preset.Curves.quantity, moduleLinesStore.preset.Curves.points)
        //moduleLinesStore.maxQuantity = moduleLinesStore.preset.Curves.max
        moduleLinesStore.preset.Curves.pointsSets= generateMultiplePointSets(value, moduleLinesStore.preset.Curves.points)
        resolve([value])
      }
      if (moduleLinesStore.currentLineType == 'Arcs') {
        moduleLinesStore.preset.Arcs.quantity = value
        //moduleLinesStore.maxQuantity = moduleLinesStore.preset.Arcs.max
        moduleLinesStore.preset.Arcs.arcs = generateArcs(moduleLinesStore.preset.Arcs.quantity, moduleLinesStore.layout)
        resolve([value])
      }
      if (moduleLinesStore.currentLineType == 'Bouncing') {
        // console.log('yo');
        moduleLinesStore.preset.Bouncing.quantity = value
        //moduleLinesStore.maxQuantity = moduleLinesStore.preset.Bouncing.max
        moduleLinesStore.preset.Bouncing.bouncingRandom = bouncingRandom()
        moduleLinesStore.preset.Bouncing.bouncingRange = bouncingRange(2)
        resolve([value])
      }
    }
    //
    if (type === 'lockType') {
      moduleLinesStore.lineTypeLocked = value
    }
    if (type === 'lockWeight') {
      moduleLinesStore.strokeWeightLocked = value
    }
    if (type === 'lockColor') {
      moduleLinesStore.colorLocked = value
    }
    if (type === 'lockQuantity') {
      moduleLinesStore.quantityLocked = value
    }
  })
}

////////////////////// MODULE 3D

function init3DStore(preset) {
  preset = Object.assign({}, preset, { moduleName: '3D Shape', x: generateRandomNb(), y: generateRandomNb(), color1Locked: false, color2Locked: false, sizeLocked: false, sliderValue: 1 })

  preset.types.forEach((type) => {
    if (type == 'Torus') {
      preset.preset.Torus = Object.assign({}, preset.preset.Torus, { text: 'Torus' })
    }

    if (type == 'Square') {
      preset.preset.Square = Object.assign({}, preset.preset.Square, { text: 'Square' })
    }
  })

  return preset
}

function generateRandomNb() {
  let randomNb = getRandomArbitrary(0, 100)
  return randomNb
}

function get3DStore() {
  return module3DStore
}

function set3DStore(type, value) {
  return new Promise((resolve, reject) => { 
    if (type === 'CurrentTabChange') {
      module3DStore.current3DType = value
      resolve([value])
    } 
    if (type === 'randomize') {
      module3DStore.x = generateRandomNb()
      module3DStore.y = generateRandomNb()
    }
    if (type === 'SolidColor1') {
      module3DStore.color1 = value
      //console.log(module3DStore.color1);
      window.resetLight()
      resolve([value])
    }
    if (type === 'SolidColor2') {
      module3DStore.color2 = value
      //window.resetLight()
      resolve([value])
    }

    if (type === 'Size') {
      module3DStore.sliderValue = value
      resolve([value])
    }


    if (type === 'lockColor1') {
      module3DStore.color1Locked = value
    }
    if (type === 'lockColo2') {
      module3DStore.color2Locked = value
    }
    if (type === 'lockSize') {
      module3DStore.sizeLocked = value
    }
  })
}

////////////////////// PARTICLES

function initParticles(preset) {
  preset = Object.assign({}, preset, { moduleName: 'Particles', particles: generateParticles(preset.sliderValue) })

  preset.options.forEach((option) => {
    if (option == 'Ellipses') {
      preset.preset.Ellipses = Object.assign({}, preset.preset.Ellipses, { text: 'Ellipses' })
    }

    if (option == 'Squares') {
      preset.preset.Squares = Object.assign({}, preset.preset.Squares, { text: 'Squares' })
    }

    if (option == 'Mix') {
      preset.preset.Mix = Object.assign({}, preset.preset.Mix, { text: 'Mix' })
    }
  })

  return preset
}

function generateParticles(quantity) {
  const particles = []

  for (let index = 0; index < quantity; index++) {
    particles.push([
      getRandomArbitrary(0, 100),
      getRandomArbitrary(0, 100),
      getRandomArbitrary(0, 20),
      getRandomArbitrary(0, 100),
      getRandomArbitrary(0, 100),
      getRandomArbitrary(0, 20)
    ])
  }

  return particles
}

function getParticlesStore() {
  return moduleParticlesStore
}

function setParticlesStore(type, value) {

  return new Promise((resolve, reject) => {
    if (type === 'CurrentTabChange') {
      moduleParticlesStore.currentParticlesType = value
    } 
    if (type === 'quantity') {
      moduleParticlesStore.sliderValue = value
      moduleParticlesStore.particles = generateParticles(value)
      resolve([value])
    }
    if (type === 'SolidColor') {
      moduleParticlesStore.color = value
      resolve([value])
    }

    if (type === 'lockColor') {
      moduleParticlesStore.colorLocked = value
    }
    if (type === 'lockQuantity') {
      moduleParticlesStore.quantityLocked = value
    }
  })
}

////////////////////// SHAPES

function initShapesStore(shapes) {
  shapes = Object.assign({}, shapes, { moduleName: 'Shapes' })
  //shapes.settings = Object.assign({}, shapes.settings, { color: '#999999' })
  return shapes
}

function getShapesStore() {
  return moduleShapesStore
}

function setShapesStore(type, value) {
  return new Promise((resolve, reject) => {
    if (type === 'CurrentTabChange') {
      moduleShapesStore.currentType = value
    } 
    if (type === 'SolidColor') {
      moduleShapesStore.settings.color = value
      resolve([value])
    }
    if (type === 'Size') {
      moduleShapesStore.settings.sliderValue = value
      resolve([value])
    }
    if (type == 'lockColor') {
     moduleShapesStore.settings.colorLocked = value
    }
    resolve([value])
    if (type == 'lockSize') {
     moduleShapesStore.settings.sizeLocked = value
    }
    resolve([value])
  })
}

////////////////////// VINYL

function initVinylStore(preset) {
  const collection1 = importAll(
    require.context('../images/sketchGraphics/vinylPics/whole', false, /\.(png|jpe?g|svg)$/)
  )
  const collection2 = importAll(
    require.context('../images/sketchGraphics/vinylPics/label', false, /\.(png|jpe?g|svg)$/)
  )
  const collection3 = importAll(
    require.context('../images/sketchGraphics/vinylPics/vinyl', false, /\.(png|jpe?g|svg)$/)
  )

  const images = importAll(
    require.context('../images/ui/tabBackgrounds/vinyl')
  )

  preset = Object.assign({}, preset, { moduleName: 'Vinyl Disc', tabBackgrounds: images, locked: false, sizeLock: false, opacityLock: false })

  preset.vinylTypes.forEach((type) => {
    if (type === 'Whole') {
      preset.preset.Whole = Object.assign({}, preset.preset.Whole, {
        text: 'WHOLE DISC',
        images: collection1,
        current: sample(Object.keys(collection1))
      })
    }

    if (type === 'Label') {
      preset.preset.Label = Object.assign({}, preset.preset.Label, {
        text: 'DISC LABEL',
        images: collection2,
        current: sample(Object.keys(collection2))
      })
    }
    if (type === 'Vinyl') {
      preset.preset.Vinyl = Object.assign({}, preset.preset.Vinyl, {
        text: 'VINYL',
        images: collection3,
        current: sample(Object.keys(collection3))
      })
    }
  })

  return preset
}

function getVinylStore() {
  return moduleVinylStore
}

function setVinylStore(type, value) {
  return new Promise((resolve, reject) => {
    if (type === 'CurrentTabChange') {
      moduleVinylStore.currentVinylType = value
      resolve([value])
    }
    if (type === 'size') {
      // console.log('1///', value);
      moduleVinylStore.size = value
      // console.log('2///', value);
      resolve([value])
      // console.log('3///', value);
    }
    if (type === 'opacity') {
      moduleVinylStore.opacity = value
      resolve([value])
    }
    if (type === 'TintColor') {
      moduleVinylStore.tintColor = value
      resolve([value])
    }

    //

    if (type == 'lockTabs') {
      moduleVinylStore.locked = value
    }
    if (type == 'lockSize') {
      moduleVinylStore.sizeLock = value
    }
    if (type == 'lockOpacity') {
      moduleVinylStore.opacityLock = value
    }
    if (type == 'lockTintColor') {
      moduleVinylStore.tintColorLock = value
    }
  })
}

// Text

////////////////////// BASICTYPO

function generatePositions() {

  let positions = [
    // // { x: 5, y: 5 }, // top-left
    // { x: 0, y: 0 }, // top-left
    // // { x: 50, y: 5 }, // top-center
    // { x: 50, y: 0 }, // top-center
    // // { x: 30, y: 5 }, // top-center
    // // { x: 95, y: 5 }, // top-right
    // { x: 100, y: 0 }, // top-right
    // // { x: 5, y: 95 }, // bottom-left
    // { x: 0, y: 100 }, // bottom-left
    // // { x: 30, y: 95 }, // bottom-center
    // // { x: 50, y: 95 }, // bottom-center
    // { x: 50, y: 100 }, // bottom-center
    // // { x: 60, y: 95 } // bottom-right
    // { x: 100, y: 100 } // bottom-right
    // // { x: 95, y: 95 } // bottom-right
    ['left', 'top' ], ['center', 'top'], ['right', 'top'],
    ['left', 'bottom'], ['center', 'bottom'], ['right', 'bottom']
  ];
  // let randomPosition = sample(positions)

  // let randomPositions = shuffleArray(positions)


  // let textPositions = Object.assign({}, textPositions, { randomPosition: randomPosition, randomPositions: randomPositions })
  // let textPositions = Object.assign({}, textPositions, { randomPositions })

  // Generate two distinct random indices
  // let randomIndex1 = Math.floor(Math.random() * positions.length);
  // let randomIndex2;
  // do {
  //   randomIndex2 = Math.floor(Math.random() * positions.length);
  // } while (randomIndex2 === randomIndex1);
  // const txtPosition1 = positions[randomIndex1];
  // const txtPosition2 = positions[randomIndex2];
  // return [txtPosition1, txtPosition2];

  return shuffleArray(positions)
}

function setfont(fontType) {

  let font

  //let sansSerifFonts = ['ADC-Semi-Bold', 'MintSansRegular', 'LiberationSans-Regular']
  //let sansSerifFonts = ['aDC', 'mint', 'liberation']

  //let sansSerifFonts = ['Aileron-Bold']
  let sansSerifFonts = ['Barlow Semi Condensed', 'DM Sans', 'Poppins', 'Space Grotesk', 'Teko', 'Aileron-Bold']

  //let scriptFonts = ['MeaCulpa-Regular', 'LuxuriousScript-Regular', 'PinyonScript-Regular', 'Italianno-Regular']
  //let scriptFonts = ['meaculpa', 'luxuriousScript', 'pinyonScript', 'italianno']
  let scriptFonts = ['Mea Culpa', 'Luxurious Script', 'Pinyon Script', 'Italianno']

  if (fontType == 'Script') {
    font = sample(scriptFonts)
  }
  if (fontType == 'Sans Serif') {
    font = sample(sansSerifFonts)
  }

  return font
}

function initBasicTypoStore(preset) {

  let positions = generatePositions()

  //let fontMainText
  //let fontOtherText
  
  //if (preset.mainText.currentFont == 'Script') {
  //  fontMainText = sample(scriptFonts)
  //}
  //if (preset.mainText.currentFont == 'Sans Serif') {
  //  fontMainText = sample(sansSerifFonts)
  //}

  //if (preset.otherText.currentFont == 'Script') {
  //  fontOtherText = sample(scriptFonts)
  //}
  //if (preset.otherText.currentFont == 'Sans Serif') {
  //  fontOtherText = sample(sansSerifFonts)
  //}


  preset = Object.assign({}, preset, {
    moduleName: 'Typography',
    //colorLocked: false,
    // textPositions : [[], []]
    textPositions: positions,
    //textPositions: {randomPosition: { x: 60, y: 95 }, randomPositions: [{ x: 5, y: 5 },{ x: 30, y: 5 },{ x: 60, y: 5 },{ x: 5, y: 95 },{ x: 30, y: 95 },{ x: 60, y: 95 }] }
    fontMainText: setfont(preset.mainText.currentFont),
    fontOtherText: setfont(preset.otherText.currentFont)
  })

  return preset
}

function getBasicTypoStore() {
  return moduleBasicTypoStore
}

function setBasicTypoStore(type, nextValue) {
  return new Promise((resolve, reject) => {
    if (type === 'CurrentMainFontChange') {
      moduleBasicTypoStore.mainText.currentFont = nextValue

      if (nextValue == 'Script') {
        moduleBasicTypoStore.fontMainText = setfont(moduleBasicTypoStore.mainText.currentFont)
      }
      if (nextValue == 'Sans Serif') {
        moduleBasicTypoStore.fontMainText = setfont(moduleBasicTypoStore.mainText.currentFont)
      }
      resolve([nextValue])
    }
    if (type === 'CurrentOtherFontChange') {
      moduleBasicTypoStore.otherText.currentFont = nextValue

      if (nextValue == 'Script') {
        moduleBasicTypoStore.fontOtherText = setfont(moduleBasicTypoStore.otherText.currentFont)
      }
      if (nextValue == 'Sans Serif') {
        moduleBasicTypoStore.fontOtherText = setfont(moduleBasicTypoStore.otherText.currentFont)
      }
      resolve([nextValue])
    }


    if (type == 'mainText') {
      moduleBasicTypoStore.mainText.value = nextValue
    }
    if (type == 'sizeMainText') {
      moduleBasicTypoStore.mainText.size.sliderValue = nextValue
      resolve([nextValue])
    }
    if (type == 'leadingMainText') {
      moduleBasicTypoStore.mainText.leading.sliderValue = nextValue
      resolve([nextValue])
    }
    //if (type === 'spacingMainText') {
    //  moduleBasicTypoStore.mainText.spacing.sliderValue = nextValue
    //  resolve([nextValue])
    //}
    if (type === 'sizeOtherText') {
      moduleBasicTypoStore.otherText.size.sliderValue = nextValue
      resolve([nextValue])
    }
    if (type == 'leadingOtherText') {
      moduleBasicTypoStore.otherText.leading.sliderValue = nextValue
      resolve([nextValue])
    }
    // if (type === 'StyleTabChange') {
    //   moduleBasicTypoStore.styleMainText = nextValue
    //   resolve([nextValue])
    // } 
    if (type === 'otherText') {
      moduleBasicTypoStore.otherText.value = nextValue
    }

     if (type === 'textarea') {
      moduleBasicTypoStore.otherText.values = nextValue
    }

    //COLOR??
    if (type === 'colorMainText') {
      moduleBasicTypoStore.mainText.color = nextValue
      resolve([nextValue])
    }
    if (type === 'colorOtherText') {
      moduleBasicTypoStore.otherText.color = nextValue
      resolve([nextValue])
    }
    if (type === 'Positions') {
      let positions = generatePositions()
      moduleBasicTypoStore.textPositions = positions
    }


    if (type == 'mainLockColor') {
      moduleBasicTypoStore.mainText.colorLocked = nextValue
    }
    if (type == 'mainLockType') {
      moduleBasicTypoStore.mainText.typeLocked = nextValue
    }
    if (type == 'mainLockSize') {
      moduleBasicTypoStore.mainText.sizeLocked = nextValue
    }
    if (type == 'mainLockLeading') {
      moduleBasicTypoStore.mainText.leadingLocked = nextValue
    }

    if (type == 'otherLockColor') {
      moduleBasicTypoStore.otherText.colorLocked = nextValue
    }
    if (type == 'otherLockType') {
      moduleBasicTypoStore.otherText.typeLocked = nextValue
    }
    if (type == 'otherLockSize') {
      moduleBasicTypoStore.otherText.sizeLocked = nextValue
    }
    if (type == 'otherLockLeading') {
      moduleBasicTypoStore.otherText.leadingLocked = nextValue
    }
  })
}

////////////////////// BASICTYPO V2

function calculateCirclePositions(R, n) {
  const positions = [];
  // const centerX = 100 / 2;
  // const centerY = 100 / 2;
  const angleStep = 2 * Math.PI / n;

  for (let i = 0; i < n; i++) {
    const angle = angleStep * i;
    const x = 50 + R * Math.cos(angle);
    const y = 50 + R * Math.sin(angle);
    positions.push({ x, y });
  }

  return positions;
}


function initBasicTypoV2Store(preset) {
  let positions = calculateCirclePositions(33, 50)

  // console.log(positions);
  
  preset = Object.assign({}, preset, { moduleName: 'Typography', txtpositions: positions })

  return preset
}

function getBasicTypoV2Store() {
  return moduleBasicTypoV2Store
}

function setBasicTypoV2Store(type, nextValue) {
  return new Promise((resolve, reject) => {
    if (type === 'CurrentTabChange') {
      moduleBasicTypoV2Store.font = nextValue
      resolve([nextValue])
    } 
    if (type === 'mainText') {
      moduleBasicTypoV2Store.textInput = nextValue
    }
    if (type === 'sizeMainText') {
      moduleBasicTypoV2Store.sizeText.sliderValue = nextValue
      resolve([nextValue])
    }
    if (type === 'StyleTabChange') {
      moduleBasicTypoV2Store.styleText = nextValue
      resolve([nextValue])
    }
    if (type === 'SolidColor') {
      moduleBasicTypoV2Store.color = nextValue
      resolve([nextValue])
    }
  })
}

// Overlay

////////////////////// OVERLAY

function initOverlayStore(preset) {
  const collection1 = importAll(
    require.context('../images/sketchGraphics/overlays/collection1Plastic', false, /\.(png|jpe?g|svg)$/)
  )
  const collection2 = importAll(
    require.context('../images/sketchGraphics/overlays/collection2Stickers', false, /\.(png|jpe?g|svg)$/)
  )

  const images = importAll(
    require.context('../images/ui/tabBackgrounds/overlays', false, /\.(png|jpe?g|svg)$/)
  )

  
  preset = Object.assign({}, preset, { moduleName: 'Overlay', tabBackgrounds: images, locked: false, opacityLock: false })

  preset.collections.forEach((collection) => {
    if (collection === 'Plastic') {
      preset.preset.Plastic = Object.assign({}, preset.preset.Plastic, { text: 'Plastic', images: collection1, current: sample(Object.keys(collection1)) })
    }

    if (collection === 'Stickers') {
      preset.preset.Stickers = Object.assign({}, preset.preset.Stickers, { text: 'Stickers', images: collection2, current: sample(Object.keys(collection2)) })
    }
  })

  return preset
}

function getOverlayStore() {
  return moduleOverlayStore
}

function setOverlayStore(type, value) {
  return new Promise((resolve, reject) => { 
    if (type === 'CurrentTabChange') {
      moduleOverlayStore.currentCollection = value
      resolve([value])
    }

    if (type === 'Plastic') {
      moduleOverlayStore.preset.Plastic.current = sample(Object.keys(moduleOverlayStore.preset.Plastic.images))
    }
    if (type === 'Stickers') {
      moduleOverlayStore.preset.Stickers.current = sample(Object.keys(moduleOverlayStore.preset.Stickers.images))
    }
    if (type === 'opacity') {
      moduleOverlayStore.opacity = value
      resolve([value])
    }

    if (type == 'lockTabs') {
      moduleOverlayStore.locked = value
    }
    if (type == 'lockOpacity') {
      moduleOverlayStore.opacityLock = value
    }
  })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////// GENERATE ALL

function generateAllStore(generatorName, moduleList) {

  blendStore = generators[generatorName].preset.blend
  allFonts = initFontsStore()

  let data = []

  return new Promise((resolve, reject) => {

    moduleList.forEach(moduleName => {

       if (moduleName == 'Background') {
        
        // if (moduleBackgroundStore.currentBackgroundType == 'SolidColor' && moduleBackgroundStore.preset.SolidColor.locked == false) {
        //   let newSolidColor=generateColor()
        //   setBackgroundStore('SolidColor', newSolidColor)
           
        // }

         if (moduleBackgroundStore.currentBackgroundType == 'Gradient' && moduleBackgroundStore.preset.Gradient.locked == false) {
           let newGradientColor1, newGradientColor2
           setBackgroundStore('Gradient')
             .then((colors) => {
               newGradientColor1 = colors[0]
               newGradientColor2 = colors[1]
             })
            
             let newAngle
             setBackgroundStore('AngleGradient')
               .then((randomAngle) => {
                 newAngle = randomAngle
               })
         }

         if (moduleBackgroundStore.currentBackgroundType == 'Noise' && moduleBackgroundStore.preset.Noise.locked == false) {
           window.resetNoise()
         }

         if (moduleBackgroundStore.currentBackgroundType == 'Pixels' && moduleBackgroundStore.preset.Pixels.locked == false) {
           window.resetPixels()
         }
       }

      if (moduleName == 'Shapes') {

        //let shapesColor = generateColor()
        //setShapesStore('SolidColor', shapesColor)

        if (moduleShapesStore.currentType == 'Ellipses' && moduleShapesStore.settings.sizeLocked == false) {
          let shapesSize = getRandomArbitrary(0, 100)
          setShapesStore('Size', shapesSize)
        }

        
      }

      if (moduleName == 'Particles') {

        // let particlesQuantity = getRandomArbitrary(moduleParticlesStore.min, moduleParticlesStore.max)
        setParticlesStore('quantity', moduleParticlesStore.sliderValue)

        //let particlesColor = generateColor()
        //setParticlesStore('SolidColor', particlesColor)
      }

      if (moduleName == 'Image') {
        window.resetRandoms()
        if (moduleImageStore.currentCollection == 'Shoes') {
          setImageStore('Shoes')
        } else if (moduleImageStore.collection == 'Electronics') {
          setImageStore('Electronics')
        }
      }

      if (moduleName == 'UploadImage') {
        if (!moduleUploadImageStore.positionLock) {
          randomizeImagePosition();
        }
      }

      if (moduleName == 'BackgroundImage') {
        
        if (moduleBackgroundImageStore.currentBackgroundImageCollection == 'NightClub') {
          setBackgroundImageStore('NightClub')
        } else if (moduleBackgroundImageStore.currentBackgroundImageCollection == 'Cars') {
          setBackgroundImageStore('Cars')
        }

        //let bgImgOpacity = getRandomArbitrary(10, 255)
        //setBackgroundImageStore('opacity', bgImgOpacity)
      }

       if (moduleName == 'Vinyl') {

        //if (moduleVinylStore.locked == false ){
        //  let Vinyltype = sample(moduleVinylStore.vinylTypes)
        //  setVinylStore('CurrentTabChange', Vinyltype)
        //}
        //if (moduleVinylStore.sizeLock == false) {
        //  setVinylStore('size', getRandomArbitrary(0, 100))
        //}
        //if (moduleVinylStore.opacityLock == false ){
        //  setVinylStore('opacity', getRandomArbitrary(0, 255))
        //}
        //if (moduleVinylStore.tintColorLock == false ){
        //  let newColor = generateColor()
        //  moduleVinylStore.tintColor = newColor
        //}
  
        if (moduleVinylStore.currentVinylType == 'Whole') {
          let newImage = sample(Object.keys(moduleVinylStore.preset.Whole.images))
          moduleVinylStore.preset.Whole.current = newImage
        }
        if (moduleVinylStore.currentVinylType == 'Label') {
          let newImage = sample(Object.keys(moduleVinylStore.preset.Label.images))
          moduleVinylStore.preset.Label.current = newImage
        }
        if (moduleVinylStore.currentVinylType == 'Vinyl') {
          let newImage = sample(Object.keys(moduleVinylStore.preset.Vinyl.images))
          moduleVinylStore.preset.Vinyl.current = newImage
        }
       }

      if (moduleName == 'BasicTypo') {
        setBasicTypoStore('Positions')
        
        moduleBasicTypoStore.fontMainText = setfont(moduleBasicTypoStore.mainText.currentFont)
        moduleBasicTypoStore.fontOtherText = setfont(moduleBasicTypoStore.otherText.currentFont)
      }

      if (moduleName == 'Lines') {
        
        if (moduleLinesStore.currentLineType == 'Straight') {
          moduleLinesStore.preset.Straight.straightLines = generateLines(moduleLinesStore.preset.Straight.quantity, moduleLinesStore.layout)
        }
        if (moduleLinesStore.currentLineType == 'Curves') {
          moduleLinesStore.preset.Curves.pointsSets= generateMultiplePointSets(moduleLinesStore.preset.Curves.quantity, moduleLinesStore.preset.Curves.points)
        }
        if (moduleLinesStore.currentLineType == 'Arcs') {
          moduleLinesStore.preset.Arcs.arcs = generateArcs(moduleLinesStore.preset.Arcs.quantity, moduleLinesStore.layout)
        }
        if (moduleLinesStore.currentLineType == 'Bouncing') {
          moduleLinesStore.preset.Bouncing.bouncingRandom = bouncingRandom()
          moduleLinesStore.preset.Bouncing.bouncingRange = bouncingRange(2)
        }


      }

      if (moduleName == 'Module3D') {
        set3DStore('randomize')
      }

      if (moduleName == 'Overlay') {

        if (moduleOverlayStore.currentCollection == 'Plastic') {
          setOverlayStore('Plastic')
        } else if (moduleOverlayStore.currentCollection == 'Stickers') {
          setOverlayStore('Stickers')
        }

        let overlayOpacity = getRandomArbitrary(10, 255)
        setOverlayStore('opacity', overlayOpacity)
        
      }
    })

    resolve(data)

  })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////// RANDOMIZE MODULE

function randomizeModuleStore(moduleType) {

  return new Promise((resolve, reject) => {

    if (moduleType == 'Background') {

      let newBackgroundType = moduleBackgroundStore.currentBackgroundType

      if (moduleBackgroundStore.locked == false) {
        newBackgroundType = sample(moduleBackgroundStore.backgroundTypes)
        setBackgroundStore('CurrentTabChange', newBackgroundType)
      }
      
      if (newBackgroundType == 'SolidColor' && moduleBackgroundStore.preset.SolidColor.locked == false) {
        setBackgroundStore('SolidColor', generateColor())
      }

      if (newBackgroundType == 'Gradient' && moduleBackgroundStore.preset.Gradient.locked == false) {
        
        setBackgroundStore('Gradient')

      }
      if (moduleBackgroundStore.preset.Gradient.typeLocked == false) {
        moduleBackgroundStore.preset.Gradient.currentGradientType = sample(moduleBackgroundStore.preset.Gradient.gradientTypes)
        //let newBackgroundGradientType = sample(moduleBackgroundStore.preset.Gradient.gradientTypes)
        //setBackgroundStore('CurrentGradientType', newBackgroundGradientType)
      }

      if (moduleBackgroundStore.preset.Gradient.angle.locked == false) {
        let newAngle = sample(['angle1', 'angle2', 'angle3', 'angle4'])
        setBackgroundStore('RandomizeAngleGradient', newAngle)
      }

      if (moduleBackgroundStore.preset.Gradient.stops.locked == false) {
        let newQuantity = getRandomArbitrary(0, moduleBackgroundStore.preset.Gradient.stops.max)
        setBackgroundStore('stopQuantity', newQuantity)
      }

      if (newBackgroundType == 'Noise' && moduleBackgroundStore.preset.Noise.locked == false) {
        let newNoiseType = sample(moduleBackgroundStore.preset.Noise.NoiseTypes)
        setBackgroundStore('currentTabImageChange', newNoiseType)
        window.resetNoise()
      }

      if (newBackgroundType == 'Pixels' && moduleBackgroundStore.preset.Pixels.locked == false) {
        window.resetPixels()
      }

    }

    if (moduleType === 'UploadImage') {
      // Randomize position if not locked and an image is uploaded
      if (moduleUploadImageStore.uploadedImage && !moduleUploadImageStore.positionLock) {
        const positions = moduleUploadImageStore.positions;
        const randomIndex = Math.floor(Math.random() * positions.length);
        moduleUploadImageStore.positionIndex = randomIndex;
      }
      
      // Randomize size if not locked
      if (!moduleUploadImageStore.sizeLock) {
        moduleUploadImageStore.size = getRandomArbitrary(5, 50);
      }
      
      // Randomize opacity if not locked
      if (!moduleUploadImageStore.opacityLock) {
        moduleUploadImageStore.opacity = getRandomArbitrary(50, 255);
      }
    }

    if (moduleType == 'BackgroundImage') {
      let BackgroundImageType = sample(moduleBackgroundImageStore.backgroundImageCollections)
      setBackgroundImageStore('CurrentTabChange', BackgroundImageType)

      if (BackgroundImageType == 'NightClub') {
        setBackgroundImageStore('NightClub')
      } else if (BackgroundImageType == 'Cars') {
        setBackgroundImageStore('Cars')
      }

      setBackgroundImageStore('opacity', getRandomArbitrary(10, 255))
    }

    if (moduleType == 'Shapes') {
      //update control with select
      let shapesType = sample(moduleShapesStore.types)
      setShapesStore('CurrentTabChange', shapesType)
      
      if (moduleShapesStore.settings.colorLocked == false) {
        setShapesStore('SolidColor', generateColor())
      }
      if (moduleShapesStore.settings.sizeLocked == false) {
        setShapesStore('Size', getRandomArbitrary(2, 74))
      }

    }

    if (moduleType == 'Particles') {
      let ParticlesTypes = sample(moduleParticlesStore.options)
      setParticlesStore('CurrentTabChange', ParticlesTypes)
      moduleParticlesStore.particles = generateParticles(moduleParticlesStore.sliderValue)
      
      if (moduleParticlesStore.quantityLocked == false) {
        setParticlesStore('quantity', getRandomArbitrary(moduleParticlesStore.min, moduleParticlesStore.max))
      }
      if (moduleParticlesStore.colorLocked == false) {
        setParticlesStore('SolidColor', generateColor())
      }

    }

    if (moduleType == 'Objects') {

      if (moduleImageStore.locked == false) {
        let objectType = sample(moduleImageStore.collections)
        setImageStore('CurrentTabChange', objectType)

        if (objectType == 'Shoes') {
          setImageStore('Shoes')
        } else if (objectType == 'Tools') {
          setImageStore('Tools')
        }
      }
      
      if (moduleImageStore.multiplication) {
        window.resetImages()
      }
    }

    if (moduleType == 'Vinyl') {

      if (moduleVinylStore.locked == false ){
        let Vinyltype = sample(moduleVinylStore.vinylTypes)
        setVinylStore('CurrentTabChange', Vinyltype)
      }
      if (moduleVinylStore.sizeLock == false) {
        setVinylStore('size', getRandomArbitrary(20, 100))
      }
      if (moduleVinylStore.opacityLock == false ){
        setVinylStore('opacity', getRandomArbitrary(50, 255))
      }
      if (moduleVinylStore.tintColorLock == false ){
        let newColor = generateColor()
        moduleVinylStore.tintColor = newColor
      }

      if (moduleVinylStore.currentVinylType == 'Whole') {
        let newImage = sample(Object.keys(moduleVinylStore.preset.Whole.images))
        moduleVinylStore.preset.Whole.current = newImage
      }
      if (moduleVinylStore.currentVinylType == 'Label') {
        let newImage = sample(Object.keys(moduleVinylStore.preset.Label.images))
        moduleVinylStore.preset.Label.current = newImage
      }
      if (moduleVinylStore.currentVinylType == 'Vinyl') {
        let newImage = sample(Object.keys(moduleVinylStore.preset.Vinyl.images))
        moduleVinylStore.preset.Vinyl.current = newImage
      }
    }

    if (moduleType == 'BasicTypo') {
      return new Promise((resolve, reject) => {
        setBasicTypoStore('Positions')

        if (moduleBasicTypoStore.mainText.typeLocked == false) {
          let newMainType = sample(moduleBasicTypoStore.mainText.fontOptions)
          moduleBasicTypoStore.mainText.currentFont = newMainType
          resolve([newMainType])
        }
        if (moduleBasicTypoStore.otherText.typeLocked == false) {
          let newOtherType = sample(moduleBasicTypoStore.otherText.fontOptions)
          moduleBasicTypoStore.otherText.currentFont = newOtherType
          resolve([newOtherType])
        }

        if (moduleBasicTypoStore.mainText.currentFont == 'Script') {
          moduleBasicTypoStore.fontMainText = setfont(moduleBasicTypoStore.mainText.currentFont)
        }
        if (moduleBasicTypoStore.mainText.currentFont == 'Sans Serif') {
          moduleBasicTypoStore.fontMainText = setfont(moduleBasicTypoStore.mainText.currentFont)
        }
  
        if (moduleBasicTypoStore.otherText.currentFont == 'Script') {
          moduleBasicTypoStore.fontOtherText = setfont(moduleBasicTypoStore.otherText.currentFont)
        }
        if (moduleBasicTypoStore.otherText.currentFont == 'Sans Serif') {
          moduleBasicTypoStore.fontOtherText = setfont(moduleBasicTypoStore.otherText.currentFont)
        }
  
        if (moduleBasicTypoStore.mainText.colorLocked == false) {
          moduleBasicTypoStore.mainText.color = generateColor()
        }
        if (moduleBasicTypoStore.otherText.colorLocked == false) {
          moduleBasicTypoStore.otherText.color = generateColor()
        }
        
        if (moduleBasicTypoStore.mainText.sizeLocked == false) {
          let newMainSize = getRandomArbitrary(moduleBasicTypoStore.mainText.size.min, moduleBasicTypoStore.mainText.size.max)
          moduleBasicTypoStore.mainText.size.sliderValue = newMainSize
          resolve([newMainSize])
        }
        if (moduleBasicTypoStore.otherText.sizeLocked == false) {
          let newOtherSize = getRandomArbitrary(moduleBasicTypoStore.otherText.size.min, moduleBasicTypoStore.otherText.size.max)
          moduleBasicTypoStore.otherText.size.sliderValue = newOtherSize
          resolve([newOtherSize])
        }
  
        if (moduleBasicTypoStore.mainText.leadingLocked == false) {
          let newMainLeading = getRandomArbitrary(moduleBasicTypoStore.mainText.leading.min, moduleBasicTypoStore.mainText.leading.max)
          moduleBasicTypoStore.mainText.leading.sliderValue = newMainLeading
          resolve([newMainLeading])
        }
        if (moduleBasicTypoStore.otherText.leadingLocked == false) {
          let newOtherLeading = getRandomArbitrary(moduleBasicTypoStore.otherText.leading.min, moduleBasicTypoStore.otherText.leading.max)
          moduleBasicTypoStore.otherText.leading.sliderValue = newOtherLeading
          resolve([newOtherLeading])
        }
      })
        
        
      //}

      //setBasicTypoStore('SolidColor', getRandomArbitrary(30, 255))
    }

    ////////
    if (moduleType == 'Lines') {
      
      if (moduleLinesStore.lineTypeLocked == false) {
        moduleLinesStore.currentLineType = sample(moduleLinesStore.linesTypes)
        if (moduleLinesStore.currentLineType == 'Straight') {
          moduleLinesStore.maxQuantity = moduleLinesStore.preset.Straight.max
        }
        if (moduleLinesStore.currentLineType == 'Curves') {
          moduleLinesStore.maxQuantity = moduleLinesStore.preset.Curves.max
        }
        if (moduleLinesStore.currentLineType == 'Arcs') {
          moduleLinesStore.maxQuantity = moduleLinesStore.preset.Arcs.max
        }
        if (moduleLinesStore.currentLineType == 'Bouncing') {
          moduleLinesStore.maxQuantity = moduleLinesStore.preset.Bouncing.max
        }
      }

      if ( moduleLinesStore.colorLocked == false ) {
        setLinesStore('SolidColor', generateColor())
      }
      if ( moduleLinesStore.strokeWeightLocked == false ) {
        setLinesStore('strokeWeight', getRandomArbitrary(moduleLinesStore.min, moduleLinesStore.max))
      }

      //console.log('maxQuantity', moduleLinesStore.maxQuantity);
      if (moduleLinesStore.quantityLocked == false) {

        let newSliderValue = getRandomArbitrary(1, moduleLinesStore.maxQuantity)
        //moduleLinesStore.sliderValueQuantity = newSliderValue
        setLinesStore('linesQuantity', newSliderValue)
      } else {
        if (moduleLinesStore.sliderValueQuantity > moduleLinesStore.maxQuantity) {
          setLinesStore('linesQuantity', moduleLinesStore.maxQuantity)
        } else {
          setLinesStore('linesQuantity', moduleLinesStore.sliderValueQuantity)
        }
      }
    }
    ////////

    if (moduleType == 'Module3D') {

      let type3D = sample(module3DStore.types)
      set3DStore('CurrentTabChange', type3D)
      
      set3DStore('randomize')

    }

    if (moduleType == 'Overlay') {

      let overlayType = sample(moduleOverlayStore.collections)
      setOverlayStore('CurrentTabChange', overlayType)

      setOverlayStore('Plastic')
      setOverlayStore('Stickers')

      setOverlayStore('opacity', getRandomArbitrary(10, 255))

    }
  })
}

////////////////////////////////////////////////////// FONTS

// function initFontsStore() {
//   const allFonts = importAll(
//     require.context('../fonts', false, /\.(ttf|otf|woff|woff2)$/)
//   )

//   // allFonts = {}
//   // let fontName
  
  
//   // Object.keys(fontsFolder).forEach((key) => {
//   //   fontName = key.replace(/^\.\//, '').replace(/\.(ttf|otf|woff|woff2)$/, '')

//   //   allFonts = Object.assign({}, allFonts, {
//   //     fontName: fontsFolder[key]
//   //   })
//   // })
  

//   console.log('STORE', allFonts);
//   return {
//     allFonts: allFonts
//   }
// }

// function initFontsStore() {
//   const fonts = importAll(
//     require.context('../fonts', false, /\.(ttf|otf|woff|woff2)$/)
//   );

//   console.log('STORE FONTS', fonts);
//   return {
//     fonts: fonts
//   };
// }

function initFontsStore() {
  const fontContext = require.context('../fonts', false, /\.(ttf|otf|woff|woff2)$/);
  const fonts = {};

  fontContext.keys().forEach((key) => {
    const fileName = key.replace(/^.*[\\/]/, ''); // Extracting filename from path
    fonts[fileName] = fontContext(key);
  });


  return {
    fonts: fonts
  };
}


function getFontsStore() {
  return allFonts
}

//////////////////////////////////////////////////////////////////////////////////////////////////////// EXPORT

export {
  initStore,
  getModuleList,
  getShapesStore,
  setShapesStore,
  getParticlesStore,
  setParticlesStore,
  initUploadImageStore,
  getUploadImageStore,
  setUploadImageStore,
  randomizeImagePosition,
  getImageStore,
  setImageStore,
  getBackgroundStore,
  setBackgroundStore,
  getBackgroundImageStore,
  setBackgroundImageStore,
  getVinylStore,
  setVinylStore,
  getLinesStore,
  setLinesStore,
  init3DStore,
  get3DStore,
  set3DStore,
  getFontsStore,
  // setCanvasSizeStore,
  // generatePosition,
  getBlendStore,
  getBasicTypoStore,
  setBasicTypoStore,
  getBasicTypoV2Store,
  setBasicTypoV2Store,
  getOverlayStore,
  setOverlayStore,
  generateAllStore,
  randomizeModuleStore
}