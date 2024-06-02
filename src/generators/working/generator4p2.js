const modules = ['Background', 'Vinyl', 'Lines', 'Text1']

const preset = {
  
  blend: {
    Vinyl: false,
    Text1: true
  },
  
  Background: {
    backgroundTypes: ['Gradient'],
    currentBackgroundType: 'Gradient',

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
    currentVinylType: 'Whole',

    preset: {
      Whole: {},
      Label: {}
    }
  },
  Lines: {
    strokeWeight: 50,
    min: 40,
    max: 100,
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

export { modules, preset }