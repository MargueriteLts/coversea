const modules = ['Background', 'BasicTypo', 'Lines', 'Module3D']

const preset = {
  
  blend: {
    Vinyl: false,
    difference: true,
    //Shapes: true
  },

  Background: {
    backgroundTypes: ['SolidColor', 'Gradient'],
    currentBackgroundType: 'SolidColor',

    preset: {
      SolidColor: {
        color: '#000000'
      },
      Gradient: {
        gradientTypes: ['Linear', 'Radial'],
        currentGradientType: 'Radial',
        typeLocked: false,

        stops: {
          quantity: 2,
          locked: false,
          max: 12,
          min: 0
        },
        color1: '#ff0000',
        color2:'#00ff00'
      },
    }
  },

  Module3D: {
    types: ['Torus', 'Square'],
    current3DType: 'Torus',

    //color1: '#FFFFFF',
    //color2: '#00FF00',

    preset: {
      Torus: {},
      Square: {}
    }
  },

  Lines: {
    linesTypes: ['Straight', 'Bouncing'],
    currentLineType: 'Straight',

    layout: 'Vertical',
    color: '#FFFFFF',

    preset: {
      Straight: {
        quantity: 50,
        max: 100
      },
      Curves: {
        quantity: 10,
        max: 10,
        points: 10
      },
      Arcs: {
        quantity: 10,
        max: 10
      },
      Bouncing: {
        quantity: 300,
        max: 500
      },
    },
    
    strokeWeight: 1,
    min: 1,
    max: 500,
  },

  BasicTypo: {
    dopText: true,

    upperCase: true,
    textAlign: 'left',

    mainText: {
      value: 'Name of your track or album',
      color: '#FFFFFF',
      colorLocked: false,
      typeLocked: false,
      sizeLocked: false,
      leadingLocked: false,
      fontOptions: ['Sans Serif', 'Script'],
      currentFont: 'Script',
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
      color: '#FFFFFF',
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