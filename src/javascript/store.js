import { sample, getRandomArbitrary, importAll } from './utilities'

import * as generator1 from '../generators/generator1.js'
import * as generator2 from '../generators/generator2.js'
import * as generator3 from '../generators/generator3.js'
import * as generator4 from '../generators/generator4.js'
import * as generator5 from '../generators/generator5.js'
import * as generator6 from '../generators/generator6.js'
import * as generator1p2 from '../generators/generator1p2.js'
import * as generator2p2 from '../generators/generator2p2.js'
import * as generator4p2 from '../generators/generator4p2.js'
import * as generator5p2 from '../generators/generator5p2.js'
import * as generator6p2 from '../generators/generator6p2.js'

const generators = {
  generator1,
  generator2,
  generator3,
  generator4,
  generator5,
  generator6,
  generator1p2,
  generator2p2,
  generator4p2,
  generator5p2,
  generator6p2
}

let moduleList,
moduleShapesStore,
moduleParticlesStore,
moduleImageStore,
moduleBackgroundStore,
moduleBackgroundImageStore,
moduleVinylStore,
moduleText1Store,
moduleLinesStore,
module3DStore,
blendStore,
moduleBasicTypoStore,
moduleOverlayStore,
allFonts
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

    if (moduleName == 'Image') {
      moduleImageStore = initImages(generators[generatorName].preset['Image'])
    }

    if (moduleName == 'BackgroundImage') {
      moduleBackgroundImageStore = initBackgroundImageStore(generators[generatorName].preset['BackgroundImage'])
    }

    if (moduleName == 'Vinyl') {
      moduleVinylStore = initVinylStore(generators[generatorName].preset['Vinyl'])
    }

    if (moduleName == 'Text1') {
      moduleText1Store = initText1Store(generators[generatorName].preset['Text1'])
    }

    if (moduleName == 'BasicTypo') {
      moduleBasicTypoStore = initBasicTypoStore(generators[generatorName].preset['BasicTypo'])
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

// function setCanvasSizeStore(size) {
//   canvasSize = size
// }

// function getCanvasSize() {
//   return canvasSize
// }

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

function generatePositions() {
  // const canvasSize = 100;

  // let positions = [
  //   { x: 5, y: 5 }, // top-left
  //   { x: canvasSize / 2, y: 5 }, // top-center
  //   { x: canvasSize - 10, y: 5 }, // top-right
  //   { x: 5, y: canvasSize - 5 }, // bottom-left
  //   { x: canvasSize / 2, y: canvasSize - 5 }, // bottom-center
  //   { x: canvasSize - 5, y: canvasSize - 5 } // bottom-right
  // ];

  let positions = [
    { x: 5, y: 5 }, // top-left
    { x: 30, y: 5 }, // top-center
    { x: 60, y: 5 }, // top-right
    { x: 5, y: 95 }, // bottom-left
    { x: 30, y: 95 }, // bottom-center
    { x: 60, y: 95 } // bottom-right
  ];

  // Generate two distinct random indices
  let randomIndex1 = Math.floor(Math.random() * positions.length);
  let randomIndex2;
  do {
    randomIndex2 = Math.floor(Math.random() * positions.length);
  } while (randomIndex2 === randomIndex1);

  const txtPosition1 = positions[randomIndex1];
  const txtPosition2 = positions[randomIndex2];

  return [txtPosition1, txtPosition2];
}

// function generateNoise() {

// }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////// BACKGROUND

function initBackgroundStore(preset) {
  preset = Object.assign({}, preset, { moduleName: 'Background' })

  const value = []

  value.push(parseInt(getRandomArbitrary(0, 255)))
  value.push(parseInt(getRandomArbitrary(0, 255)))
  value.push(parseInt(getRandomArbitrary(0, 255)))
  value.push(parseInt(getRandomArbitrary(0, 255)))

  preset.bgTypes.forEach((bgType) => {
    if (bgType == 'SolidColor') {
      preset.preset.SolidColor = Object.assign({}, preset.preset.SolidColor, { text: 'Solid color' })
    }

    if (bgType == 'Gradient') {
      preset.preset.Gradient = Object.assign({}, preset.preset.Gradient, { text: 'Gradient', angle:'vertical' })
    }

    if (bgType == 'Noise') {
      preset.preset.Noise = Object.assign({}, preset.preset.Noise, { text: 'Noise', value: value })
      console.log(value);
    }
  })

  return preset
}

function getBackgroundStore() {
  return moduleBackgroundStore
}

function setBackgroundStore(type, value) {
  let color1, color2

  return new Promise((resolve, reject) => {
    if (type === 'CurrentTabChange') {
      moduleBackgroundStore.currentBgType = value
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
      moduleBackgroundStore.preset.Gradient.angle = changeGradientAngle()
    }

    if (type === 'Noise') {
      const value = []

      value.push(parseInt(getRandomArbitrary(0, 255)))
      value.push(parseInt(getRandomArbitrary(0, 255)))
      value.push(parseInt(getRandomArbitrary(0, 255)))
      value.push(parseInt(getRandomArbitrary(0, 255)))

      moduleBackgroundStore.preset.Noise.value = value
      // console.log(value);
      // resolve([value])
    }

  })
}

//// GRADIENT

function changeGradientAngle() {
  let angle = ''

  if (moduleBackgroundStore.preset.Gradient.angle === 'vertical') {
    angle = 'horizontal'
  }
  if (moduleBackgroundStore.preset.Gradient.angle === 'horizontal') {
    angle = 'vertical'
  }
  
  return angle
}


////////////////////// SHAPES

function initShapesStore(shapes) {
  shapes = Object.assign({}, shapes, { moduleName: 'Shapes' })
  shapes.settings = Object.assign({}, shapes.settings, { color: '#999999' })
  return shapes
}

function getShapesStore() {
  return moduleShapesStore
}

function setShapesStore(type, value) {
  return new Promise((resolve, reject) => {
    if (type === 'SolidColor') {
      moduleShapesStore.settings.color = value
      resolve([value])
    }
    if (type === 'Size') {
      moduleShapesStore.settings.sliderValue = value
    }
  })
}

////////////////////// PARTICLES

function initParticles(preset) {
  preset = Object.assign({}, preset, { moduleName: 'Particles', particles: generateParticles(preset.sliderValue), color: '#000' })

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
    }
    if (type === 'SolidColor') {
      moduleParticlesStore.color = value
      resolve([value])
    }
  })
}

