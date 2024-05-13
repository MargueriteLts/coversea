import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import HeaderModule from '../components/HeaderModule.jsx'
import ColorPicker from '../components/ColorPicker.jsx'
import DropDown from '../components/DropDown.jsx'
import Slider from '../components/Slider.jsx'

export default class Shapes extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const { shapes, handleRandomizeModule, currentShapesType, handleDropDownClickShapes, shapesSize, handleShapesSize, shapesColor, handleShapesColor } = this.props

    return <div className="module__container">
      <HeaderModule
        title={shapes.moduleName}
        moduleType='Shapes'
        handleRandomizeModule={handleRandomizeModule}
      />
      <div className="module__content flexRow">
        <DropDown
            options={shapes.options}
            value={currentShapesType}
            handleClick={handleDropDownClickShapes}
          />
        <Slider
          title='Size'
          type="range"
          min="2"
          max="74"
          value={shapesSize}
          handleChange={handleShapesSize}
        />
        <ColorPicker
          object='SolidColor'
          color={shapesColor}
          handleChange={handleShapesColor}
          key='AllColorPicker'
        />
      </div>
    </div>
  }
}
