const modules = ['Background', 'BackgroundImage', 'Text1']

const preset = {
  Background: {

    bgTypes: ['SolidColor', 'Gradient'],
    currentBgType: 'SolidColor',

    preset: {
      SolidColor: {},
      Gradient: {}
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
    size: 100
  }
}

export { modules, preset }