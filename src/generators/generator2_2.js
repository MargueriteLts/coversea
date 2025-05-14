const modules = ['Background', 'BackgroundImage', 'BasicTypo', 'Shapes']

const preset = {
  
  blend: {
    Vinyl: false,
    difference: false,
    //Shapes: true
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

  BackgroundImage: {
    opacity: 200,
    locked: false,
    opacityLock: false,

    backgroundImageCollections: ['NightClub', 'Cars'],
    currentBackgroundImageCollection: 'NightClub',

    preset: {
      NightClub: {},
      Cars: {}
    }
  },

  Shapes: {
    types: ['Ellipses', 'Coversea'],
    currentType: 'Coversea',
    blend: true,
    
    settings: {
      color: '#ffffff',
      sliderValue: 37,
      gradient: false,
      colorLocked: false,
      sizeLocked: false
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