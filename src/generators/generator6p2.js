const modules = ['Background', 'Shapes', 'Particles', 'Text1']

const blend = {
  Vinyl: false,
  Text1: false
}

const preset = {
  Background: {

    bgTypes: ['SolidColor'],
    currentBgType: 'SolidColor',

    preset: {
      SolidColor: {
        color: "#000000"
      },
      Gradient: {
        color1: '#ff0000',
        color2:'#d4799a'
      }
    }
  },
  Shapes: { 
    settings: {
      sliderValue: 70
    }
  },
  Particles: {
    sliderValue: 10,
    stroke: false,

    options: ['Ellipses', 'Squares', 'Mix'],
    currentParticlesType: 'Mix',

    preset: {
      Ellipses: {},
      Squares: {},
      Mix: {}
    }
  },
  Text1: {
    text: 'Shape Noise',
    font: 'bc-novatica-cyr',
    upperCase: true,
    dopText: true,
    size: 100,
    color: '#fff'
  }
}

export { modules, blend, preset }