import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import HeaderModule from '../components/HeaderModule.jsx'
import ColorPicker from '../components/ColorPicker.jsx'
import DropDown from '../components/DropDown.jsx'
import Slider from '../components/Slider.jsx'

export default class Shapes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sliderValue: this.props.shapes.settings.sliderValue,
      currentShapeType: this.props.shapes.currentShapeType
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

  handleDropDownClick = (type) => {
    this.props.setShapesStore('CurrentTabChange', type)

    this.setState({
      currentShapeType: type
    })
  }
  
  render() {
    const { shapes } = this.props

    return <div className="module__container">
      <HeaderModule
        title={shapes.moduleName}
      />
      <div className="module__content flexRow">
        <DropDown
            options={shapes.options}
            value={this.state.currentShapeType}
            handleClick={this.handleDropDownClick}
          />
        <Slider
          title='Size'
          type="range"
          min="2"
          max="74"
          value={this.state.sliderValue}
          handleChange={this.handleInput}
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
