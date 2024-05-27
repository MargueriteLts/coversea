const modules = ['Background', 'Vinyl', 'Lines', 'BasicTypo']

const preset = {
  
  blend: {
    Vinyl: false,
    Text1: true
  },
  
  Background: {
    backgroundTypes: ['SolidColor', 'Gradient'],
    currentBackgroundType: 'SolidColor',

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

  Vinyl: {
    size: 90,
    bigger: false,
    opacity: 200,

    vinylTypes: ['Whole', 'Label'],
    currentVinylType: 'Label',

    preset: {
      Whole: {},
      Label: {}
    }
  },

  Lines: {
    strokeWeight: 2,
    min: 1,
    max: 10,
  },

  BasicTypo: {
    color: '#ffffff',

    mainText: 'Name of your track or album',
    optionsMainTextFonts: ['esenin-script-one', 'Acosta', 'PT-Root-UI', 'bc-novatica-cyr'],
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