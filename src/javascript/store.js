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
blendStore,
moduleBackgroundStore,
moduleBackgroundImageStore,
moduleBasicTypoStore,
moduleImageStore,
module3DStore,
moduleLinesStore,
moduleParticlesStore,
moduleShapesStore,
moduleVinylStore,
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

  let positions = [
    { x: 5, y: 5 }, // top-left
    { x: 30, y: 5 }, // top-center
    { x: 60, y: 5 }, // top-right
    { x: 5, y: 95 }, // bottom-left
    { x: 30, y: 95 }, // bottom-center
    { x: 60, y: 95 } // bottom-right
  ];

  // Generate two distinct random indices
  // let randomIndex1 = Math.floor(Math.random() * positions.length);
  // let randomIndex2;
  // do {
  //   randomIndex2 = Math.floor(Math.random() * positions.length);
  // } while (randomIndex2 === randomIndex1);
  // const txtPosition1 = positions[randomIndex1];
  // const txtPosition2 = positions[randomIndex2];
  // return [txtPosition1, txtPosition2];

  return positions
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
  background = Object.assign({}, background, { moduleName: 'Background' })

  background.backgroundTypes.forEach((backgroundType) => {
    if (backgroundType == 'SolidColor') {
      background.preset.SolidColor = Object.assign({}, background.preset.SolidColor, { text: 'Solid color' })
    }

    if (backgroundType == 'Gradient') {
      background.preset.Gradient = Object.assign({}, background.preset.Gradient, { text: 'Gradient', angle:'vertical' })
    }

    if (backgroundType == 'Noise') {
      const images = importAll(
        require.context('../images/ui/tabBackgrounds/noise', false, /\.(png|jpe?g|svg)$/)
      )

      background.preset.Noise = Object.assign({}, background.preset.Noise, { text: 'Noise', tabBackgrounds: images})

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
      background.preset.Pixels = Object.assign({}, background.preset.Pixels, { text: 'Pixels' })
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
      resolve([moduleBackgroundStore.preset.Gradient.angle])
    }

    if (type === 'currentTabImageChange') {
      moduleBackgroundStore.preset.Noise.currentNoiseType = value
      window.resetNoise()
    }

  })
}

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
  })
}

// Graphics

////////////////////// IMAGES

function initImages(preset) {
  const images = importAll(
    require.context('../images/sketchGraphics/shoes', false, /\.(png|jpe?g|svg)$/)
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

////////////////////// MODULE 3D

function init3DStore(preset) {
  preset = Object.assign({}, preset, { moduleName: '3D Shape', x: generateRandomNb(), y: generateRandomNb() })

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
  })
}

////////////////////// PARTICLES

function initParticles(preset) {
  preset = Object.assign({}, preset, { moduleName: 'Particles', particles: generateParticles(preset.sliderValue), color: '#fff' })

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
  })
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

  const images = importAll(
    require.context('../images/ui/tabBackgrounds/vinyl')
  )

  preset = Object.assign({}, preset, { moduleName: 'Vinyl Disc', tabBackgrounds: images })

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

// Text

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
    if (type === 'CurrentTabChange') {
      moduleBasicTypoStore.font = nextValue
      resolve([nextValue])
    } 
    if (type === 'mainText') {
      moduleBasicTypoStore.mainText = nextValue
    }
    if (type === 'sizeMainText') {
      moduleBasicTypoStore.sizeMainText.sliderValue = nextValue
      resolve([nextValue])
    }
    if (type === 'StyleTabChange') {
      moduleBasicTypoStore.styleMainText = nextValue
      resolve([nextValue])
    } 
    if (type === 'textarea') {
      moduleBasicTypoStore.textarea = nextValue
      console.log(moduleBasicTypoStore.textarea);
      console.log(typeof moduleBasicTypoStore.textarea)
    }
    // if (type === 'textarea') {
    //   if (index !== null) {
    //     moduleBasicTypoStore.textarea[index] = nextValue;
    //   } else {
    //     moduleBasicTypoStore.textarea = nextValue;
    //   }
    // }
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

  
  preset = Object.assign({}, preset, { moduleName: 'Overlay', tabBackgrounds: images })

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
  })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////// GENERATE ALL

