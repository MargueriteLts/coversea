import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import IconToggle from '../../buttons/IconToggle.jsx'
import A_Text from '../../ATOMS/A_Text.jsx'
import ColorPicker from '../../ColorPicker.jsx'
import Slider from '../../Slider.jsx'
import TabImageSet from '../../TabImageSet.jsx'
import M_GradientColors from './M_GradientColors.jsx'
import M_GradientAngle from './M_GradientAngle.jsx'
import M_NumberInput from './M_NumberInput.jsx'
import M_ToggleIconSet from './M_ToggleIconSet.jsx'

export default class M_Control extends Component {
  constructor(props) {
    super(props)
  }

  renderControlType() {
    const {controlType} = this.props

    const {object, data, data2, handleChange, type, min, max, options, images} = this.props

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
    if (controlType == 'GradientColors') {
      return (
        <M_GradientColors
          handleChangeBackgroundGradientColor={handleChange}
          color1={data}
          color2={data2}
        />
      )
    }
    if (controlType == 'GradientAngle') {
      return (
        <M_GradientAngle
          handleChangeGradientAngle={handleChange}
        />
      )
    }
    //Gradient type
    if (controlType == 'ToggleIconSet') {
      return (
        <M_ToggleIconSet
          handleClick={handleChange}
          options={data}
          value={data2}
        />
      )
    }
    if (controlType == 'NumberInput') {
      // console.log('in M_Control', handleChange);
      return (
        <M_NumberInput
          handleChange={handleChange}
          value={data}
          object={data2}
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
    const { isLocked, setStore, item, handleToggle, title, orientation, hasTitle } = this.props

    if (orientation == 'row') {
      return <div className="M_Control row">
        <IconToggle
          isLocked={isLocked}
          setStore={setStore}
          item={item}
          handleToggle={handleToggle}
        />
        {hasTitle ? 
          <A_Text
            text={title}
            style='titleText'
          />
        : null }
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
          {hasTitle ? 
            <A_Text
              text={title}
              style='titleText'
            />
          : null }
        </div>
        {this.renderControlType()}
      </div>
    }
  }
}
