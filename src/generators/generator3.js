const modules = ['Background', 'Vinyl', 'Image', 'BasicTypo']

const preset = {
  
  blend: {
    Vinyl: true,
    Text1: false
  },
  
  Background: {
    backgroundTypes: ['Gradient'],
    currentBackgroundType: 'Gradient',

    preset: {
      SolidColor: {
        color: '#000000'
      },
      Gradient: {
        color1: '#233b70',
        color2: '#ff9900'
      }
    }
  },
  
  Vinyl: {
    sliderValue: 90,
    bigger: false,
    sliderOpacity: 200,

    vinylTypes: ['Whole', 'Label'],
    currentVinylType: 'Whole',

    preset: {
      Whole: {},
      Label: {}
    }
  },

  Image: {
    pixelate: false,

    collections: ['Shoes', 'Electronics'],
    currentCollection: 'Shoes',

    preset: {
      Shoes: {},
      Electronics: {}
    }
  },

  BasicTypo: {
    color: '#ffffff',
    upperCase: true,
    glow: false,
    stroke: false,
    chrome: true,

    mainText: 'Funky Groov',
    optionsMainTextFonts: ['esenin-script-one', 'Acosta', 'wonky', 'PT-Root-UI'],
    font: 'wonky',
    sizeMainText:{
      sliderValue: 26,
      min: 10,
      max: 30
    },
    styles: ['NORMAL', 'LIGHT', 'BOLD'],
    styleMainText: 'NORMAL',
    leadingMainText: 24
  }
}

export { modules, preset }