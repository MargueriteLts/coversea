import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import HeaderModule from '../components/HeaderModule.jsx'
import DropDown from '../components/DropDown.jsx'
import ColorPicker from './background/ColorPicker.jsx'

export default class Particles extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sliderValue: this.props.particles.sliderValue,
      currentParticlesType: this.props.particles.currentParticlesType
    }
  }

  handleInput = (e) => {
    let type = 'quantity'
    this.props.setParticlesStore(type, e.target.value)
    this.setState({sliderValue: e.target.value})
  }

  handleDropDownClick = (type) => {
    this.props.setParticlesStore('CurrentTabChange', type)

    this.setState({
      currentParticlesType: type
    })
  }

  handleChange = (object, value) => {
    this.props.setParticlesStore(object, value)
      .then((color) => {
        this.setState({
          color: color[0]
        })
      }
    )
  }

  render() {
    const { particles } = this.props

    return (
      <div className="ModuleContainer">
        <HeaderModule
          title={particles.moduleName}
        />
        <div className="ModuleContent">
          <DropDown
            options={particles.options}
            value={this.state.currentParticlesType}
            handleClick={this.handleDropDownClick}
          />
          <ColorPicker
            object='SolidColor'
            color={particles.color}
            handleChange={this.handleChange}
            key='AllColorPicker'
          />
          <input
            type="range"
            min={particles.min}
            max="500"
            value={this.state.sliderValue}
            onInput={this.handleInput}
          />
        </div>
      </div>
    )
  }
}
