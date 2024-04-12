const modules = ['Background', 'Module3D']

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

export { modules, preset }