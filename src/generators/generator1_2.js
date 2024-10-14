const modules = ['Background', 'Vinyl', 'Particles', 'BasicTypo']

const preset = {
  
  blend: {
    Vinyl: false,
    Text1: false
  },

  Background: {
    backgroundTypes: ['SolidColor', 'Noise'],
    currentBackgroundType: 'Noise',

    preset: {
      SolidColor: {
        color: '#56c2c4'
      },
      Noise: {
        NoiseTypes: ['Small', 'Medium', 'Big'],
        currentNoiseType: 'Medium',
        tintColor: '#56c2c4',
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

  Vinyl: {
    size: 50,
    bigger: false,
    opacity: 200,
    tintColor: '#98c456',
    tintColorLock: false,

    vinylTypes: ['Whole', 'Label', 'Vinyl'],
    currentVinylType: 'Whole',

    preset: {
      Whole: {},
      Label: {},
      Vinyl: {}
    }
  },

  Particles: {
    sliderValue: 100,
    quantityLocked: false,
    max: 200,
    min: 10,
    opacity: 255,
    color: '#000000',
    colorLocked: false,

    options: ['Ellipses', 'Squares', 'Mix'],
    currentParticlesType: 'Squares',

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