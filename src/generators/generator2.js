const modules = ['Background', 'Image', 'BackgroundImage']

const preset = {
  Background: {

    bgTypes: ['SolidColor', 'Gradient'],
    currentBgType: 'SolidColor',

    preset: {
      SolidColor: {},
      Gradient: {}
    }
  },
  Image: {},
  BackgroundImage: {

    collections: ['NightClub', 'Cars'],
    currentCollection: 'NightClub',

    preset: {
      NightClub: {},
      Cars: {}
    }
  }
}

export { modules, preset }