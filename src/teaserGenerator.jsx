// import './generators.css'
import './teaserGenerator.css'

import React from 'react'
import { createRoot } from 'react-dom/client'

//import ogImage from './images/ui/websitethumbnail.jpg';

//// Dynamically set meta tags for og:image and twitter:image
//document.addEventListener('DOMContentLoaded', () => {
//  const metaOgImage = document.createElement('meta');
//  metaOgImage.setAttribute('property', 'og:image');
//  metaOgImage.setAttribute('content', ogImage);
//  document.head.appendChild(metaOgImage);

//  const metaTwitterImage = document.createElement('meta');
//  metaTwitterImage.setAttribute('property', 'twitter:image');
//  metaTwitterImage.setAttribute('content', ogImage);
//  document.head.appendChild(metaTwitterImage);
//});

import {
  initStore,
  getModuleList,
  getShapesStore,
  setShapesStore,
  getParticlesStore,
  setParticlesStore,
  getImageStore,
  setImageStore,
  getBackgroundStore,
  setBackgroundStore,
  getBackgroundImageStore,
  setBackgroundImageStore,
  getVinylStore,
  setVinylStore,
  getLinesStore,
  setLinesStore,
  get3DStore,
  set3DStore,
  getBasicTypoStore,
  setBasicTypoStore,
  getBasicTypoV2Store,
  setBasicTypoV2Store,
  getOverlayStore,
  setOverlayStore,
  generateAllStore,
  randomizeModuleStore

  // setCanvasSizeStore
} from './javascript/store.js'

import { initSketch } from './javascript/sketch.js'
//import GeneratorContainer from './javascript/GeneratorContainer.jsx'
import TeaserGeneratorContainer from './javascript/TeaserGeneratorContainer.jsx'

import * as teaserGenerator from './generators/teaserGenerator.js'

const generators = {
  teaserGenerator
}

const actions = {
  // initStore,
  setShapesStore,
  setParticlesStore,
  setImageStore,
  setBackgroundStore,
  setBackgroundImageStore,
  setVinylStore,
  setLinesStore,
  set3DStore,
  setBasicTypoStore,
  setBasicTypoV2Store,
  setOverlayStore,
  // setCanvasSizeStore,
  generateAllStore,
  randomizeModuleStore,
  initSketch
}


document.addEventListener('DOMContentLoaded', () => {

  //const metaOgImage = document.createElement('meta');
  //metaOgImage.setAttribute('property', 'og:image');
  //metaOgImage.setAttribute('content', ogImage);
  //document.head.appendChild(metaOgImage);

  //const metaTwitterImage = document.createElement('meta');
  //metaTwitterImage.setAttribute('property', 'twitter:image');
  //metaTwitterImage.setAttribute('content', ogImage);
  //document.head.appendChild(metaTwitterImage);

  const container = document.getElementById('reactComponentRoot')
  const generatorName = container.dataset.generator
  const config = generators[generatorName]

  initStore(generatorName)

  const props = {
    moduleList: getModuleList()
  }

  config.modules.forEach(moduleName => {
    if (moduleName == 'Shapes') {
      props.shapes = getShapesStore()
    }

    if (moduleName == 'Particles') {
      props.particles = getParticlesStore()
    }

    if (moduleName == 'Image') {
      props.objects = getImageStore()
    }

    if (moduleName == 'Background') {
      props.background = getBackgroundStore()
    }

    if (moduleName == 'BackgroundImage') {
      props.backgroundImage = getBackgroundImageStore()
    }

    if (moduleName == 'Vinyl') {
      props.vinyl = getVinylStore()
    }

    if (moduleName == 'Text1') {
      props.text1 = getText1Store()
    }

    if (moduleName == 'BasicTypo') {
      props.basictypo = getBasicTypoStore()
    }

    if (moduleName == 'BasicTypoV2') {
      props.basictypoV2 = getBasicTypoV2Store()
    }

    if (moduleName == 'Lines') {
      props.lines = getLinesStore()
    }
    if (moduleName == 'Module3D') {
      props.module3D = get3DStore()
    }
    if (moduleName == 'Overlay') {
      props.overlay = getOverlayStore()
    }
  });

  const root = createRoot(container)
  root.render(<TeaserGeneratorContainer {...props} {...actions} />)
})
// 