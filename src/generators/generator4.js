const modules = ['Background', 'Vinyl', 'Lines', 'BasicTypo']

const preset = {
  
  blend: {
    Vinyl: false,
    Text1: true
  },
  
  Background: {
    backgroundTypes: ['SolidColor'],
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
    sliderValue: 90,
    bigger: false,
    sliderOpacity: 200,

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

  // Text1: {
  //   text: 'Music Cover Artwork in Generator4',
  //   font: 'bc-novatica-cyr',
  //   dopText: false,
  //   size: 8,
  //   upperCase: true,
  //   color: '#ffffff',
  //   random: true,
  //   textAlign: 'left'
  // },


  BasicTypo: {
    color: '#ffffff',

    mainText: 'Music Cover Artwork in Generator4',
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