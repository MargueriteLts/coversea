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
    max: 100,
  },

  BasicTypo: {
    dopText: true,
    // random: true,

    upperCase: true,
    textAlign: 'left',

    mainText: {
      value: 'Name of your track or album',
      color: '#ffffff',
      fontOptions: ['esenin-script-one', 'Acosta', 'PT-Root-UI', 'bc-novatica-cyr'],
      currentFont: 'bc-novatica-cyr',
      size:{
        sliderValue: 10,
        min: 5,
        max: 20
      },
      leading: 8,
    },

    otherText: {
      value: 'Music is the answer to everything, music is the key to the world',
      color: '#ffffff',
      fontOptions: ['esenin-script-one', 'Acosta', 'PT-Root-UI', 'bc-novatica-cyr'],
      currentFont: 'bc-novatica-cyr',
      size:{
        sliderValue: 2,
        min: 1,
        max: 10
      },
      leading: 2,
    }
   
    // styles: ['NORMAL', 'LIGHT', 'BOLD'],
    // styleMainText: 'NORMAL',

  }
}

export { modules, preset }