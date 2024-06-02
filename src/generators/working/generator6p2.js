const modules = ['Background', 'Shapes', 'BasicTypo']

const preset = {
  
  blend: {
    Vinyl: false,
    Text1: false
  },
  
  Background: {
    backgroundTypes: ['SolidColor'],
    currentBackgroundType: 'SolidColor',

    preset: {
      SolidColor: {
        color: "#000000"
      },
      Gradient: {
        color1: '#ff0000',
        color2:'#d4799a'
      }
    }
  },

  Shapes: {
    types: ['Ellipses', 'Custom1', 'Custom2'],
    currentType: 'Ellipses',

    settings: {
      sliderValue: 37,
      gradient: false
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