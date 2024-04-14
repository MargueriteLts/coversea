const modules = ['Background', 'Module3D']

const blend = {
  Vinyl: false,
  Text1: false
}

const preset = {
  Background: {

    bgTypes: ['SolidColor', 'Gradient'],
    currentBgType: 'SolidColor',

    preset: {
      SolidColor: {},
      Gradient: {}
    }
  },
  Module3D: {
    options: ['Torus', 'Square'],
    current3DType: 'Torus',

    preset: {
      Torus: {},
      Square: {}
    }
  }
}

export { modules, blend, preset }