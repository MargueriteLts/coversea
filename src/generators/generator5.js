const modules = ['Background', 'Module3D', 'BasicTypo']

// const blend = {
//   Vinyl: false,
//   Text1: false
// }

const preset = {
  
  blend: {
    Vinyl: false,
    Text1: false
  },

  
  Background: {

    bgTypes: ['SolidColor'],
    currentBgType: 'SolidColor',

    preset: {
      SolidColor: {
        color: '#000000'
      },
      Gradient: {
        color1: '#002fff',
        color2: '#ff00d4'
      }
    }
  },
  Module3D: {
    options: ['Torus', 'Square'],
    current3DType: 'Square',

    preset: {
      Torus: {},
      Square: {}
    }
  },
  // Text1: {
  //   text: 'Volume Music',
  //   font: 'AUSRINE',
  //   upperCase: true,
  //   dopText: true,
  //   size: 100,
  //   color: '#fff'
  // }

  BasicTypo: {
    color: '#ffffff',

    mainText: 'Volume Music',
    optionsMainTextFonts: ['AUSRINE', 'esenin-script-one', 'Acosta', 'PT-Root-UI', 'bc-novatica-cyr'],
    font: 'AUSRINE',
    sizeMainText:{
      sliderValue: 10,
      min: 5,
      max: 20
    },
    styles: ['NORMAL', 'LIGHT', 'BOLD'],
    styleMainText: 'NORMAL',
    leadingMainText: 8,

    dopText: true,
    textarea: 'Music is the answer to everything, music is the key to the world',
    sizeTextarea: 2,
    leadingTextarea: 2,
    upperCase: true,
    random: true,
    textAlign: 'left'
  }
}

export { modules, preset }