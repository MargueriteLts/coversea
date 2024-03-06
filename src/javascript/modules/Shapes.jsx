import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import HeaderModule from '../components/HeaderModule.jsx'
import AllColorPicker from './background/AllColorPicker.jsx'

export default class Shapes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sliderValue: this.props.sliderValue
    }
  }
  
  handleInput = (e) => {
    this.props.setSliderValue(e.target.value)
    this.setState({sliderValue: e.target.value})
  }
  
  render() {
    const { shapes, setColorPickerStore } = this.props

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
        <AllColorPicker
          object='shapes'
          setColorPickerStore={setColorPickerStore}
          color={shapes.settings.color}
          key='AllColorPicker'
        />
      </div>
    </div>
  }
}
