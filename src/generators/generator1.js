const modules = ['Background', 'Vinyl', 'Particles', 'Text1']

const blend = {
  Vinyl: false,
  Text1: false
}

const preset = {
  Background: {

    bgTypes: ['SolidColor', 'Gradient'],
    currentBgType: 'Gradient',

    preset: {
      SolidColor: {
        color: '#000000'
      },
      Gradient: {
        color1: '#d9b34c',
        color2: '#943a73'
      }
    }
  },
  Vinyl: {
    sliderValue: 50,
    bigger: false,
    sliderOpacity: 255,

    vinylTypes: ['Whole', 'Label'],
    currentVinylType: 'Label',

    preset: {
      Whole: {},
      Label: {}
    }
  },
  Particles: {
    sliderValue: 10,
    opacity: 80,

    options: ['Ellipses', 'Squares', 'Mix'],
    currentParticlesType: 'Mix',

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