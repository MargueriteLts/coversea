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
  setCurrentBgTypeStore,
  getCurrentBgTypeStore,
  getBgTypeList,
  setColorBackgroundStore,
  getBgTypeTitles,
  setColorValueStore
  // setTitleCurrentBgStore,
  // getTitleCurrentBgStore
  // getColorBackgroundStore
  // setCurrentTitleStore
  // setTitleCurrentBackgroundStore
} from './javascript/store.js'

import { initSketch } from './javascript/sketch.js'
import GeneratorContainer from './javascript/GeneratorContainer.jsx'

import * as generator1 from './generators/generator1.js'
import * as generator2 from './generators/generator2.js'
import * as generator3 from './generators/generator3.js'
import * as generator4 from './generators/generator4.js'
import * as generator5 from './generators/generator5.js'

const generators = {
  generator1,
  generator2,
  generator3,
  generator4,
  generator5
}

const actions = {
  setShapesStore,
  setParticlesStore,
  setImageStore,
  setCurrentBgTypeStore,
  setColorBackgroundStore,
  getBgTypeTitles,
  setColorValueStore,
  // setTitleCurrentBgStore,
  // getTitleCurrentBgStore,
  // setCurrentTitleStore,
  // setTitleCurrentBackgroundStore,
  initSketch
}


document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('reactComponentRoot')
  const generatorName = container.dataset.generator
  const config = generators[generatorName]

  initStore(generatorName)

  const props = {
    moduleList: getModuleList()
    // backgroundTypeList: getBackgroundTypeList()
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

      props.setCurrentBgType = getCurrentBgTypeStore()
      props.bgTypeList = getBgTypeList()
      props.bgTypeTitles = getBgTypeTitles()
      // props.backgroundType = getBackgroundType()

      // config.backgroundTypeList.forEach(bgTypeName => {
      //   if (bgTypeName == 'PlainColor') {
      //     props.titleBgType = getPlainColorStore().bgName???
      //   }
        
      //   else if (bgTypeName == 'Gradient') {
      //     props.titleBgType = getGradientStore().bgName???
      //   }
      // })

      // props.plainColor = getPlainColorStore()
      // props.gradient = getGradientStore()
    }
  });

  const root = createRoot(container)
  root.render(<GeneratorContainer {...props} {...actions} />)
})
