const modules = ['Background', 'Vinyl', 'Particles', 'BasicTypo']

const preset = {
  
  blend: {
    Vinyl: false,
    Text1: false
  },

  Background: {
    backgroundTypes: ['SolidColor', 'Gradient', 'Noise', 'Pixels'],
    currentBackgroundType: 'SolidColor',

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

  Vinyl: {
    sliderValue: 50,
    bigger: false,
    sliderOpacity: 255,

    vinylTypes: ['Whole', 'Label'],
    currentVinylType: 'Label',

    preset: {
      Whole: {},
      Label: {}
    }
  },

  Particles: {
    sliderValue: 15,
    max: 150,
    min: 10,
    opacity: 80,

    options: ['Ellipses', 'Squares', 'Mix'],
    currentParticlesType: 'Mix',

    preset: {
      Ellipses: {},
      Squares: {},
      Mix: {}
    }
  },
  
  BasicTypo: {
    mainText: 'Soft Random',
    optionsMainTextFonts: ['esenin-script-one', 'Acosta', 'PT-Root-UI'],
    font: 'esenin-script-one',
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
    color: '#bababa'
  }
}

export { modules, preset }