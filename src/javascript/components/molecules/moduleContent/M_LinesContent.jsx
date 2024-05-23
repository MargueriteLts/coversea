import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import ColorPicker from '../../ColorPicker.jsx'
import Slider from '../../Slider.jsx'

export default class M_LinesContent extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const {
      lines,
      handleLinesColor,
      handleLinesSize
    } = this.props

    return <div className="M_LinesContent">
        <ColorPicker
          object='SolidColor'
          color={lines.color}
          handleChange={handleLinesColor}
          key='AllColorPicker'
        />
        <Slider
          title='Thickness'
          type="range"
          min={lines.min}
          max={lines.max}
          value={lines.strokeWeight}
          handleChange={handleLinesSize}
        />
    </div>
  }
}
