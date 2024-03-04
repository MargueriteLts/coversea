const modules = ['Background']

const preset = {
  Background: {
    moduleName: 'Background',

    bgTypes: ['PlainColor', 'ColorPicker'],
    currentBgType: 'PlainColor',

    preset: {
      PlainColor: {
        bgName: 'Plain color',
        color: {}
      },
      ColorPicker: {
        bgName: 'Gradient',
        defaultStartColor: '#000000',
        defaultEndColor: '#ffffff'
      }
    }
  },
}

export { modules, preset }