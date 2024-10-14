const modules = ['Background', 'Shapes', 'Particles', 'BasicTypo', 'Overlay']

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
          quantity: 12,
          locked: false,
          max: 12,
          min: 0
        },
        color1: '#F37271',
        color2:'#628F9E'
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
    color: '#ffffff',
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
      values: ['Music is the answer to everything, music is the key to the world'],
      color: '#ffffff',
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

  },
  Overlay: {
    opacity: 50,

    collections: ['Plastic', 'Stickers'],
    currentCollection: 'Plastic',

    preset: {
      Plastic: {},
      Stickers: {}
    }
  }
}

export { modules, preset }