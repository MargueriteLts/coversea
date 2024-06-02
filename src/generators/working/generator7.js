const modules = ['Background', 'Particles', 'Image', 'BasicTypoV2']

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
        locked: false,
        color: '#000000'
      },
      Gradient: {
        locked: false,
        color1: '#d9b34c',
        color2: '#943a73'
      },
      Noise: {
        locked: false,
        NoiseTypes: ['Small', 'Medium', 'Big'],
        currentNoiseType: 'Small',

        preset: {
          Small: {},
          Medium: {},
          Big: {}
        }
      },
      Pixels: {
        locked: false
      }
    }
  },

  // Particles: {
  //   sliderValue: 15,
  //   max: 150,
  //   min: 10,
  //   opacity: 72,
  //   color: '#2127cf',

  //   options: ['Ellipses', 'Squares', 'Mix'],
  //   currentParticlesType: 'Mix',

  //   preset: {
  //     Ellipses: {},
  //     Squares: {},
  //     Mix: {}
  //   }
  // },

  // Image: {
  //   pixelate: false,

  //   collections: ['Shoes'],
  //   currentCollection: 'Shoes',

  //   preset: {
  //     Shoes: {}
  //   }
  // },
  
  BasicTypoV2: {
    textInput: 'Soft Random',
    optionsTextFonts: ['bc-novatica-cyr', 'Acosta', 'PT-Root-UI'],
    font: 'bc-novatica-cyr',
    sizeText:{
      sliderValue: 10,
      min: 3,
      max: 20
    },
    styles: ['NORMAL', 'LIGHT', 'BOLD'],
    styleText: 'NORMAL',
    leadingText: 19,
    upperCase: false,
    color: '#000',
    radius: 250,
    nText: 50
  }
}

export { modules, preset }