const modules = ['Background', 'Shapes', 'Particles']

const preset = {
  Background: {

    bgTypes: ['PlainColor', 'ColorPicker'],
    currentBgType: 'PlainColor',

    preset: {
      PlainColor: {},
      ColorPicker: {}
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