function generateAllStore(generatorName, moduleList) {

  blendStore = generators[generatorName].preset.blend
  allFonts = initFontsStore()

  let data = []

  return new Promise((resolve, reject) => {

    let currentVinyltype
    let vinylSize
    let vinylOpacity

    let particlesTypes
    let particlesQuantity
    let particlesColor

    let shapesType
    let shapesColor
    let shapesSize

    moduleList.forEach(moduleName => {

      if (moduleName == 'Background') {
        
        if (moduleBackgroundStore.currentBackgroundType == 'SolidColor') {
          let newSolidColor=generateColor()
          setBackgroundStore('SolidColor', newSolidColor)

          data.push({backgroundSolidColor: newSolidColor})
        }

        if (moduleBackgroundStore.currentBackgroundType == 'Gradient') {
          let newGradientColor1, newGradientColor2
          setBackgroundStore('Gradient')
            .then((colors) => {
              newGradientColor1 = colors[0]
              newGradientColor2 = colors[1]
              data.push({backgroundGradientColor1: newGradientColor1, backgroundGradientColor2: newGradientColor2})
            })
            console.log('GRADIENT COLORS STORE', data);
            
            let newAngle
            setBackgroundStore('AngleGradient')
              .then((randomAngle) => {
                newAngle = randomAngle
                data.push({backgroundGradientAngle: newAngle})
              })
        }

        if (moduleBackgroundStore.currentBackgroundType == 'Noise') {
          window.resetNoise()
        }

        if (moduleBackgroundStore.currentBackgroundType == 'Pixels') {
          window.resetPixels()
        }
      }

      if (moduleName == 'Shapes') {

        shapesType = sample(moduleShapesStore.options)
        setShapesStore('CurrentTabChange', shapesType)
        shapesColor = generateColor()
        setShapesStore('SolidColor', shapesColor)
        shapesSize = getRandomArbitrary(0, 100)
        setShapesStore('Size', shapesSize)

        data.push({module: moduleName, currentShapesType: shapesType, shapesSize: shapesSize, shapesColor: shapesColor })
      }

      if (moduleName == 'Particles') {

        particlesTypes = sample(moduleParticlesStore.options)
        setParticlesStore('CurrentTabChange', particlesTypes)
        particlesQuantity = getRandomArbitrary(moduleParticlesStore.min, moduleParticlesStore.max)
        setParticlesStore('quantity', particlesQuantity)
        particlesColor = generateColor()
        setParticlesStore('SolidColor', particlesColor)

        data.push({module: moduleName, currentParticlesType: particlesTypes, particlesQuantity: particlesQuantity, particlesColor: particlesColor })
      }

      if (moduleName == 'Image') {
        setImageStore()
      }

      if (moduleName == 'BackgroundImage') {
        let BgImgType = sample(moduleBackgroundImageStore.collections)
        setBackgroundImageStore('CurrentTabChange', BgImgType)
        setBackgroundImageStore('NightClub')
        setBackgroundImageStore('Cars')
        let bgImgOpacity = getRandomArbitrary(10, 255)
        setBackgroundImageStore('opacity', bgImgOpacity)

        data.push({module: moduleName, currentBgImgCollection: BgImgType, bgImgOpacity: bgImgOpacity})
      }

      if (moduleName == 'Vinyl') {

        currentVinyltype = sample(moduleVinylStore.vinylTypes)
        setVinylStore('CurrentTabChange', currentVinyltype)
        vinylSize = getRandomArbitrary(0, 100)
        setVinylStore('size', vinylSize)
        vinylOpacity = getRandomArbitrary(0, 255)
        setVinylStore('opacity', vinylOpacity)

        data.push({module: moduleName, currentVinylType: currentVinyltype, vinylSize: vinylSize, vinylOpacity: vinylOpacity })
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

      if (moduleName == 'Overlay') {
        let currentOverlayCollection = sample(moduleOverlayStore.collections)
        setOverlayStore('CurrentTabChange', currentOverlayCollection)
        setOverlayStore('NightClub')
        setOverlayStore('Cars')
        let overlayOpacity = getRandomArbitrary(10, 255)
        setOverlayStore('opacity', overlayOpacity)

        data.push({module: moduleName, currentOverlayCollection: currentOverlayCollection, overlayOpacity: overlayOpacity})
      }
    })

    resolve(data)

  })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////// RANDOMIZE MODULE

function randomizeModuleStore(moduleType) {

  return new Promise((resolve, reject) => {

    // let newValues = []
    if (moduleType == 'Background') {

      let newBackgroundType = sample(moduleBackgroundStore.backgroundTypes)
      setBackgroundStore('CurrentTabChange', newBackgroundType)
      
      if (newBackgroundType == 'SolidColor') {
        let newSolidColor=generateColor()
        setBackgroundStore('SolidColor', newSolidColor)

        // newValues.push({currentBackgroundType: newBackgroundType, backgroundSolidColor: newSolidColor})

        resolve([newBackgroundType, newSolidColor])
      }

      if (newBackgroundType == 'Gradient') {
        // newValues.push({currentBackgroundType: newBackgroundType})
        let newGradientColor1, newGradientColor2
        setBackgroundStore('Gradient')
          .then((colors) => {
            newGradientColor1 = colors[0]
            newGradientColor2 = colors[1]
            // newValues.push({backgroundGradientColor1: newGradientColor1, backgroundGradientColor2: newGradientColor2})
          })
          
        let newAngle
        setBackgroundStore('AngleGradient')
          .then((randomAngle) => {
            newAngle = randomAngle
            // newValues.push({backgroundGradientAngle: newAngle})
          })

        resolve([newBackgroundType, newGradientColor1, newGradientColor2, newAngle])
      }

      if (newBackgroundType == 'Noise') {
        let newNoiseType = sample(moduleBackgroundStore.preset.Noise.NoiseTypes)
        setBackgroundStore('currentTabImageChange', newNoiseType)
        window.resetNoise()
        // newValues.push({currentBackgroundType: newBackgroundType, currentBackgroundNoiseType: newNoiseType})

        resolve([newBackgroundType, newNoiseType])
      }

      if (newBackgroundType == 'Pixels') {
        window.resetPixels()
        // newValues.push({currentBackgroundType: newBackgroundType})

        resolve([newBackgroundType])
      }

      // resolve(newValues)
    }

    if (moduleType == 'Shapes') {
      let shapesType = sample(moduleShapesStore.types)
      setShapesStore('CurrentTabChange', shapesType)
      
      let shapesColor = generateColor()
      setShapesStore('SolidColor', shapesColor)

      let shapesSize = getRandomArbitrary(0, 100)
      setShapesStore('Size', shapesSize)

      resolve([shapesType, shapesColor, shapesSize])
    }

    if (moduleType == 'Particles') {
      let ParticlesTypes = sample(moduleParticlesStore.options)
      setParticlesStore('CurrentTabChange', ParticlesTypes)

      let particlesQuantity = getRandomArbitrary(moduleParticlesStore.min, moduleParticlesStore.max)
      setParticlesStore('quantity', particlesQuantity)

      // setParticlesStore('CurrentTabChange', ParticlesTypes)
      let particlesColor = generateColor()
      setParticlesStore('SolidColor', particlesColor)

      resolve([ParticlesTypes, particlesQuantity, particlesColor])
    }

    if (moduleType == 'Image') {
      setImageStore()
    }

    if (moduleType == 'BackgroundImage') {
      let BackgroundImageType = sample(moduleBackgroundImageStore.backgroundImageCollections)
      setBackgroundImageStore('CurrentTabChange', BackgroundImageType)

      if (BackgroundImageType == 'NightClub') {
        setBackgroundImageStore('NightClub')
      } else if (BackgroundImageType == 'Cars') {
        setBackgroundImageStore('Cars')
      }

      let newBackgroundImageOpacity = getRandomArbitrary(10, 255)
      setBackgroundImageStore('opacity', newBackgroundImageOpacity)

      resolve([BackgroundImageType, newBackgroundImageOpacity])
    }

    if (moduleType == 'Vinyl') {

      let Vinyltype = sample(moduleVinylStore.vinylTypes)
      setVinylStore('CurrentTabChange', Vinyltype)
      // console.log(Vinyltype);
      
      let size = getRandomArbitrary(0, 100)
      setVinylStore('size', size)
      
      let opacity = getRandomArbitrary(0, 255)
      setVinylStore('opacity', opacity)

      resolve([Vinyltype, size, opacity])
    }

    if (moduleType == 'BasicTypo') {
      setBasicTypoStore('Positions')
      setBasicTypoStore('SolidColor', getRandomArbitrary(30, 255))
    }

    if (moduleType == 'Lines') {
      let newColor = generateColor()
      setLinesStore('SolidColor', newColor)

      setLinesStore('randomize')

      let newStrokeWeight = getRandomArbitrary(moduleLinesStore.min, moduleLinesStore.max)
      setLinesStore('strokeWeight', newStrokeWeight)

      resolve([newColor, newStrokeWeight])
    }

    if (moduleType == 'Module3D') {

      let type3D = sample(module3DStore.types)
      set3DStore('CurrentTabChange', type3D)
      
      set3DStore('randomize')

      resolve([type3D])
    }

    if (moduleType == 'Overlay') {

      let overlayType = sample(moduleOverlayStore.collections)
      setOverlayStore('CurrentTabChange', overlayType)

      setOverlayStore('Plastic')
      setOverlayStore('Stickers')

      let overlayOpacity = getRandomArbitrary(10, 255)
      setOverlayStore('opacity', overlayOpacity)

      resolve([overlayType, overlayOpacity])
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
  getOverlayStore,
  setOverlayStore,
  generateAllStore,
  randomizeModuleStore
}