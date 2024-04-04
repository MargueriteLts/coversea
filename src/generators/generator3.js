const modules = ['Background', 'Shapes', 'Image']

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
  Image: {}
}

export { modules, preset }