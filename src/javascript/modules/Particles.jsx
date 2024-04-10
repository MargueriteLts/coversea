import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import HeaderModule from '../components/HeaderModule.jsx'

export default class Particles extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sliderValue: this.props.particles.sliderValue
    }
  }

  handleInput = (e) => {
    this.props.setParticlesStore(e.target.value)
    this.setState({sliderValue: e.target.value})
  }

  render() {
    const { particles } = this.props
    return (
      <div className="ModuleContainer">
        <HeaderModule
          title='Particles'
        />
        <div className="ModuleContent">
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
