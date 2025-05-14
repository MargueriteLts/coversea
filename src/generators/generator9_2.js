const modules = ['Background', 'Lines', 'Image', 'BasicTypo']

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
        color: '#000000'
      },
      Noise: {
        NoiseTypes: ['Small', 'Medium', 'Big'],
        currentNoiseType: 'Medium',
        tintColor: '#0000ff',
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
  
  Lines: {
    linesTypes: ['Straight', 'Arcs'],
    currentLineType: 'Straight',

    layout: 'Vertical',
    color: '#0077ff',

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
    
    strokeWeight: 2,
    min: 1,
    max: 10,
  },

  Image: {
    pixelate: false,
    locked: false,
    multiplication: true,

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
      color: '#000000',
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
      color: '#000000',
      colorLocked: false,
      typeLocked: false,
      sizeLocked: false,
      leadingLocked: false,
      fontOptions: ['Sans Serif', 'Script'],
      currentFont: 'Script',
      size:{
        sliderValue: 5,
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