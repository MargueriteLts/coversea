const modules = ['Background', 'Vinyl', 'Shapes', 'Particles', 'Image']

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
      sliderValue: 300
    }
  },
  Shapes: { 
    settings: {
      sliderValue: 37
    }
  },
  Particles: { sliderValue: 0 },
  Image: {}
}

export { modules, preset }