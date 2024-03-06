const modules = ['Background']

const preset = {
  Background: {

    bgTypes: ['PlainColor', 'ColorPicker'],
    currentBgType: 'PlainColor',

    preset: {
      PlainColor: {},
      ColorPicker: {}
    }
  }
}

export { modules, preset }