const modules = ['Background', 'BackgroundImage', 'BasicTypo', 'Overlay']

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
    sliderValue: 200,

    collections: ['NightClub', 'Cars'],
    currentCollection: 'NightClub',

    preset: {
      NightClub: {},
      Cars: {}
    }
  },

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
  },

  Overlay: {
    opacityValue: 90,

    collections: ['Plastic', 'Stickers'],
    currentCollection: 'Plastic',

    preset: {
      Plastic: {},
      Stickers: {}
    }
  }
}

export { modules, preset }