import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import HeaderModule from '../components/HeaderModule.jsx'
import DropDown from '../components/DropDown.jsx'
import ColorPicker from '../components/ColorPicker.jsx'
import Slider from '../components/Slider.jsx'

export default class Particles extends Component {
  constructor(props) {
    super(props)

    // this.state = {
    //   sliderValue: this.props.particles.sliderValue,
    //   currentParticlesType: this.props.particles.currentParticlesType
    // }
  }

  // handleInput = (e) => {
  //   let type = 'quantity'
  //   this.props.setParticlesStore(type, e.target.value)
  //   this.setState({sliderValue: e.target.value})
  // }

  // handleDropDownClick = (type) => {
  //   this.props.setParticlesStore('CurrentTabChange', type)

  //   this.setState({
  //     currentParticlesType: type
  //   })
  // }

  // handleChange = (object, value) => {
  //   this.props.setParticlesStore(object, value)
  //     .then((color) => {
  //       this.setState({
  //         color: color[0]
  //       })
  //     }
  //   )
  // }

  render() {
    const { particles, handleRandomizeModule, handleDropDownClickParticles, handleParticlesQuantity, handleParticlesColor, currentParticlesType, particlesQuantity, particlesColor } = this.props

    return (
      <div className="module__container">
        <HeaderModule
          title={particles.moduleName}
          moduleType='Particles'
          handleRandomizeModule={handleRandomizeModule}
        />
        <div className="module__content">
          <DropDown
            options={particles.options}
            value={currentParticlesType}
            handleClick={handleDropDownClickParticles}
          />
          <ColorPicker
            object='SolidColor'
            color={particlesColor}
            handleChange={handleParticlesColor}
            key='AllColorPicker'
          />
          <Slider
            title='Quantity'
            type="range"
            min={particles.min}
            max={particles.max}
            value={particlesQuantity}
            handleChange={handleParticlesQuantity}
          />
        </div>
      </div>
    )
  }
}
