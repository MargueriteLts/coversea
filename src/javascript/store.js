import { sample, getRandomArbitrary, importAll } from './utilities'

import * as generator1 from '../generators/generator1.js'
import * as generator2 from '../generators/generator2.js'
import * as generator3 from '../generators/generator3.js'
import * as generator4 from '../generators/generator4.js'
import * as generator5 from '../generators/generator5.js'

const generators = {
  generator1,
  generator2,
  generator3,
  generator4,
  generator5
}

let moduleList,
moduleShapesStore,
moduleParticlesStore,
moduleImageStore,
moduleBackgroundStore,
plainColorBackgroundStore

function initStore(generatorName) {
  moduleList = generators[generatorName].modules

  moduleList.forEach(moduleName => {
    if (moduleName == 'Shapes') {
      moduleShapesStore = initShapesStore(generators[generatorName].preset['Shapes'])
    }

    if (moduleName == 'Particles') {
      moduleParticlesStore = initParticles(generators[generatorName].preset['Particles'])
    }

    if (moduleName == 'Image') {
      moduleImageStore = initImages()
    }

    if (moduleName == 'Background') {
      moduleBackgroundStore = initBackgroundStore(generators[generatorName].preset['Background'])
    }
  })
}

function getModuleList() {
  return moduleList
}

////////////////////////////////////////// BACKGROUND

function initBackgroundStore(preset) {
  preset = Object.assign({}, preset, { moduleName: 'Background' })

  preset.bgTypes.forEach((bgType) => {
    if (bgType == 'PlainColor') {
      preset.preset.PlainColor = Object.assign({}, preset.preset.PlainColor, { text: 'Random plain color', color: generateColor() })
    }

    if (bgType == 'ColorPicker') {
      preset.preset.ColorPicker = Object.assign({}, preset.preset.ColorPicker, { text: 'Pick color', color: '#000000' })
    }
  })

  return preset
}

function getBackgroundStore() {
  return moduleBackgroundStore
}

function setBackgroundStore(type, value) {
  if (type === 'PlainColor') {
    moduleBackgroundStore.preset.PlainColor.color = generateColor()
  }

  if (type === 'CurrentTabChange') {
    moduleBackgroundStore.currentBgType = value
  }
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
    moduleBackgroundStore.preset.ColorPicker.color = nextColorValue
  }
}

function getColorPickerStore(object) {
  if (object === 'shapes') {
    return moduleShapesStore.settings.color
  }
  if (object === 'background') {
    return moduleBackgroundStore.preset.ColorPicker.color
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
  getColorPickerStore
}