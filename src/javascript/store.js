import { sample, getRandomArbitrary, importAll } from './utilities'

import * as generator1 from '../generators/generator1.js'
import * as generator2 from '../generators/generator2.js'
import * as generator3 from '../generators/generator3.js'
import * as generator4 from '../generators/generator4.js'

const generators = {
  generator1,
  generator2,
  generator3,
  generator4
}

let moduleList,
moduleShapesStore,
moduleParticlesStore,
moduleImageStore,
moduleBackgroundStore

function initStore(generatorName) {
  moduleList = generators[generatorName].modules

  moduleList.forEach(moduleName => {
    // if (moduleName == 'PlainColorBackground') {
    //   modulePlainColorBackgroundStore = initBackground(generators[generatorName].preset['PlainColorBackground'].sliderValue)
    // }

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
      moduleBackgroundStore = generators[generatorName].preset['Background']
    }
  })
}

function getModuleList() {
  return moduleList
}

///////////////////// BACKGROUND

function getBackgroundStore() {
  return moduleBackgroundStore
}

// function setBackgroundStore() {
//   moduleBackgroundStore.moduleName 
// }

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
  getBackgroundStore
}