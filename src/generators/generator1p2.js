const modules = ['Background', 'Vinyl', 'Particles', 'Text1']

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
        color: '#0062ff'
      },
      Gradient: {
        color1: '#d9b34c',
        color2: '#943a73'
      }
    }
  },
  Vinyl: {
    sliderValue: 80,
    bigger: false,
    sliderOpacity: 50,

    vinylTypes: ['Whole', 'Label'],
    currentVinylType: 'Whole',

    preset: {
      Whole: {},
      Label: {}
    }
  },
  Particles: {
    sliderValue: 50,
    opacity: 80,

    options: ['Ellipses', 'Squares', 'Mix'],
    currentParticlesType: 'Ellipses',

    preset: {
      Ellipses: {},
      Squares: {},
      Mix: {}
    }
  },
  Text1: {
    text: 'Soft Random',
    font: 'esenin-script-one',
    dopText: true,
    size: 100,
    color: '#fff'
  }
}

export { modules, blend, preset }