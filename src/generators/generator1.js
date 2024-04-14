const modules = ['Background', 'Vinyl', 'Particles', 'Text1']

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
      sliderValue: 50
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
  Image: {},
  Text1: {
    text: 'Yooooo'
  }
}

export { modules, preset }