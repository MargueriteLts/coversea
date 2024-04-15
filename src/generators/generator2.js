const modules = ['Background', 'BackgroundImage', 'Text1']

const blend = {
  Vinyl: false,
  Text1: false
}

const preset = {
  Background: {

    bgTypes: ['SolidColor', 'Gradient'],
    currentBgType: 'SolidColor',

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

    collections: ['NightClub', 'Cars'],
    currentCollection: 'NightClub',

    preset: {
      sliderValue: 100,

      NightClub: {},
      Cars: {}
    }
  },
  Text1: {
    text: 'Dance All Night',
    font: 'Acosta',
    dopText: true,
    size: 100,
    color: '#fff'
  }
}

export { modules, blend, preset }