const modules = ['Background']

const preset = {
  Background: {
    moduleName: 'Background',
    mode: 'tab2'
  }
}

const backgroundTypes = ['PlainColor', 'Gradient']

const backgroundTypePreset = {
  PlainColor: {
    backgroundTypeName: 'Plain color',
    defaultColor: '#000000'
  },
  Gradient: {
    backgroundTypeName: 'Gradient',
    defaultStartColor: '#000000',
    defaultEndColor: '#ffffff'
  }
  // Texture: {
  // }
}

export { modules, preset, backgroundTypes, backgroundTypePreset }