const modules = ['Background', 'Shapes', 'Particles', 'Text1']

// const blend = {
//   Vinyl: false,
//   Text1: false
// }

const preset = {
  
  blend: {
    Vinyl: false,
    Text1: false
  },

  
  Background: {

    bgTypes: ['Gradient'],
    currentBgType: 'Gradient',

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
  Shapes: { 
    settings: {
      sliderValue: 37,
      gradient: true
    }
  },
  Particles: {
    sliderValue: 10,
    max: 20,
    min: 0,  
    stroke: true,

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
    upperCase: true,
    dopText: true,
    size: 100,
    color: '#fff'
  }
}

export { modules, preset }