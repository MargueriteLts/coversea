const modules = ['Background', 'Module3D', 'Text1']

const preset = {
  
  blend: {
    Vinyl: false,
    Text1: false
  },

  Background: {
    backgroundTypes: ['Gradient'],
    currentBackgroundType: 'Gradient',

    preset: {
      SolidColor: {
        color: '#000000'
      },
      Gradient: {
        color1: '#002fff',
        color2: '#ff00d4'
      }
    }
  },
  Module3D: {
    options: ['Torus', 'Square'],
    current3DType: 'Torus',

    preset: {
      Torus: {},
      Square: {}
    }
  },
  Text1: {
    text: 'Volume Music',
    font: 'YUNGA-Display',
    upperCase: true,
    dopText: true,
    size: 100,
    color: '#fff'
  }
}

export { modules, preset }