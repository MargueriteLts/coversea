const modules = ['Background', 'BackgroundImage', 'Text1']

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

    bgTypes: ['SolidColor', 'Gradient'],
    currentBgType: 'SolidColor',

    preset: {
      SolidColor: {
        color: '#000000'
      },
      Gradient: {
        color1: '#5576ab',
        color2: '#695a42'
      }
    }
  },
  Image: {},
  BackgroundImage: {
    sliderValue: 100,

    collections: ['NightClub', 'Cars'],
    currentCollection: 'Cars',

    preset: {

      NightClub: {},
      Cars: {}
    }
  },
  Text1: {
    text: 'Voyage au bout du monde',
    font: 'esenin-script-one',
    dopText: true,
    size: 100,
    color: '#fff'
  }
}

export { modules, preset }