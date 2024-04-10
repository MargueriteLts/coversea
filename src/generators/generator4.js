const modules = ['Background', 'Text1', 'Lines', 'Particles']

const preset = {
  Background: {

    bgTypes: ['SolidColor', 'Gradient'],
    currentBgType: 'SolidColor',

    preset: {
      SolidColor: {},
      Gradient: {}
    }
  },
  Text1: {
    text: 'Some text'
  },
  Lines: {},
  Particles: { sliderValue: 0 }
}

export { modules, preset }