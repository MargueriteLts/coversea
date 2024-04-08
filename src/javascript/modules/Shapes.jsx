import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import HeaderModule from '../components/HeaderModule.jsx'
import ColorPicker from './background/ColorPicker.jsx'

export default class Shapes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sliderValue: this.props.sliderValue
    }
  }
  
  handleInput = (e) => {
    let type = 'Size'
    this.props.setShapesStore(type, e.target.value)
    this.setState({sliderValue: e.target.value})
  }

  handleChange = (object, value) => {
    this.props.setShapesStore(object, value)
      .then((color) => {
        this.setState({
          color: color[0]
        })
      }
    )
  }
  
  render() {
    const { shapes } = this.props

    return <div className="ModuleContainer">
      <HeaderModule
        title={shapes.moduleName}
      />
      <div className="ModuleContent flexRow">
        <input
          type="range"
          min="2"
          max="74"
          value={this.state.sliderValue}
          onInput={this.handleInput}
        />
        <ColorPicker
          object='SolidColor'
          color={shapes.settings.color}
          handleChange={this.handleChange}
          key='AllColorPicker'
        />
      </div>
    </div>
  }
}
