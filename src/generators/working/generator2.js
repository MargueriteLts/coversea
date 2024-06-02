const modules = ['Background', 'BackgroundImage', 'BasicTypo', 'Overlay']

const preset = {
  
  blend: {
    Vinyl: false,
    Text1: false
  },

  Background: {
    backgroundTypes: ['SolidColor', 'Gradient'],
    currentBackgroundType: 'Gradient',

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

  BackgroundImage: {
    opacity: 200,

    backgroundImageCollections: ['NightClub', 'Cars'],
    currentBackgroundImageCollection: 'NightClub',

    preset: {
      NightClub: {},
      Cars: {}
    }
  },

  BasicTypo: {
    color: '#bababa',

    mainText: 'Dance All Night',
    optionsMainTextFonts: ['esenin-script-one', 'Acosta', 'PT-Root-UI'],
    font: 'Acosta',
    sizeMainText:{
      sliderValue: 20,
      min: 10,
      max: 30
    },
    styles: ['NORMAL', 'LIGHT', 'BOLD'],
    styleMainText: 'NORMAL',
    leadingMainText: 20,

    dopText: true,
    textarea: 'Dance',
    sizeTextarea: 2,
    leadingTextarea: 2,
    upperCase: true,
    random: true,
    textAlign: 'left'
  },

  Overlay: {
    opacity: 90,

    collections: ['Plastic', 'Stickers'],
    currentCollection: 'Plastic',

    preset: {
      Plastic: {},
      Stickers: {}
    }
  }
}

export { modules, preset }