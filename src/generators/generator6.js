const modules = ['Background', 'Shapes', 'Particles']

const blend = true

const preset = {
  Background: {

    bgTypes: ['ColorPicker'],
    currentBgType: 'ColorPicker',

    preset: {
      ColorPicker: {}
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