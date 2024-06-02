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

  //Overlay: {
  //  opacity: 90,

  //  collections: ['Plastic', 'Stickers'],
  //  currentCollection: 'Plastic',

  //  preset: {
  //    Plastic: {},
  //    Stickers: {}
  //  }
  //}
}

export { modules, preset }