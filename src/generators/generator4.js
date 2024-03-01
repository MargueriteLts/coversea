const modules = ['Background']

const preset = {
  Background: {
    moduleName: 'Background',

    bgTypes: ['PlainColor', 'Gradient'],
    currentBgType: 'PlainColor',

    preset: {
      PlainColor: {
        bgName: 'Plain color',
        color: [0, 0, 0]
      },
      Gradient: {
        bgName: 'Gradient',
        defaultStartColor: '#000000',
        defaultEndColor: '#ffffff'
      }
    }
  },
}

// const backgroundTypes = ['PlainColor', 'Gradient']

// const backgroundTypePreset = {
//   PlainColor: {
//     backgroundTypeName: 'Plain color',
//     defaultColor: '#000000'
//   },
//   Gradient: {
//     backgroundTypeName: 'Gradient',
//     defaultStartColor: '#000000',
//     defaultEndColor: '#ffffff'
//   }
//   // Texture: {
//   // }
// }

export { modules, preset }