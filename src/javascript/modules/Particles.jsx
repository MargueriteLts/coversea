import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import M_ModuleHeader from '../components/M_ModuleHeader.jsx'
import DropDown from '../components/molecules/M_Select.jsx'
import ColorPicker from '../components/ColorPicker.jsx'
import Slider from '../components/Slider.jsx'

export default class Particles extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { particles, handleRandomizeModule, handleDropDownClickParticles, handleParticlesQuantity, handleParticlesColor, currentParticlesType, particlesQuantity, particlesColor } = this.props

    return (
      <div className="moduleContainer">
        <M_ModuleHeader
          title={particles.moduleName}
          moduleType='Particles'
          handleRandomizeModule={handleRandomizeModule}
        />
        <div className="moduleContent">
          <DropDown
            options={particles.options}
            value={particles.currentParticlesType}
            handleClick={handleDropDownClickParticles}
          />
          <ColorPicker
            object='SolidColor'
            color={particles.color}
            handleChange={handleParticlesColor}
            key='AllColorPicker'
          />
          <Slider
            title='Quantity'
            type="range"
            min={particles.min}
            max={particles.max}
            value={particles.sliderValue}
            handleChange={handleParticlesQuantity}
          />
        </div>
      </div>
    )
  }
}
