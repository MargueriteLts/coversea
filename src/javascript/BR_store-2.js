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
moduleBackgroundStore,
currentBgTypeStore,
bgTypeList,
plainColorBackgroundStore

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
      plainColorBackgroundStore = initPlainColorBackground(generators[generatorName].preset['Background'].preset['PlainColor'])
      // availableBgTypeList = generators[generatorName].preset['Background'].bgTypes
      // availableBgTypeList = moduleBackgroundStore.bgTypes

      // backgroundTypeList = generators[generatorName].backgroundTypes
      // backgroundTypeStore = generators[generatorName].backgroundTypePreset

      // backgroundTypeList.forEach(bgTypeName => {
      //   if (bgTypeName == 'PlainColor') {
      //     backgroundTypePlainColorStore = generators[generatorName].backgroundTypePreset['PlainColor']
      //   }
      //   if (bgTypeName == 'Gradient') {
      //     backgroundTypeGradientStore = generators[generatorName].backgroundTypePreset['Gradient']
      //   }
      // });
    }
  })
}

function getModuleList() {
  return moduleList
}

////////////////////////////////////////// BACKGROUND

function getBackgroundStore() {
  return moduleBackgroundStore
}

//// CURRENT

function getCurrentBgTypeStore() {
  return currentBgTypeStore
}

function setCurrentBgTypeStore(type) {
  moduleBackgroundStore.currentBgTypeStore = type
}

function getBgTypeList() {
  return bgTypeList
}

/////

// let currentTitle

// function setCurrentTitleStore() {
//   if (currentBgTypeStore == 'PainColor') {
//     return {
//     sliderValue: preset.sliderValue,
//     particles: generateParticles(preset.sliderValue)
//   }


//     bgName: 'Plain color'
//     console.log(currentTitle)
//   } else if (currentBgTypeStore == 'Gradient') {
//     currentTitle = 'Gradient'
//   }
// }

// function getCurrentTitleStore() {
//   return currentTitle
// }

//////////////////// PLAIN COLOR BACKGROUND

function initPlainColorBackground(preset) {
  return {
    bgName: 'Plain Color',
    color: generateColor(preset.color)
  }
}

function generateColor() {
  const color = []

  color.push(parseInt(getRandomArbitrary(0, 255)))
  color.push(parseInt(getRandomArbitrary(0, 255)))
  color.push(parseInt(getRandomArbitrary(0, 255)))

  return color
}

function getTitleCurrentBgStore(type) {
  if (type == 'PlainColor') {
    return plainColorBackgroundStore.bgName
  }
}

function setTitleCurrentBgStore() {
  const titleCurrentBg = ''

  if (currentBgTypeStore == 'PlainColor') {
    titleCurrentBg = plainColorBackgroundStore.bgName
  } else if (currentBgTypeStore == 'Graident') {
    titleCurrentBg = 'Gradient'
  }

  return titleCurrentBg
}

// function setTitleCurrentBackgroundStore() {
//   let title = ''
//   if (currentBgTypeStore == 'PlainColor') {
//     plainColorBackgroundStore.bgName = title
//   }
//   return title
// }

function getplainColorBackgroundStore() {
  return plainColorBackgroundStore
}

function setColorBackgroundStore() {
  plainColorBackgroundStore = {
    color: generateColor()
  }
}

// let backgroundTypePlainColorStore

// function initBackgroundType(generatorName) {
//   availableBgTypeList = generators[generatorName].preset['Background'].bgTypes

//   backgroundTypeList.forEach(bgTypeName => {
//   if (bgTypeName == 'PlainColor') {
//       backgroundTypePlainColorStore = generators[generatorName].preset['Background'].preset['PlainColor']
//     }
//     // if (bgTypeName == 'Gradient') {
//     //   backgroundTypeGradientStore = generators[generatorName].backgroundTypePreset['Gradient']
//     // }
//   });  
// }

// function getPlainColorBackgroundStore() {
//   return backgroundTypePlainColorStore
// }

// function setPlainColorBackgroundStore() {
//   const color = []

//   color.push(parseInt(getRandomArbitrary(0, 255)))
//   color.push(parseInt(getRandomArbitrary(0, 255)))
//   color.push(parseInt(getRandomArbitrary(0, 255)))

//   backgroundTypePlainColorStore.color = color
// }


// function getBackgroundTypeList() {
//   return backgroundTypeList
// }

// function getBackgroundTypeStore() {
//   return backgroundTypeStore
// }

// function getPlainColorStore() {
//   return backgroundTypePlainColorStore
// }

// function getGradientStore() {
//   return backgroundTypeGradientStore
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
  getBackgroundStore,
  setCurrentBgTypeStore,
  getCurrentBgTypeStore,
  getBgTypeList,
  setColorBackgroundStore,
  setTitleCurrentBgStore,
  getTitleCurrentBgStore,
  getplainColorBackgroundStore
  // getColorBackgroundStore,
  // setTitleCurrentBackgroundStore
  // setCurrentTitleStore,
  // getCurrentTitleStore
}