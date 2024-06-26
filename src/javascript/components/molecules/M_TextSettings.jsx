import React, { Component } from 'react'

import M_Control from './controls/M_Control.jsx'

export default class M_TextSettingsDropDown extends Component {
  constructor(props) {
    super(props)

    this.state = {
      SolidColorLock: this.props.textData.colorLocked,
      TypeLock: this.props.textData.typeLocked,
      SizeLock: this.props.textData.sizeLocked,
      LeadingLock: this.props.textData.leadingLocked,

      currentFont: this.props.textData.currentFont,
      size: this.props.textData.size.sliderValue,
      leading: this.props.textData.leading.sliderValue
    };
  }

  handleToggle = (item, setStore) => {
    if (item == 'mainLockColor') {
      setStore('mainLockColor', !this.state.SolidColorLock)
      this.setState({
        SolidColorLock: !this.state.SolidColorLock
      })
    }
    if (item == 'mainLockType') {
      setStore('mainLockType', !this.state.TypeLock)
      this.setState({
        TypeLock: !this.state.TypeLock
      })
    }
    if (item == 'mainLockSize') {
      setStore('mainLockSize', !this.state.SizeLock)
      this.setState({
        SizeLock: !this.state.SizeLock
      })
    }
    if (item == 'mainLockLeading') {
      setStore('mainLockLeading', !this.state.LeadingLock)
      this.setState({
        LeadingLock: !this.state.LeadingLock
      })
    }
    if (item == 'otherLockColor') {
      setStore('otherLockColor', !this.state.SolidColorLock)
      this.setState({
        SolidColorLock: !this.state.SolidColorLock
      })
    }
    if (item == 'otherLockType') {
      setStore('otherLockType', !this.state.TypeLock)
      this.setState({
        TypeLock: !this.state.TypeLock
      })
    }
    if (item == 'otherLockSize') {
      setStore('otherLockSize', !this.state.SizeLock)
      this.setState({
        SizeLock: !this.state.SizeLock
      })
    }
    if (item == 'otherLockLeading') {
      setStore('otherLockLeading', !this.state.LeadingLock)
      this.setState({
        LeadingLock: !this.state.LeadingLock
      })
    }
 }

//handleToggle = (item, setStore) => {
//  console.log(this.props.textType);
//  if (item == 'LockColor') {
//    if (this.props.textType == 'main') {
//      setStore('mainLockColor', !this.state.SolidColorLock)
//    }
//    if (this.props.textType == 'other') {
//      setStore('otherLockColor', !this.state.SolidColorLock)
//    }
    
//    this.setState({
//      SolidColorLock: !this.state.SolidColorLock
//    })
//  }
//  if (item == 'LockType') {
//    if (this.props.textType == 'main') {
//      setStore('mainLockType', !this.state.TypeLock)
//    }
//    if (this.props.textType == 'other') {
//      setStore('otherLockType', !this.state.TypeLock)
//    }

//    this.setState({
//      TypeLock: !this.state.TypeLock
//    })
//  }
//  if (item == 'LockSize') {
//    if (this.props.textType == 'main') {
//      setStore('mainLockSize', !this.state.SizeLock)
//    }
//    if (this.props.textType == 'other') {
//      setStore('otherLockSize', !this.state.SizeLock)
//    }

//    this.setState({
//      SizeLock: !this.state.SizeLock
//    })
//  }
//  if (item == 'LockLeading') {
//    if (this.props.textType == 'main') {
//      setStore('mainLockLeading', !this.state.LeadingLock)
//    }
//    if (this.props.textType == 'other') {
//      setStore('otherLockLeading', !this.state.LeadingLock)
//    }
    
//    this.setState({
//      LeadingLock: !this.state.LeadingLock
//    })
//  }
//  //if (item == 'otherLockColor') {
//  //  setStore('otherLockColor', !this.state.SolidColorLock)
//  //  this.setState({
//  //    SolidColorLock: !this.state.SolidColorLock
//  //  })
//  //}
//  //if (item == 'otherLockType') {
//  //  setStore('otherLockType', !this.state.TypeLock)
//  //  this.setState({
//  //    TypeLock: !this.state.TypeLock
//  //  })
//  //}
//  //if (item == 'otherLockSize') {
//  //  setStore('otherLockSize', !this.state.SizeLock)
//  //  this.setState({
//  //    SizeLock: !this.state.SizeLock
//  //  })
//  //}
//  //if (item == 'otherLockLeading') {
//  //  setStore('otherLockLeading', !this.state.LeadingLock)
//  //  this.setState({
//  //    LeadingLock: !this.state.LeadingLock
//  //  })
//  //}
//}
  
 handleTextDropDownClick = (type) => {
  if (this.props.textType == 'main') {
    this.props.setStore('CurrentMainFontChange', type)
  }
  if (this.props.textType == 'other') {
    this.props.setStore('CurrentOtherFontChange', type)
  }

    this.setState({currentFont: type})
  }

  handleSizeText = (e) => {
    if (this.props.textType == 'main') {
      this.props.setStore('sizeMainText', e.target.value)
    }
    if (this.props.textType == 'other') {
      this.props.setStore('sizeOtherText', e.target.value)
    }

    this.setState({size: e.target.value})
  }

  handleLeadingText = (e) => {
    if (this.props.textType == 'main') {
      this.props.setStore('leadingMainText', e.target.value)
    }
    if (this.props.textType == 'other') {
      this.props.setStore('leadingOtherText', e.target.value)
    }

    this.setState({leading: e.target.value})
  }


  render() {
    const {
      textData,
      object,
      handleChange,
      //currentFont,
      //handleDropDownClick,
      //size,
      //handleTextSize,
      //leading,
      //handleTextLeading,
      setStore,
      itemLockColor,
      itemLockType,
      itemSizeLock,
      itemLeadingLock
    } = this.props


    return <>
          <div className='dropDown-item'>
            <M_Control
              orientation="row"
              controlType='ColorPicker'
              hasTitle={false}
              //
              isLocked={this.state.SolidColorLock}
              setStore={setStore}
              item={itemLockColor}
              handleToggle={this.handleToggle}
              //
              data={textData.color}
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
              isLocked={this.state.TypeLock}
              setStore={setStore}
              item={itemLockType}
              handleToggle={this.handleToggle}
            //data
              options={textData.fontOptions}
              //data={currentFont}
              data={this.state.currentFont}
              handleChange={this.handleTextDropDownClick}
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
              isLocked={this.state.SizeLock}
              setStore={setStore}
              item={itemSizeLock}
              handleToggle={this.handleToggle}
            //data
              //data={size}
              data={this.state.size}
              handleChange={this.handleSizeText}
              min={textData.size.min}
              max={textData.size.max}
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
              isLocked={this.state.LeadingLock}
              setStore={setStore}
              item={itemLeadingLock}
              handleToggle={this.handleToggle}
            //data
              //data={leading}
              data={this.state.leading}
              handleChange={this.handleLeadingText}
              min={textData.leading.min}
              max={textData.leading.max}
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
