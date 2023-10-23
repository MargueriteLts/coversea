import './page.css'

import React from 'react'
import { createRoot } from 'react-dom/client'

import Container from './javascript/Container.jsx'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('generatorContainer')
  const root = createRoot(container)
  root.render(<Container />)
})
