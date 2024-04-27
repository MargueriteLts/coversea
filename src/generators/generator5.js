const modules = ['Background', 'Module3D', 'Text1']

// const blend = {
//   Vinyl: false,
//   Text1: false
// }

const preset = {
  
  blend: {
    Vinyl: false,
    Text1: false
  },

  
  Background: {

    bgTypes: ['SolidColor'],
    currentBgType: 'SolidColor',

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
    current3DType: 'Square',

    preset: {
      Torus: {},
      Square: {}
    }
  },
  Text1: {
    text: 'Volume Music',
    font: 'AUSRINE',
    upperCase: true,
    dopText: true,
    size: 100,
    color: '#fff'
  }
}

export { modules, preset }