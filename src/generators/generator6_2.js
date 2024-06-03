const modules = ['Background', 'Shapes', 'Particles', 'BasicTypo']

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
          quantity: 0,
          locked: false,
          max: 12,
          min: 0
        },
        color1: '#54D0E8',
        color2:'#AF3D88'
      }
    }
  },
  
  Shapes: {
    types: ['Ellipses', 'Coversea'],
    currentType: 'Ellipses',
    blend: false,

    settings: {
      sliderValue: 37,
      gradient: true,
      colorLocked: false,
      sizeLocked: false
    }
  },
  
  Particles: {
    sliderValue: 15,
    quantityLocked: false,
    max: 20,
    min: 1,
    stroke: true,
    opacity: 255,
    color: '#FFFFFF',
    colorLocked: false,

    options: ['Ellipses', 'Squares', 'Mix'],
    currentParticlesType: 'Mix',

    preset: {
      Ellipses: {},
      Squares: {},
      Mix: {}
    }
  },

  BasicTypo: {
    dopText: true,

    upperCase: true,
    textAlign: 'left',

    mainText: {
      value: 'Name of your track or album',
      color: '#ffffff',
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
      color: '#ffffff',
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

  },
  
  Overlay: {
    opacity: 3,

    collections: ['Plastic', 'Stickers'],
    currentCollection: 'Plastic',

    preset: {
      Plastic: {},
      Stickers: {}
    }
  }
}

export { modules, preset }