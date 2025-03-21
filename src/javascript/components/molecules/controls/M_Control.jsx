import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import classnames from 'classnames'

import IconToggle from '../../buttons/IconToggle.jsx'
import A_Text from '../../ATOMS/A_Text.jsx'
import ColorPicker from './M_ColorPicker.jsx'
import Slider from '../../Slider.jsx'
import TabImageSet from '../../TabImageSet.jsx'
import M_GradientColors from './M_GradientColors.jsx'
import M_GradientAngle from './M_GradientAngle.jsx'
import M_NumberInput from './M_NumberInput.jsx'
import M_ToggleIconSet from './M_ToggleIconSet.jsx'
import M_Select from '../M_Select.jsx'
import M_FileUpload from './M_FileUpload.jsx'
//import M_Button from './M_Button.jsx'

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
          min="50"
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
    if (controlType == 'Select') {
      return (
        <M_Select
          options = {options}
          value = {data}
          handleClick = {handleChange}
        />
      )
    }
    if (controlType == 'FileUpload') {
      return (
        <M_FileUpload
          handleFileChange={this.props.handleFileChange}
        />
      )
    }
    //if (controlType == 'Button') {
    //  return (
    //    <M_Button
    //      handleClick={this.props.handleClick}
    //      buttonText={this.props.buttonText}
    //    />
    //  )
    //}
  }

  render() {
    const { isLocked, setStore, item, handleToggle, title, orientation, hasTitle, isFullWidth, isHalfWidth } = this.props

    const classNames = classnames({
      'module-control': true,
      [`${orientation}`]: true,
      fullWidth: isFullWidth,
      halfWidth: isHalfWidth,
    })

    if (orientation == 'row') {
      // return <div className="M_Control row">
      return <div className={classNames}>
        <IconToggle
          isLocked={isLocked}
          setStore={setStore}
          item={item}
          handleToggle={handleToggle}
        />
        {hasTitle ? 
          <A_Text
            text={title}
            style='title-text'
          />
        : null }
        {this.renderControlType()}
      </div>
    }
    if (orientation == 'column') {
      // return <div className="M_Control column">
      return <div className={classNames}>
        <div className="module-control__title">
          <IconToggle
            isLocked={isLocked}
            setStore={setStore}
            item={item}
            handleToggle={handleToggle}
          />
          {hasTitle ? 
            <A_Text
              text={title}
              style='title-text'
            />
          : null }
        </div>
        {this.renderControlType()}
      </div>
    }
  }
}
