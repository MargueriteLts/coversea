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
currentBgTypeStore,
bgTypeList,
titleBgType,
plainColorBackgroundStore

function initStore(generatorName) {
  moduleList = generators[generatorName].modules

  moduleList.forEach(moduleName => {
    if (moduleName == 'Shapes') {
      moduleShapesStore = generators[generatorName].preset['Shapes']
    }

    if (moduleName == 'Particles') {
      moduleParticlesStore = initParticles(generators[generatorName].preset['Particles'])
    }

    if (moduleName == 'Image') {
      moduleImageStore = initImages()
    }

    if (moduleName == 'Background') {
      moduleBackgroundStore = initBackgroundStore(generators[generatorName].preset['Background'])
      // moduleBackgroundStore = generators[generatorName].preset['Background']
      // titleBgType = getBgTypeTitle(generators[generatorName].preset['Background'].bgTypes)
      // bgTypeList = generators[generatorName].preset['Background'].bgTypes

      // plainColorBackgroundStore = initPlainColorBackground(generators[generatorName].preset['Background'].preset['PlainColor'])
    }
  })
}

function getModuleList() {
  return moduleList
}

////////////////////////////////////////// BACKGROUND

function initBackgroundStore(preset) {
  preset.bgTypes.forEach((bgType) => {
    if (bgType == 'PlainColor') {
      preset.preset.PlainColor = Object.assign({}, preset.preset.PlainColor, { text: 'Some text', color: generateColor() })
    }

    if (bgType == 'ColorPicker') {
      preset.preset.ColorPicker = Object.assign({}, preset.preset.ColorPicker, { text: 'Some text 2222', color: '#000000' })
      // console.log(preset.preset.ColorPicker.color);
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

  if (type === 'ColorPicker') {
    moduleBackgroundStore.preset.ColorPicker.color = value
  }

  if (type === 'CurrentTabChange') {
    moduleBackgroundStore.currentBgType = value
  }
}

//// CURRENT

// function getCurrentBgTypeStore() {
//   return currentBgTypeStore
// }

// function setCurrentBgTypeStore(type) {
//   moduleBackgroundStore.currentBgTypeStore = type
// }

//////////////////// PLAIN COLOR BACKGROUND

function initPlainColorBackground(plainColorPreset) {
  return plainColorPreset = {
    bgName: 'Plain color',
    color: generateColor()
  }
}

function generateColor() {
  const color = []

  color.push(parseInt(getRandomArbitrary(0, 255)))
  color.push(parseInt(getRandomArbitrary(0, 255)))
  color.push(parseInt(getRandomArbitrary(0, 255)))

  return color
}

function getplainColorBackgroundStore() {
  return plainColorBackgroundStore
}

function setColorBackgroundStore() {
  plainColorBackgroundStore = {
    color: generateColor()
  }
}

function setColorValueStore(nexColorValue) {
  plainColorBackgroundStore.color = nexColorValue
}

function getColorValueStore() {
  return plainColorBackgroundStore.color
}

////////////////////////////////////////////////////// SHAPES

function getShapesStore() {
  return moduleShapesStore
}

function setShapesStore(nextSliderValue) {
  moduleShapesStore.sliderValue = nextSliderValue
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
  setColorBackgroundStore,
  getplainColorBackgroundStore,
  setColorValueStore,
  getColorValueStore
}