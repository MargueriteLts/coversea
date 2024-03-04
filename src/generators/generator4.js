const modules = ['Background']

const preset = {
  Background: {
    moduleName: 'Background',

    bgTypes: ['PlainColor', 'Gradient'],
    currentBgType: 'PlainColor',

    preset: {
      PlainColor: {
        bgName: 'Plain color',
        color: {}
      },
      Gradient: {
        bgName: 'Gradient',
        defaultStartColor: '#000000',
        defaultEndColor: '#ffffff'
      }
    }
  },
}

export { modules, preset }