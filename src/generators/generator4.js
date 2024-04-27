const modules = ['Background', 'Vinyl', 'Lines', 'BasicTypo']

// const blend = {
//   Vinyl: false,
//   Text1: true
// }

const preset = {
  
  blend: {
    Vinyl: false,
    Text1: true
  },

  
  Background: {
    bgTypes: ['SolidColor'],
    currentBgType: 'SolidColor',

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
    mainText: 'Music Cover Artwork in Generator4',
    textarea: 'Music is the answer to everything, music is the key to the world',
    font: 'bc-novatica-cyr',
    dopText: false,
    sizeMainText: 10,
    sizeTextarea: 2,
    upperCase: true,
    color: '#ffffff',
    random: true,
    textAlign: 'left'
  }
}

export { modules, preset }