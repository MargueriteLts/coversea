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
    console.log(type, e);
    this.props.setShapesStore(type, e.target.value)
    this.setState({sliderValue: e.target.value})
  }

  handleChange = (object, value) => {
    console.log('COLOR HANDLECHANGE', object, value);
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
          // object='Size'
          value={this.state.sliderValue}
          onInput={this.handleInput}
        />
        <ColorPicker
          // object='shapes'
          object='SolidColor'
          // setColorPickerStore={setColorPickerStore}
          color={shapes.settings.color}
          handleChange={this.handleChange}
          key='AllColorPicker'
        />
      </div>
    </div>
  }
}
