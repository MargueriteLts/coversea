import { sample, getRandomArbitrary, importAll } from './utilities'

import * as generator1 from '../generators/generator1.js'
import * as generator2 from '../generators/generator2.js'
import * as generator3 from '../generators/generator3.js'
import * as generator4 from '../generators/generator4.js'
import * as generator5 from '../generators/generator5.js'
import * as generator6 from '../generators/generator6.js'

const generators = {
  generator1,
  generator2,
  generator3,
  generator4,
  generator5,
  generator6
}

let moduleList,
moduleShapesStore,
moduleParticlesStore,
moduleImageStore,
moduleBackgroundStore,
moduleBackgroundImageStore,
moduleVinylStore,
blendStore

function initStore(generatorName) {
  moduleList = generators[generatorName].modules

  blendStore = generators[generatorName].blend

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
      moduleImageStore = initImages()
    }

    if (moduleName == 'BackgroundImage') {
      moduleBackgroundImageStore = initBackgroundImageStore(generators[generatorName].preset['BackgroundImage'])
    }

    if (moduleName == 'Vinyl') {
      moduleVinylStore = initVinylStore(generators[generatorName].preset['Vinyl'])
    }
  })
}

function getModuleList() {
  return moduleList
}

/////// BLEND

function getBlendStore() {
  return blendStore
}

////////////////////////////////////////// BACKGROUND

function initBackgroundStore(preset) {
  preset = Object.assign({}, preset, { moduleName: 'Background' })

  preset.bgTypes.forEach((bgType) => {
    if (bgType == 'SolidColor') {
      preset.preset.SolidColor = Object.assign({}, preset.preset.SolidColor, { text: 'Solid color', color: '#000000' })
    }

    if (bgType == 'Gradient') {
      preset.preset.Gradient = Object.assign({}, preset.preset.Gradient, { text: 'Gradient', color1: '#ff0000', color2:'#00ff00', angle:'vertical' })
    }
  })

  return preset
}

function getBackgroundStore() {
  return moduleBackgroundStore
}

function setBackgroundStore(type, value) {
  if (type === 'CurrentTabChange') {
    moduleBackgroundStore.currentBgType = value
  }

  if (type === 'SolidColor') {
    moduleBackgroundStore.preset.SolidColor.color = generateColor()
  }

  if (type === 'Gradient') {
    moduleBackgroundStore.preset.Gradient.color1 = generateColor()
    moduleBackgroundStore.preset.Gradient.color2 = generateColor()
  }
  if (type === 'AngleGradient') {
    moduleBackgroundStore.preset.Gradient.angle = changeGradientAngle()
  }
}

/////////////////// GRADIENT

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

////////////////////////////////////////////////////// GENERATE FUNCTIONS

function generateColor() {
  const color = []

  color.push(parseInt(getRandomArbitrary(0, 255)))
  color.push(parseInt(getRandomArbitrary(0, 255)))
  color.push(parseInt(getRandomArbitrary(0, 255)))

  return color
}

////////////////////////////////////////////////////// COLORPICKER

function setColorPickerStore(object, nextColorValue) {
  if (object === 'shapes') {
    moduleShapesStore.settings.color = nextColorValue
  }
  if (object === 'background') {
    moduleBackgroundStore.preset.SolidColor.color = nextColorValue
  }
  if (object === 'gradient1') {
    moduleBackgroundStore.preset.Gradient.color1 = nextColorValue
  }
  if (object === 'gradient2') {
    moduleBackgroundStore.preset.Gradient.color2 = nextColorValue
  }
}

function getColorPickerStore(object) {
  if (object === 'shapes') {
    return moduleShapesStore.settings.color
  }
  if (object === 'background') {
    return moduleBackgroundStore.preset.SolidColor.color
  }
  if (object === 'gradient1') {
    return moduleBackgroundStore.preset.Gradient.color1
  }
  if (object === 'gradient2') {
    return moduleBackgroundStore.preset.Gradient.color2
  }
}

////////////////////////////////////////////////////// SHAPES

function initShapesStore(shapes) {
  shapes = Object.assign({}, shapes, { moduleName: 'Shapes' })
  shapes.settings = Object.assign({}, shapes.settings, { color: '#999999' })
  return shapes
}

function getShapesStore() {
  return moduleShapesStore
}

function setShapesStore(nextSliderValue) {
  moduleShapesStore.settings.sliderValue = nextSliderValue
}

////////////////////////////////////////////////////// PARTICLES

function initParticles(preset) {
  return {
    sliderValue: preset.sliderValue,
    particles: generateParticles(preset.sliderValue)
  }
}

function generateParticles(quantity) {
  const particles = []

  for (let index = 0; index < quantity; index++) {
    particles.push([
      getRandomArbitrary(0, 600),
      getRandomArbitrary(0, 600),
      getRandomArbitrary(1, 30)
    ])
  }

  return particles
}

function getParticlesStore() {
  return moduleParticlesStore
}

function setParticlesStore(nextSliderValue) {
  moduleParticlesStore = {
    sliderValue: nextSliderValue,
    particles: generateParticles(nextSliderValue)
  }
}

///////////////////// IMAGES

function initImages() {
  const images = importAll(
    require.context('../images', false, /\.(png|jpe?g|svg)$/)
  )

  return {
    images: images,
    current: sample(Object.keys(images))
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
}

////////////////////// VINYL

function initVinylStore(preset) {
  const collection1 = importAll(
    require.context('../images/vinylPics/whole', false, /\.(png|jpe?g|svg)$/)
  )
  const collection2 = importAll(
    require.context('../images/vinylPics/label', false, /\.(png|jpe?g|svg)$/)
  )

  preset = Object.assign({}, preset, { moduleName: 'Vinyl Disc Picture' })

  preset.vinylTypes.forEach((type) => {
    if (type === 'Whole') {
      preset.preset.Whole = Object.assign({}, preset.preset.Whole, { text: 'Whole disc', images: collection1, current: sample(Object.keys(collection1)) })
    }

    if (type === 'Label') {
      preset.preset.Label = Object.assign({}, preset.preset.Label, { text: 'Disc Label', images: collection2, current: sample(Object.keys(collection2)) })
    }
  })

  return preset
}

function getVinylStore() {
  return moduleVinylStore
}

function setVinylStore(type, value) {
  if (type === 'CurrentTabChange') {
    moduleVinylStore.currentVinylType = value
  }
}

///////////////////////////////////////////////////////////////////// EXPORT

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
  setColorPickerStore,
  getColorPickerStore,
  getBackgroundImageStore,
  setBackgroundImageStore,
  getVinylStore,
  setVinylStore,
  getBlendStore
}