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
    const { lines, handleRandomizeModuleStore, handleChangeLines, handleLinesColor, handleLinesSize, linesWeight } = this.props

    return <div className="module__container">
      <HeaderModule
        title={lines.moduleName}
        moduleType='Lines'
        handleRandomizeModuleStore={handleRandomizeModuleStore}
      />
      <div className="module__content flexRow">
        <div className="btn--secondary" onClick={handleChangeLines}>Randomize lines</div>
        <ColorPicker
          object='SolidColor'
          color={lines.color}
          handleChange={handleLinesColor}
          key='AllColorPicker'
        />
        <Slider
          title='Thickness'
          type="range"
          min={this.props.lines.min}
          max={this.props.lines.max}
          value={lines.strokeWeight}
          handleChange={handleLinesSize}
        />
      </div>
    </div>
  }
}
