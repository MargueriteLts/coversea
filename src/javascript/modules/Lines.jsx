import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import HeaderModule from '../components/HeaderModule.jsx'
import ColorPicker from '../components/ColorPicker.jsx'
import Slider from '../components/Slider.jsx'

export default class Lines extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const {
      lines,
      handleRandomizeModule,
      handleChangeLines,
      handleLinesColor,
      handleLinesSize,
      linesWeight
    } = this.props

    return <div className="moduleContainer">
      <HeaderModule
        title={lines.moduleName}
        moduleType='Lines'
        handleRandomizeModule={handleRandomizeModule}
      />
      <div className="moduleContent">
        {/* <div className="btn--secondary" onClick={handleChangeLines}>Randomize lines</div> */}
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
    </div>
  }
}
