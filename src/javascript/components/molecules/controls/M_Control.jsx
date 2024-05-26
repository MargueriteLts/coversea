import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import IconToggle from '../../buttons/IconToggle.jsx'
import ColorPicker from '../../ColorPicker.jsx'
import Slider from '../../Slider.jsx'
import TabImageSet from '../../TabImageSet.jsx'

export default class M_Control extends Component {
  constructor(props) {
    super(props)
  }

  renderControlType() {
    const {controlType} = this.props

    const {object, data, handleChange, type, min, max, options, images} = this.props

    if (controlType == 'ColorPicker') {
      return (
        <ColorPicker
          object={object}
          color={data}
          handleChange={handleChange}
          key={type}
        />
      )
    }
    if (controlType == 'SliderOpacity') {
      //for opacity always from 0-255 -> make condition INSIDE Slider component
      return (
        <Slider
          // title={title}
          type="range"
          min="0"
          max="255"
          value={data}
          handleChange={handleChange}
        />
      )
    }
    if (controlType == 'Slider') {
      return (
        <Slider
          // title={title}
          type="range"
          min={min}
          max={max}
          value={data}
          handleChange={handleChange}
        />
      )
    }
    if (controlType == 'TabImageSet') {
      return (
        <TabImageSet
          options = {options}
          value = {data}
          handleClick = {handleChange}
          tabBackgrounds={images}
        />
      )
    }
  }

  render() {
    const { isLocked, setStore, item, handleToggle, title, orientation } = this.props

    if (orientation == 'row') {
      return <div className="M_Control row">
        <IconToggle
          isLocked={isLocked}
          setStore={setStore}
          item={item}
          handleToggle={handleToggle}
        />
        {title}
        {this.renderControlType()}
      </div>
    }
    if (orientation == 'column') {
      return <div className="M_Control column">
        <div className="control_Title">
          <IconToggle
            isLocked={isLocked}
            setStore={setStore}
            item={item}
            handleToggle={handleToggle}
          />
          {title}
        </div>
        {this.renderControlType()}
      </div>
    }
  }
}
