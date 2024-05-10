import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import HeaderModule from '../components/HeaderModule.jsx'
import ColorPicker from '../components/ColorPicker.jsx'
import Slider from '../components/Slider.jsx'

export default class Lines extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sliderValue: this.props.lines.strokeWeight
    }
  }

  handleChange = (object, value) => {
    this.props.setLinesStore(object, value)
      .then((color) => {
        this.setState({
          color: color[0]
        })
      }
    )
  }

  handleClick = () => {
    this.props.setLinesStore('randomize')
  }

  handleSliderSize = (e) => {
    let type = 'strokeWeight'
    this.props.setLinesStore(type, e.target.value)
    this.setState({sliderValue: e.target.value})
  }
  
  render() {
    const { lines } = this.props

    return <div className="module__container">
      <HeaderModule
        title={lines.moduleName}
      />
      <div className="module__content flexRow">
        <div className="btn--secondary" onClick={this.handleClick}>Randomize lines</div>
        <ColorPicker
          object='SolidColor'
          color={lines.color}
          handleChange={this.handleChange}
          key='AllColorPicker'
        />
        <Slider
          title='Thickness'
          type="range"
          min={this.props.lines.min}
          max={this.props.lines.max}
          value={this.state.sliderValue}
          handleChange={this.handleSliderSize}
        />
      </div>
    </div>
  }
}
