import React, { Component, createRef } from 'react'
import ReactDOM from 'react-dom'
import reactCSS from 'reactcss'

import A_DropDownButton from '../ATOMS/A_DropDownButton.jsx'
import M_Control from './controls/M_Control.jsx'
//import M_ColorPicker from './controls/M_ColorPicker.jsx'
//import M_Select from './M_Select.jsx'
//import Slider from '../Slider.jsx'

export default class M_TextSettingsDropDown extends Component {
  constructor(props) {
    super(props)

    this.state = {
      typeLock: this.props.lines.lineTypeLocked,
      weightLock : this.props.lines.strokeWeightLocked,
      solidColorLock: this.props.lines.colorLocked,
      quantityLock: this.props.lines.quantityLocked
    };
  }

  handleToggle = (item, setStore) => {
    
    
    if (item == 'lockType') {
      setStore(item, !this.state.typeLock)
      this.setState({
        typeLock: !this.state.typeLock
      })
    }
   if (item == 'lockWeight') {
     setStore(item, !this.state.weightLock)
     this.setState({
       weightLock: !this.state.weightLock
     })
   }
   if (item == 'lockColor') {
     setStore(item, !this.state.solidColorLock)
     this.setState({
       solidColorLock: !this.state.solidColorLock
     })
   }
   if (item == 'lockQuantity') {
     setStore(item, !this.state.quantityLock)
     this.setState({
       quantityLock: !this.state.quantityLock
     })
   }
 }
  

  render() {
    const {
      object,
      color,
      handleChange,
      fontOptions,
      currentFont,
      handleDropDownClick,
      // handleDropDownStyles,
      minSize,
      maxSize,
      size,
      handleTextSize,
      leading,
      handleTextLeading,
      minLeading,
      maxLeading,
      //spacing,
      //handleTextSpacing,
      //minSpacing,
      //maxSpacing
    } = this.props


    return <>
          <div className='dropDown-item'>
            <M_Control
              orientation="row"
              controlType='ColorPicker'
              hasTitle={false}

              //isLocked={this.state.solidColorLock}
              //setStore={setBackgroundStore}
              //item='lockSolidColor'
              //handleToggle={this.handleToggle}

              data={color}
              object={object}
              handleChange={handleChange}
              type='AllColorPicker'
            />
          </div>
          <div className='dropDown-item'>
            <M_Control
              orientation="row"
              controlType='Select'
              isFullWidth={true}
              hasTitle={true}
              title='Type'
            //lock
              //isLocked={this.state.typeLock}
              //setStore={setLinesStore}
              //item='lockType'
              //handleToggle={this.handleToggle}
            //data
              options={fontOptions}
              data={currentFont}
              handleChange={handleDropDownClick}
            />
          </div>
          <div className='dropDown-item'>
            <M_Control
              orientation="row"
              controlType='Slider'
              isFullWidth={true}
              hasTitle={true}
              title='Size'
            //lock
              //isLocked={this.state.quantityLock}
              //setStore={setLinesStore}
              //item='lockQuantity'
              //handleToggle={this.handleToggle}
            //data
              data={size}
              handleChange={handleTextSize}
              min={minSize}
              max={maxSize}
            />
          </div>
          <div className='dropDown-item'>
            <M_Control
              orientation="row"
              controlType='Slider'
              isFullWidth={true}
              hasTitle={true}
              title='Leading'
            //lock
              //isLocked={this.state.quantityLock}
              //setStore={setLinesStore}
              //item='lockQuantity'
              //handleToggle={this.handleToggle}
            //data
              data={leading}
              handleChange={handleTextLeading}
              min={minLeading}
              max={maxLeading}
            />
          </div>
          
          {/*<div className='dropDown-item'>
            <M_Control
              orientation="row"
              controlType='Slider'
              isFullWidth={true}
              hasTitle={true}
              title='Spacing'
            //lock
              //isLocked={this.state.quantityLock}
              //setStore={setLinesStore}
              //item='lockQuantity'
              //handleToggle={this.handleToggle}
            //data
              data={spacing}
              handleChange={handleTextSpacing}
              min={minSpacing}
              max={maxSpacing}
            />
          </div>*/}
        </>
  }
}
