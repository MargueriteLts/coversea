const modules = ['Background', 'Module3D', 'BasicTypo']

const preset = {
  
  blend: {
    Vinyl: false,
    Text1: false
  },

  
  Background: {
    backgroundTypes: ['SolidColor', 'Gradient'],
    currentBackgroundType: 'Gradient',

    preset: {
      SolidColor: {
        color: '#000000'
      },
      Gradient: {
        gradientTypes: ['Linear', 'Radial'],
        currentGradientType: 'Linear',
        typeLocked: false,

        stops: {
          quantity: 2,
          locked: false,
          max: 12,
          min: 0
        },
        color1: '#5a76b8',
        color2:'#00ff00'
      }
    }
  },

  Module3D: {
    types: ['Torus', 'Square'],
    current3DType: 'Torus',

    color1: '#FFFFFF',
    color2: '#00FF00',

    preset: {
      Torus: {},
      Square: {}
    }
  },

  BasicTypo: {
    dopText: true,

    upperCase: true,
    textAlign: 'left',

    mainText: {
      value: 'Name of your track or album',
      color: '#ff0000',
      colorLocked: false,
      typeLocked: false,
      sizeLocked: false,
      leadingLocked: false,
      fontOptions: ['Sans Serif', 'Script'],
      currentFont: 'Sans Serif',
      size:{
        sliderValue: 10,
        min: 5,
        max: 20
      },
      leading: {
        sliderValue: 8,
        min: 1,
        max: 20
      },
    },

    otherText: {
      values: ['Music is the answer', 'to everything', 'music is the key', 'to the world', 'just dance', 'and listen'],
      color: '#ff0000',
      colorLocked: false,
      typeLocked: false,
      sizeLocked: false,
      leadingLocked: false,
      fontOptions: ['Sans Serif', 'Script'],
      currentFont: 'Sans Serif',
      size:{
        sliderValue: 2,
        min: 1,
        max: 10
      },
      leading: {
        sliderValue: 2,
        min: 1,
        max: 10
      },
    }
   
    // styles: ['NORMAL', 'LIGHT', 'BOLD'],
    // styleMainText: 'NORMAL',

  }
}

export { modules, preset }