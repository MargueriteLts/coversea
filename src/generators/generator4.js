const modules = ['Background', 'Text1']

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
  }
}

export { modules, preset }