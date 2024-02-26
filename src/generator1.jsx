import './generators.css'

import React from 'react'
import { createRoot } from 'react-dom/client'

import { getBackgroundValue, setBackgroundValue, getShapesValue, setShapesValue, getParticlesValue, setParticlesValue, getConfig, setConfig } from './javascript/store.js'

import { initSketch } from './javascript/sketch.js'
import GeneratorContainer from './javascript/GeneratorContainer.jsx'

const config = {
  modules: ['PlainColorBackground', 'Shapes', 'Particles']
}

setConfig(config)

const props = {
  backgroundValue: getBackgroundValue(),
  shapesValue: getShapesValue(),
  particlesValue: getParticlesValue(),
  config
}

const actions = {
  setBackgroundValue,
  setShapesValue,
  setParticlesValue,
  initSketch
}


document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('reactComponentRoot')
  const root = createRoot(container)
  root.render(<GeneratorContainer {...props} {...actions} />)
})
