const modules = ['Background', 'BackgroundImage', 'BasicTypo']

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

  // Text1: {
  //   text: 'Dance All Night',
  //   font: 'Acosta',
  //   dopText: true,
  //   size: 21,
  //   color: '#fff'
  // }
  BasicTypo: {
    mainText: 'Dance All Night',
    textarea: 'Dance',
    font: 'Acosta',
    dopText: true,
    sizeMainText: 20,
    leadingMainText: 20,
    sizeTextarea: 2,
    leadingTextarea: 2,
    upperCase: true,
    color: '#ffffff',
    random: true,
    textAlign: 'left'
  }
}

export { modules, preset }