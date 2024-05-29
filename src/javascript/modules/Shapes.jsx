import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import M_ModuleHeader from '../components/M_ModuleHeader.jsx'
import ColorPicker from '../components/ColorPicker.jsx'
import DropDown from '../components/molecules/M_Select.jsx'
import Slider from '../components/Slider.jsx'

export default class Shapes extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const {
      shapes,
      handleRandomizeModule,
      currentShapesType,
      handleDropDownClickShapes,
      shapesSize,
      handleShapesSize,
      shapesColor,
      handleShapesColor
    } = this.props

    console.log(shapes.settings.gradient);

    return <div className="moduleContainer">
      <M_ModuleHeader
        title={shapes.moduleName}
        moduleType='Shapes'
        handleRandomizeModule={handleRandomizeModule}
      />
      <div className="moduleContent">
        <DropDown
            options={shapes.types}
            value={shapes.currentType}
            handleClick={handleDropDownClickShapes}
          />
        <Slider
          title='Size'
          type="range"
          min="2"
          max="74"
          value={shapes.settings.sliderValue}
          handleChange={handleShapesSize}
        />
        { shapes.settings.gradient
          ?
          null
          : <ColorPicker
            object='SolidColor'
            color={shapes.settings.color}
            handleChange={handleShapesColor}
            key='AllColorPicker'
          />
        }
      </div>
    </div>
  }
}
