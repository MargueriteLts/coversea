const modules = ['Background', 'Vinyl', 'Lines', 'BasicTypo']

const preset = {
  
  blend: {
    Vinyl: false,
    Text1: true
  },
  
  Background: {
    backgroundTypes: ['SolidColor', 'Gradient'],
    currentBackgroundType: 'SolidColor',

    preset: {
      SolidColor: {
        color: '#000000'
      },
      Gradient: {
        gradientTypes: ['Linear', 'Radial'],
        currentGradientType: 'Linear',
        typeLocked: false,

        stops: {
          quantity: 2,
          locked: false,
          max: 12,
          min: 0
        },
        color1: '#ff0000',
        color2:'#00ff00'
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

  Lines: {
    linesTypes: ['Straight', 'Curves', 'Arcs', 'Bouncing'],
    currentLineType: 'Bouncing',

    layout: 'Vertical',

    // quantity: {
    //   straightLines: 50,
    //   curvedLines: 10,
    //   bouncingLines: 100,
    //   arcs: 10,
    //   points: 10,
    // },

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
    max: 100,
  },

  BasicTypo: {
    dopText: true,
    // random: true,
    //textPositions : [[], []]

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