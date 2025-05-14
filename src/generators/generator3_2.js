const modules = ['Background', 'Vinyl', 'Lines', 'BasicTypo', 'Overlay']

const preset = {
  
  blend: {
    Vinyl: true,
    Text1: false
  },
  
  Background: {
    backgroundTypes: ['SolidColor', 'Pixels'],
    currentBackgroundType: 'Pixels',

    preset: {
      SolidColor: {
        color: '#000000'
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
  
  Vinyl: {
    size: 90,
    bigger: false,
    opacity: 200,
    tintColor: '#ffffff',
    tintColorLock: false,

    vinylTypes: ['Whole', 'Label', 'Vinyl'],
    currentVinylType: 'Whole',

    preset: {
      Whole: {},
      Label: {},
      Vinyl: {}
    }
  },

  Lines: {
    linesTypes: ['Straight', 'Curves', 'Bouncing'],
    currentLineType: 'Straight',

    layout: 'Bazar',
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
        quantity: 100,
        max: 150
      },
    },
    
    strokeWeight: 1,
    min: 1,
    max: 100,
  },

  BasicTypo: {
    dopText: true,

    upperCase: true,
    textAlign: 'left',

    mainText: {
      value: 'Name of your track or album',
      color: '#FB7CEB',
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
      color: '#ABD53B',
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
    opacity: 90,

    collections: ['Plastic', 'Stickers'],
    currentCollection: 'Stickers',

    preset: {
      Plastic: {},
      Stickers: {}
    }
  }
}

export { modules, preset }