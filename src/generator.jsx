import './generators.css'

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
  getText1Store,
  setText1Store,
  getLinesStore,
  setLinesStore,
  get3DStore,
  set3DStore
} from './javascript/store.js'

import { initSketch } from './javascript/sketch.js'
import GeneratorContainer from './javascript/GeneratorContainer.jsx'

import * as generator1 from './generators/generator1.js'
import * as generator2 from './generators/generator2.js'
import * as generator3 from './generators/generator3.js'
import * as generator4 from './generators/generator4.js'
import * as generator5 from './generators/generator5.js'
import * as generator6 from './generators/generator6.js'

const generators = {
  generator1,
  generator2,
  generator3,
  generator4,
  generator5,
  generator6
}

const actions = {
  setShapesStore,
  setParticlesStore,
  setImageStore,
  setBackgroundStore,
  setBackgroundImageStore,
  setVinylStore,
  setText1Store,
  setLinesStore,
  set3DStore,
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
      props.image = getImageStore()
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

    if (moduleName == 'Lines') {
      props.lines = getLinesStore()
    }
    if (moduleName == 'Module3D') {
      props.module3D = get3DStore()
    }
  });

  const root = createRoot(container)
  root.render(<GeneratorContainer {...props} {...actions} />)
})
