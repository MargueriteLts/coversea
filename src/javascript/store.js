import { sample, getRandomArbitrary, importAll } from './utilities'

import * as generator1 from '../generators/generator1.js'
import * as generator2 from '../generators/generator2.js'
import * as generator3 from '../generators/generator3.js'

const generators = {
  generator1,
  generator2,
  generator3
}

let moduleList,
modulePlainColorBackgroundStore,
moduleShapesStore,
moduleParticlesStore,
moduleImageStore

function initStore(generatorName) {
  moduleList = generators[generatorName].modules

  moduleList.forEach(moduleName => {
    if (moduleName == 'PlainColorBackground') {
      modulePlainColorBackgroundStore = initBackground(generators[generatorName].preset['PlainColorBackground'])
    }

    if (moduleName == 'Shapes') {
      moduleShapesStore = generators[generatorName].preset['Shapes']
    }

    if (moduleName == 'Particles') {
      moduleParticlesStore = initParticles(generators[generatorName].preset['Particles'])
    }

    if (moduleName == 'Image') {
      moduleImageStore = initImages()
    }
  })
}

function getModuleList() {
  return moduleList
}

///////////////////// BACKGROUND

function initBackground(preset) {
  return {
    sliderValue: preset.sliderValue,
    color: generateParticles(preset.sliderValue)
  }
}

function generateColor(nextValue) {
  const color = []

  for (let index = 0; index < nextValue; index++) {
    color.push([
      getRandomArbitrary(0, 255),
      getRandomArbitrary(0, 255),
      getRandomArbitrary(0, 255)
    ])
  }

  return color
}

function getPlainColorBackgroundStore() {
  return modulePlainColorBackgroundStore
}

function setPlainColorBackgroundStore(nextSliderValue) {
  modulePlainColorBackgroundStore.sliderValue = {
    sliderValue: nextSliderValue,
    color: generateColor(nextSliderValue)
  }
}

///////////////////// SHAPES

function getShapesStore() {
  return moduleShapesStore
}

function setShapesStore(nextSliderValue) {
  moduleShapesStore.sliderValue = nextSliderValue
}

///////////////////// PARTICLES

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

////////////////////////////////////OLDSTORE////////////////////////////////////

///////////////////////////////////////////////////////////////////// BACKGROUND

// function getBackgroundValue() {
//   return backgroundValue
// }

// function setBackgroundValue(nextValue) {
//   const color = []

//   for (let index = 0; index < nextValue; index++) {
//     color.push([
//       getRandomArbitrary(0, 255),
//       getRandomArbitrary(0, 255),
//       getRandomArbitrary(0, 255)
//     ])
//   }

//   backgroundValue.color = color
//   backgroundValue.sliderValue = nextValue
// }

///////////////////////////////////////////////////////////////////// SHAPES

// function getShapesValue() {
//   return shapesValue
// }

// function setShapesValue(nextValue) {
//   shapesValue = nextValue
//   // shapesValue.sliderValue = nextValue
// }

///////////////////////////////////////////////////////////////////// PARTICLES

// function getParticlesValue() {
//   return particlesValue
// }

// function setParticlesValue(nextValue) {
//   const particles = []

//   for (let index = 0; index < nextValue; index++) {
//     particles.push([
//       getRandomArbitrary(0, 600),
//       getRandomArbitrary(0, 600),
//       getRandomArbitrary(1, 30)
//     ])
//   }

//   particlesValue.sliderValue = nextValue
//   particlesValue.particles = particles
// }

///////////////////////////////////////////////////////////////////// IMAGE

// function getImageValue() {
//   return imageValue
// }

// function setImageValue() {
//   imageValue.current = sample(Object.keys(images))
// }

///////////////////////////////////////////////////////////////////// CONFIG

// function getConfig() {
//   return config
// }

// function setConfig(nextConfig) {
//   config = nextConfig
// }

///////////////////////////////////////////////////////////////////// EXPORT

export {
  initStore,
  getModuleList,
  getPlainColorBackgroundStore,
  setPlainColorBackgroundStore,
  getShapesStore,
  setShapesStore,
  getParticlesStore,
  setParticlesStore,
  getImageStore,
  setImageStore
}