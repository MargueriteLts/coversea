import './index.css'

import React from 'react'
import { createRoot } from 'react-dom/client'

import CoverExample from './javascript/CoverExample.jsx'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('coverExample')
  const root = createRoot(container)
  root.render(<CoverExample />)
})
