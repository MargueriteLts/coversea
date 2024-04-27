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
    currentBgType: 'Gradient',

    preset: {
      SolidColor: {
        color: '#000000'
      },
      Gradient: {
        color1: '#0043d4',
        color2: '#00d443'
      }
    }
  },

  Image: {},
  BackgroundImage: {
    sliderValue: 100,

    collections: ['NightClub', 'Cars'],
    currentCollection: 'NightClub',

    preset: {

      NightClub: {},
      Cars: {}
    }
  },

  Text1: {
    text: 'Dance All Night',
    font: 'Acosta',
    dopText: true,
    size: 21,
    color: '#fff'
  }
}

export { modules, preset }