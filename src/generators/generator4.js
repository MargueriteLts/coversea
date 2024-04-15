const modules = ['Background', 'Vinyl', 'Lines', 'Text1']

const blend = {
  Vinyl: false,
  Text1: true
}

const preset = {
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