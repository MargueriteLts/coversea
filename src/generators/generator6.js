const modules = ['Background', 'Shapes', 'Particles', 'Text1']

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
  Shapes: { 
    settings: {
      sliderValue: 37
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
    text: 'Gradient noise',
    font: 'bc-novatica-cyr',
    dopText: true,
    size: 100,
    color: '#fff'
  }
}

export { modules, blend, preset }