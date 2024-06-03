const modules = ['Background', 'Lines', 'Module3D', 'BasicTypo']

const preset = {
  
  blend: {
    Vinyl: false,
    difference: true,
    //Shapes: true
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
    currentLineType: 'Bouncing',

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
      fontOptions: ['Sans Serif', 'Script', 'Special'],
      currentFont: 'Script',
      size:{
        sliderValue: 10,
        min: 5,
        max: 20
      },
      leading: 8,
    },

    otherText: {
      values: ['Music is the answer to everything, music is the key to the world'],
      color: '#FFFFFF',
      fontOptions: ['Sans Serif', 'Script', 'Special'],
      currentFont: 'Sans Serif',
      size:{
        sliderValue: 2,
        min: 1,
        max: 10
      },
      leading: 2,
    }
   
    // styles: ['NORMAL', 'LIGHT', 'BOLD'],
    // styleMainText: 'NORMAL',

  }
}

export { modules, preset }