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
      sliderValue: 100,

      NightClub: {},
      Cars: {}
    }
  }
}

export { modules, preset }