////////////////////// IMAGES

function initImages(preset) {
  const images = importAll(
    require.context('../images', false, /\.(png|jpe?g|svg)$/)
  )

  // console.log('STORE IMG', images);
  return {
    images: images,
    current: sample(Object.keys(images)),
    pixelate: preset.pixelate
  }
}

function getImageStore() {
  return moduleImageStore
}

function setImageStore() {
  moduleImageStore.current = sample(Object.keys(moduleImageStore.images))
}

////////////////////// BACKGROUND IMAGE

function initBackgroundImageStore(preset) {
  const collection1 = importAll(
    require.context('../images/collection1NightClub', false, /\.(png|jpe?g|svg)$/)
  )
  const collection2 = importAll(
    require.context('../images/collection2Cars', false, /\.(png|jpe?g|svg)$/)
  )

  preset = Object.assign({}, preset, { moduleName: 'Background Image' })

  preset.collections.forEach((collection) => {
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
  if (type === 'CurrentTabChange') {
    moduleBackgroundImageStore.currentCollection = value
  }

  if (type === 'NightClub') {
    moduleBackgroundImageStore.preset.NightClub.current = sample(Object.keys(moduleBackgroundImageStore.preset.NightClub.images))
  }
  if (type === 'Cars') {
    moduleBackgroundImageStore.preset.Cars.current = sample(Object.keys(moduleBackgroundImageStore.preset.Cars.images))
  }
  if (type === 'opacity') {
    moduleBackgroundImageStore.sliderValue = value
  }
}

////////////////////// OVERLAY

function initOverlayStore(preset) {
  const collection1 = importAll(
    require.context('../images/overlays/collection1Plastic', false, /\.(png|jpe?g|svg)$/)
  )
  const collection2 = importAll(
    require.context('../images/overlays/collection2Stickers', false, /\.(png|jpe?g|svg)$/)
  )

  preset = Object.assign({}, preset, { moduleName: 'Overlay' })

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
  if (type === 'CurrentTabChange') {
    moduleOverlayStore.currentCollection = value
  }

  if (type === 'Plastic') {
    moduleOverlayStore.preset.Plastic.current = sample(Object.keys(moduleOverlayStore.preset.Plastic.images))
  }
  if (type === 'Stickers') {
    moduleOverlayStore.preset.Stickers.current = sample(Object.keys(moduleOverlayStore.preset.Stickers.images))
  }
  if (type === 'opacity') {
    moduleOverlayStore.opacityValue = value
  }
}

////////////////////// VINYL

function initVinylStore(preset) {
  const collection1 = importAll(
    require.context('../images/vinylPics/whole', false, /\.(png|jpe?g|svg)$/)
  )
  const collection2 = importAll(
    require.context('../images/vinylPics/label', false, /\.(png|jpe?g|svg)$/)
  )

  preset = Object.assign({}, preset, { moduleName: 'Vinyl Disc' })

  preset.vinylTypes.forEach((type) => {
    if (type === 'Whole') {
      preset.preset.Whole = Object.assign({}, preset.preset.Whole, {
        text: 'Whole disc',
        images: collection1,
        current: sample(Object.keys(collection1))
      })
    }

    if (type === 'Label') {
      preset.preset.Label = Object.assign({}, preset.preset.Label, {
        text: 'Disc Label',
        images: collection2,
        current: sample(Object.keys(collection2))
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
      moduleVinylStore.sliderValue = value
      // console.log('2///', value);
      resolve([value])
      // console.log('3///', value);
    }
    if (type === 'opacity') {
      moduleVinylStore.sliderOpacity = value
      resolve([value])
    }
  })
}

////////////////////// TEXT1

function initText1Store(preset) {

  let positions = generatePositions()

  // preset = Object.assign({}, preset, { moduleName: 'Text 1', color: '#fff', txtposition: position })
  preset = Object.assign({}, preset, { moduleName: 'Typography', txtpositions: positions })


  return preset
}

function getText1Store() {
  return moduleText1Store
}

function setText1Store(type, nextValue) {
  return new Promise((resolve, reject) => {
    if (type === 'text') {
      moduleText1Store.text = nextValue
    }
    if (type === 'SolidColor') {
      moduleText1Store.color = nextValue
      resolve([nextValue])
    }
  })
}

////////////////////// BASICTYPO

function initBasicTypoStore(preset) {

  let positions = generatePositions()

  // preset = Object.assign({}, preset, { moduleName: 'Text 1', color: '#fff', txtposition: position })
  preset = Object.assign({}, preset, { moduleName: 'Typography', txtpositions: positions })


  return preset
}

function getBasicTypoStore() {
  return moduleBasicTypoStore
}

function setBasicTypoStore(type, nextValue) {
  return new Promise((resolve, reject) => {
    if (type === 'mainText') {
      moduleBasicTypoStore.mainText = nextValue
    }
    if (type === 'textarea') {
      moduleBasicTypoStore.textarea = nextValue
    }
    if (type === 'SolidColor') {
      moduleBasicTypoStore.color = nextValue
      resolve([nextValue])
    }
    if (type === 'Positions') {
      let positions = generatePositions()
      moduleBasicTypoStore.txtpositions = positions
      resolve([nextValue])
    }
  })
}

////////////////////// LINES

function initLinesStore(preset) {
  preset = Object.assign({}, preset, { moduleName: 'Lines', color: '#fff', lines: generateLines(50) })
  return preset
}

function generateLines(quantity) {
  const lines = []

  for (let index = 0; index < quantity; index++) {
    lines.push([
      getRandomArbitrary(0, 100),
      getRandomArbitrary(0, 100),
      getRandomArbitrary(0, 100),
      getRandomArbitrary(0, 100)
    ])
  }

  return lines
}

function getLinesStore() {
  return moduleLinesStore
}

function setLinesStore(type, nextValue) {
  return new Promise((resolve, reject) => {
    if (type === 'SolidColor') {
      moduleLinesStore.color = nextValue
      resolve([nextValue])
    }
    if (type === 'randomize') {
      moduleLinesStore.lines = generateLines(50)
    }
    if (type === 'strokeWeight') {
      moduleLinesStore.strokeWeight = nextValue
    }
  })
}

////////////////////// 3D

function init3DStore(preset) {
  preset = Object.assign({}, preset, { moduleName: '3D Shape', x: generateRandomNb(), y: generateRandomNb() })

  preset.options.forEach((option) => {
    if (option == 'Torus') {
      preset.preset.Torus = Object.assign({}, preset.preset.Torus, { text: 'Torus' })
    }

    if (option == 'Square') {
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
  if (type === 'CurrentTabChange') {
    module3DStore.current3DType = value
  } 
  if (type === 'randomize') {
    module3DStore.x = generateRandomNb()
    module3DStore.y = generateRandomNb()
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////// GENERATE ALL

function generateAllStore(generatorName) {
  moduleList = generators[generatorName].modules

  blendStore = generators[generatorName].preset.blend

  allFonts = initFontsStore()

  moduleList.forEach(moduleName => {
    if (moduleName == 'Background') {
      // let BgType = sample(moduleBackgroundStore.bgTypes)
      // setBackgroundStore('CurrentTabChange', BgType)

      setBackgroundStore('SolidColor', generateColor())

      setBackgroundStore('Gradient')
      setBackgroundStore('GradientColor1', generateColor())
      setBackgroundStore('GradientColor2', generateColor())
      setBackgroundStore('AngleGradient')

      setBackgroundStore('Noise')

    }

    if (moduleName == 'Shapes') {
      setShapesStore('SolidColor', generateColor())
      setShapesStore('Size', getRandomArbitrary(0, 100))
    }

    if (moduleName == 'Particles') {
      let ParticlesTypes = sample(moduleParticlesStore.options)
      setParticlesStore('CurrentTabChange', ParticlesTypes)
      setParticlesStore('quantity', getRandomArbitrary(moduleParticlesStore.min, moduleParticlesStore.max))
      setParticlesStore('CurrentTabChange', ParticlesTypes)
      //solid color juste black cest cool aussi
      setParticlesStore('SolidColor', generateColor())
    }

    if (moduleName == 'Image') {
      setImageStore()
    }

    if (moduleName == 'BackgroundImage') {
      let BgImgType = sample(moduleBackgroundImageStore.collections)
      setBackgroundImageStore('CurrentTabChange', BgImgType)
      setBackgroundImageStore('NightClub')
      setBackgroundImageStore('Cars')
      setBackgroundImageStore('opacity', getRandomArbitrary(10, 255))

    }

    if (moduleName == 'Vinyl') {

      // return new Promise((resolve, reject) => {
        let Vinyltype = sample(moduleVinylStore.vinylTypes)
        setVinylStore('CurrentTabChange', Vinyltype)
        // resolve([type])
        let size = getRandomArbitrary(0, 100)
        setVinylStore('size', size)
        // resolve([size])
        let opacity = getRandomArbitrary(0, 255)
        setVinylStore('opacity', opacity)
        // resolve([opacity])
      // })
    }

    if (moduleName == 'Text1') {
    }

    if (moduleName == 'BasicTypo') {
      setBasicTypoStore('Positions')
      setBasicTypoStore('SolidColor', getRandomArbitrary(30, 255))
    }

    if (moduleName == 'Lines') {
      setLinesStore('SolidColor', generateColor())
      setLinesStore('randomize')
      setLinesStore('strokeWeight', getRandomArbitrary(0, 100))
    }

    if (moduleName == 'Module3D') {
      let type3D = sample(module3DStore.options)
      set3DStore('CurrentTabChange', type3D)
      set3DStore('randomize')
    }
  })
}

// function generateAllStore(generatorName) {
//   initStore(generatorName)
// }

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
  getImageStore,
  setImageStore,
  getBackgroundStore,
  setBackgroundStore,
  getBackgroundImageStore,
  setBackgroundImageStore,
  getVinylStore,
  setVinylStore,
  getText1Store,
  setText1Store,
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
  getOverlayStore,
  setOverlayStore,
  generateAllStore
}