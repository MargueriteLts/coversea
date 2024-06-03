 import './generators.css'
//import './teaserGenerator.css'

import React from 'react'
import { createRoot } from 'react-dom/client'

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
import GeneratorContainer from './javascript/GeneratorContainer.jsx'

import * as generator1 from './generators/generator1.js'
import * as generator1_2 from './generators/generator1_2.js'
import * as generator1_3 from './generators/generator1_3.js'
import * as generator2 from './generators/generator2.js'
import * as generator2_2 from './generators/generator2_2.js'
import * as generator2_3 from './generators/generator2_3.js'
import * as generator3 from './generators/generator3.js'
import * as generator3_2 from './generators/generator3_2.js'
import * as generator4 from './generators/generator4.js'
import * as generator4_2 from './generators/generator4_2.js'
import * as generator4_3 from './generators/generator4_3.js'
import * as generator4_4 from './generators/generator4_4.js'
import * as generator4_5 from './generators/generator4_5.js'
import * as generator5 from './generators/generator5.js'
import * as generator5_2 from './generators/generator5_2.js'
import * as generator6 from './generators/generator6.js'
import * as generator6_2 from './generators/generator6_2.js'
import * as generator7 from './generators/generator7.js'
import * as generator7_2 from './generators/generator7_2.js'
import * as generator7_3 from './generators/generator7_3.js'
import * as generator8 from './generators/generator8.js'
import * as generator8_2 from './generators/generator8_2.js'
import * as generator8_3 from './generators/generator8_3.js'
import * as generator9 from './generators/generator9.js'
import * as generator9_2 from './generators/generator9_2.js'
import * as generator9_3 from './generators/generator9_3.js'
import * as generator10 from './generators/generator10.js'
import * as generator10_2 from './generators/generator10_2.js'
import * as generator10_3 from './generators/generator10_3.js'

const generators = {
  generator1,
generator1_2,
generator1_3,
generator2,
generator2_2,
generator2_3,
generator3,
generator3_2,
generator4,
generator4_2,
generator4_3,
generator4_4,
generator4_5,
generator5,
generator5_2,
generator6,
generator6_2,
generator7,
generator7_2,
generator7_3,
generator8,
generator8_2,
generator8_3,
generator9,
generator9_2,
generator9_3,
generator10,
generator10_2,
generator10_3
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
  
   root.render(<GeneratorContainer {...props} {...actions} />)
})
// 