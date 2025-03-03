// import './generators.css'
import './teaserGenerator.css'
import './stylesheets/language.scss'  // Import the language SCSS

import React from 'react'
import { createRoot } from 'react-dom/client'

import A_LanguageToggle from './javascript/components/ATOMS/A_LanguageToggle.jsx'
//javascript/components/ATOMS/A_LanguageToggle

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

import { initSketch, saveCanvasAsImage } from './javascript/sketch.js'
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
  initSketch,
  saveCanvasAsImage
}


document.addEventListener('DOMContentLoaded', () => {
  // Add lang-en class to body by default
  document.body.classList.add('lang-en');

  // Mount the language toggle component
  const toggleContainer = document.getElementById('language-toggle-root');
  if (toggleContainer) {
    const root = createRoot(toggleContainer);
    root.render(<A_LanguageToggle />);
  }

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