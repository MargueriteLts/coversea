const modules = ['Background', 'Vinyl', 'Image']

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
  Image: {}
}

export { modules, preset }