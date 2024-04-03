const modules = ['Background', 'Shapes', 'Particles']

const preset = {
  Background: {

    bgTypes: ['PlainColor', 'ColorPicker', 'Gradient'],
    currentBgType: 'Gradient',

    preset: {
      PlainColor: {},
      ColorPicker: {},
      Gradient: {}
    }
  },
  Shapes: { 
    settings: {
      sliderValue: 37
    }
  },
  Particles: { sliderValue: 0 }
}

export { modules, preset }