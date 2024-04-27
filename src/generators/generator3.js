const modules = ['Background', 'Vinyl', 'Image', 'Text1']

// const blend = {
//   Vinyl: true,
//   Text1: false
// }

const preset = {
  
  blend: {
    Vinyl: true,
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
    pixelate: false
  },

  Text1: {
    text: 'Funky Groov',
    font: 'wonky',
    dopText: false,
    size: 26,
    color: '#fff'
  }
}

export { modules, preset }