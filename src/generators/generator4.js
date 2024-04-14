const modules = ['Background', 'Vinyl', 'Lines', 'Text1']

const blend = {
  Vinyl: false,
  Text1: true
}

const preset = {
  Background: {

    bgTypes: ['SolidColor', 'Gradient'],
    currentBgType: 'SolidColor',

    preset: {
      SolidColor: {},
      Gradient: {}
    }
  },
  Vinyl: {

    vinylTypes: ['Whole', 'Label'],
    currentVinylType: 'Label',

    preset: {
      Whole: {},
      Label: {},
      sliderValue: 90,
      bigger: false,
      sliderOpacity: 200,
    }
  },
  Lines: {},
  Text1: {
    text: 'Music Cover Artwork in Generator4',
    font: 'bc-novatica-cyr',
    dopText: false,
    size: 15,
    upperCase: true,
    color: '#ffffff',
    random: true
  }
}

export { modules, blend, preset }