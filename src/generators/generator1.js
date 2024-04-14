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
      SolidColor: {},
      Gradient: {}
    }
  },
  Vinyl: {

    vinylTypes: ['Whole', 'Label'],
    currentVinylType: 'Whole',

    preset: {
      Whole: {},
      Label: {},
      sliderValue: 50,
      bigger: false
    }
  },
  Particles: {
    sliderValue: 10,

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