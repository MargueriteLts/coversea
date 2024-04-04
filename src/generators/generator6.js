const modules = ['Background', 'Shapes', 'Particles']

const blend = true

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
  Particles: { sliderValue: 0 },
}

export { modules, blend, preset }