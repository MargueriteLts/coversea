import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import HeaderModule from '../components/HeaderModule.jsx'
import ColorPicker from './background/ColorPicker.jsx'

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

  handleInput = (e) => {
    let type = 'strokeWeight'
    this.props.setLinesStore(type, e.target.value)
    this.setState({sliderValue: e.target.value})
  }
  
  render() {
    const { lines } = this.props

    return <div className="ModuleContainer">
      <HeaderModule
        title={lines.moduleName}
      />
      <div className="ModuleContent flexRow">
        <div className="Button" onClick={this.handleClick}>Randomize lines</div>
        <ColorPicker
          object='SolidColor'
          color={lines.color}
          handleChange={this.handleChange}
          key='AllColorPicker'
        />
        <input
            type="range"
            min="1"
            max="50"
            value={this.state.sliderValue}
            onInput={this.handleInput}
          />
      </div>
    </div>
  }
}
