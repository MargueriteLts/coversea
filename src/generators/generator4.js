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
    text: 'Music Cover Artwork in Generator4'
  },
  Lines: {},
  Particles: { sliderValue: 0, min: 10 }
}

export { modules, preset }