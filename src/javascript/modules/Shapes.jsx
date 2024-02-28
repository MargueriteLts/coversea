import React, { Component } from 'react'
import ReactDOM from 'react-dom'

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
    return <div className="Shapes">
      <input
        type="range"
        min="2"
        max="74"
        value={this.state.sliderValue}
        onInput={this.handleInput}
      />
    </div>
  }
}
