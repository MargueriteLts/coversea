const modules = ['Background', 'Shapes', 'Image', 'BasicTypo']

const preset = {
  
  blend: {
    Vinyl: false,
    Text1: false
  },
  
  Background: {
    backgroundTypes: ['SolidColor', 'Noise', 'Gradient'],
    currentBackgroundType: 'SolidColor',

    preset: {
      SolidColor: {
        color: '#ff00bb'
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
      Noise: {
        NoiseTypes: ['Small', 'Medium', 'Big'],
        currentNoiseType: 'Small',
        tintColor: '#ffffff',
        tintColorLock: false,
        typeLocked: false,

        preset: {
          Small: {},
          Medium: {},
          Big: {}
        }
      }
    }
  },

  Shapes: {
    types: ['Ellipses', 'Coversea'],
    currentType: 'Ellipses',
    blend: false,

    settings: {
      sliderValue: 37,
      gradient: false,
      colorLocked: false,
      sizeLocked: false,
      color: '#999999'
    }
  },

  Image: {
    pixelate: false,
    locked: false,
    multiplication: false,

    collections: ['Shoes', 'Tools'],
    currentCollection: 'Shoes',

    preset: {
      Shoes: {},
      Tools: {}
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

  }
}

export { modules, preset }