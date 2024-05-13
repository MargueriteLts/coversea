const modules = ['Background', 'Shapes', 'Particles', 'BasicTypo']

// const blend = {
//   Vinyl: false,
//   Text1: false
// }

const preset = {
  
  blend: {
    Vinyl: false,
    Text1: false
  },

  
  Background: {

    bgTypes: ['Gradient'],
    currentBgType: 'Gradient',

    preset: {
      SolidColor: {
        color: '#000000'
      },
      Gradient: {
        color1: '#ff0000',
        color2:'#00ff00'
      }
    }
  },
  Shapes: {
    options: ['Ellipses', 'Custom1', 'Custom2'],
    currentShapeType: 'Custom1',

    settings: {
      sliderValue: 37,
      gradient: true
    }
  },
  Particles: {
    sliderValue: 10,
    max: 20,
    min: 0,  
    stroke: true,

    options: ['Ellipses', 'Squares', 'Mix'],
    currentParticlesType: 'Ellipses',

    preset: {
      Ellipses: {},
      Squares: {},
      Mix: {}
    }
  },

  BasicTypo: {
    color: '#ffffff',

    mainText: 'Gradient noise',
    optionsMainTextFonts: ['AUSRINE', 'esenin-script-one', 'Acosta', 'PT-Root-UI', 'bc-novatica-cyr'],
    font: 'bc-novatica-cyr',
    sizeMainText:{
      sliderValue: 10,
      min: 5,
      max: 20
    },
    styles: ['NORMAL', 'LIGHT', 'BOLD'],
    styleMainText: 'NORMAL',
    leadingMainText: 8,

    dopText: true,
    textarea: 'Music is the answer to everything, music is the key to the world',
    sizeTextarea: 2,
    leadingTextarea: 2,
    upperCase: true,
    random: true,
    textAlign: 'left'
  }
}

export { modules, preset }