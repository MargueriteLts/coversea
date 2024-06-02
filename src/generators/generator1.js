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
        color: '#000000'
      },
      Noise: {
        NoiseTypes: ['Small', 'Medium', 'Big'],
        currentNoiseType: 'Small',

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
    currentVinylType: 'Label',

    preset: {
      Whole: {},
      Label: {},
      Vinyl: {}
    }
  },

  Particles: {
    sliderValue: 15,
    quantityLocked: false,
    max: 200,
    min: 10,
    opacity: 255,
    color: '#fff',
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
      fontOptions: ['esenin-script-one', 'Acosta', 'PT-Root-UI', 'bc-novatica-cyr'],
      currentFont: 'bc-novatica-cyr',
      size:{
        sliderValue: 10,
        min: 5,
        max: 20
      },
      leading: 8,
    },

    otherText: {
      // values: [{value: 'Music is the answer to everything, music is the key to the world'}],
      values: ['Music is the answer to everything, music is the key to the world'],
      color: '#ffffff',
      fontOptions: ['esenin-script-one', 'Acosta', 'PT-Root-UI', 'bc-novatica-cyr'],
      currentFont: 'bc-novatica-cyr',
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