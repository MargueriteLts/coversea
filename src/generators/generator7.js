const modules = ['Background', 'Particles', 'Image', 'BasicTypo']

const preset = {
  
  blend: {
    Vinyl: false,
    Text1: false
  },

  Background: {
    backgroundTypes: ['SolidColor', 'Gradient', 'Noise', 'Pixels'],
    currentBackgroundType: 'Gradient',

    preset: {
      SolidColor: {
        color: '#000000'
      },
      Gradient: {
        color1: '#d9b34c',
        color2: '#943a73'
      },
      Noise: {
        NoiseTypes: ['Small', 'Medium', 'Big'],
        currentNoiseType: 'Small',

        preset: {
          Small: {},
          Medium: {},
          Big: {}
        }
      },
      Pixels: {}
    }
  },

  Particles: {
    sliderValue: 15,
    max: 150,
    min: 10,
    opacity: 72,
    color: '#2127cf',

    options: ['Ellipses', 'Squares', 'Mix'],
    currentParticlesType: 'Mix',

    preset: {
      Ellipses: {},
      Squares: {},
      Mix: {}
    }
  },

  Image: {
    pixelate: false,

    collections: ['Shoes'],
    currentCollection: 'Shoes',

    preset: {
      Shoes: {}
    }
  },
  
  BasicTypo: {
    mainText: 'Soft Random',
    optionsMainTextFonts: ['bc-novatica-cyr', 'Acosta', 'PT-Root-UI'],
    font: 'bc-novatica-cyr',
    sizeMainText:{
      sliderValue: 22,
      min: 10,
      max: 30
    },
    styles: ['NORMAL', 'LIGHT', 'BOLD'],
    styleMainText: 'NORMAL',
    dopText: false,
    leadingMainText: 19,
    upperCase: false,
    color: '#000'
  }
}

export { modules, preset }