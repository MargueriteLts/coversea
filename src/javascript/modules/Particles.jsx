import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import HeaderModule from '../components/HeaderModule.jsx'

export default class Particles extends Component {
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
    return (
      <div className="ModuleContainer">
        <HeaderModule
          title='Particles'
        />
        <div className="ModuleContent">
          <input
            type="range"
            min="0"
            max="500"
            value={this.state.sliderValue}
            onInput={this.handleInput}
          />
        </div>
      </div>
    )
  }
}
