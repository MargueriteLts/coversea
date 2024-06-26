import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import A_Text from '../../ATOMS/A_Text.jsx'
import TextArea from '../../TextArea.jsx'
import M_TextSettingsDropDown from '../M_TextSettingsDropDown.jsx'
import M_AddRemoveText from '../controls/M_AddRemoveText.jsx'

export default class BasicTypo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mainSolidColorLock: this.props.basictypo.mainText.colorLocked,
      mainTypeLock: this.props.basictypo.mainText.typeLocked,
      mainSizeLock: this.props.basictypo.mainText.sizeLocked,
      mainLeadingLock: this.props.basictypo.mainText.leadingLocked,

      otherSolidColorLock: this.props.basictypo.otherText.colorLocked,
      otherTypeLock: this.props.basictypo.otherText.typeLocked,
      otherSizeLock: this.props.basictypo.otherText.sizeLocked,
      otherLeadingLock: this.props.basictypo.otherText.leadingLocked,


      valueMainText: this.props.basictypo.mainText.value,
      currentFontMainText: this.props.basictypo.mainText.currentFont,
      // styleMainText: this.props.basictypo.styleMainText,
      colorMainText: this.props.basictypo.mainText.color,
      sizeMainText: this.props.basictypo.mainText.size.sliderValue,
      leadingMainText: this.props.basictypo.mainText.leading.sliderValue,
      //spacingMainText: this.props.basictypo.mainText.spacing.sliderValue,

      valueOtherText: this.props.basictypo.otherText.value,
      currentFontOtherText: this.props.basictypo.otherText.currentFont,
      // styleMainText: this.props.basictypo.styleMainText,
      colorOtherText: this.props.basictypo.otherText.color,
      sizeOtherText: this.props.basictypo.otherText.size.sliderValue,
      leadingOtherText: this.props.basictypo.otherText.leading.sliderValue
    }
  }

  handleMainTextChange = (event) => {
    const inputValue = event.target.value
    this.props.setBasicTypoStore('mainText', inputValue)
    this.setState({
      valueMainText: inputValue
    });
  }

  handleMainTextDropDownClick = (type) => {
    this.props.setBasicTypoStore('CurrentMainFontChange', type)
    this.setState({
      currentFontMainText: type
    })
  }

  handleChangeMainTextColor = (object, value) => {
    // console.log(object);
    this.props.setBasicTypoStore(object, value)
      .then((color) => {
        this.setState({
          colorMainText: color[0]
        })
      }
    )
  }

  handleSizeMainText = (e) => {
    this.props.setBasicTypoStore('sizeMainText', e.target.value)
    this.setState({sizeMainText: e.target.value})
  }

  handleLeadingMainText = (e) => {
    //console.log('yo');
    this.props.setBasicTypoStore('leadingMainText', e.target.value)
    this.setState({leadingMainText: e.target.value})
  }

  //handleSpacingMainText = (e) => {
  //  this.props.setBasicTypoStore('SpacingMainText', e.target.value)
  //  this.setState({spacingMainText: e.target.value})
  //}

  /// other text

    handleOtherTextChange = (event) => {
    const inputValue = event.target.value
    this.props.setBasicTypoStore('otherText', inputValue)
    this.setState({
      valueOtherText: inputValue
    });
  }

  handleOtherTextDropDownClick = (type) => {
    this.props.setBasicTypoStore('CurrentOtherFontChange', type)
    this.setState({
      currentFontOtherText: type
    })
  }


  handleChangeOtherTextColor = (object, value) => {
    this.props.setBasicTypoStore(object, value)
      .then((color) => {
        this.setState({
          colorOtherText: color[0]
        })
      }
    )
  }

  handleSizeOtherText = (e) => {
    this.props.setBasicTypoStore('sizeOtherText', e.target.value)
    this.setState({sizeOtherText: e.target.value})
  }

  handleLeadingOtherText = (e) => {
    this.props.setBasicTypoStore('leadingOtherText', e.target.value)
    this.setState({leadingOtherText: e.target.value})
  }


  handleToggle = (item, setStore, textType) => {
    //console.log(!this.state.mainSolidColorLock);
    console.log(textType);
    if (textType == 'main') {
      if (item == 'lockColor') {
        setStore('mainLockColor', !this.state.mainSolidColorLock)
        this.setState({
          mainSolidColorLock: !this.state.mainSolidColorLock
        })
      }
      if (item == 'lockType') {
        setStore('mainLockType', !this.state.mainTypeLock)
        this.setState({
          mainTypeLock: !this.state.mainTypeLock
        })
      }
      if (item == 'lockSize') {
        setStore('mainLockSize', !this.state.mainSizeLock)
        this.setState({
          mainSizeLock: !this.state.mainSizeLock
        })
      }
      if (item == 'lockLeading') {
        setStore('mainLockLeading', !this.state.mainLeadingLock)
        this.setState({
          mainLeadingLock: !this.state.mainLeadingLock
        })
      }
    }
    if (textType == 'other') {
      if (item == 'lockColor') {
        setStore('otherLockColor', !this.state.otherSolidColorLock)
        this.setState({
          otherSolidColorLock: !this.state.otherSolidColorLock
        })
      }
      if (item == 'lockType') {
        setStore('otherLockType', !this.state.otherTypeLock)
        this.setState({
          otherTypeLock: !this.state.otherTypeLock
        })
      }
      if (item == 'lockSize') {
        setStore('otherLockSize', !this.state.otherSizeLock)
        this.setState({
          otherSizeLock: !this.state.otherSizeLock
        })
      }
      if (item == 'lockLeading') {
        setStore('otherLockLeading', !this.state.otherLeadingLock)
        this.setState({
          otherLeadingLock: !this.state.otherLeadingLock
        })
      }
    }

 }




  //////////////////////////////////////////////////////// RENDER
  
  render() {
    const { basictypo, setBasicTypoStore } = this.props
    // console.log('OTHERTEXT in basictypo module', basictypo.otherText);

    return <div className="M_BasicTypoContent">

      <div className="BasicTypo_row">
        <A_Text
          text='Main text'
          style='basicTypo-title'
        />
        <TextArea
          className='textarea'
          rows={3}
          cols={40}
          value={this.state.valueMainText}
          onChange={this.handleMainTextChange}
        />

        <M_TextSettingsDropDown
          //moduleData={basictypo}
          title='Text settings'

          setStore={setBasicTypoStore}
          handleToggle={this.handleToggle}
          solidColorLock={this.state.mainSolidColorLock}
          typeLock={this.state.mainTypeLock}
          sizeLock={this.state.mainSizeLock}
          leadingLock={this.state.mainLeadingLock}
          typeOfText='main'
          
          object='colorMainText'
          color={basictypo.mainText.color}
          handleChange={this.handleChangeMainTextColor}
          fontOptions={basictypo.mainText.fontOptions}
          currentFont={this.state.currentFontMainText}
          handleDropDownClick={this.handleMainTextDropDownClick}
          handleDropDownStyles={this.handleDropDownStyles}
          handleTextSize={this.handleSizeMainText}
          size={this.state.sizeMainText}
          minSize={basictypo.mainText.size.min}
          maxSize={basictypo.mainText.size.max}
          
          handleTextLeading={this.handleLeadingMainText}
          leading={this.state.leadingMainText}
          minLeading={basictypo.mainText.leading.min}
          maxLeading={basictypo.mainText.leading.max}
        />
      </div>

      { basictypo.dopText
        ?
        <div className="BasicTypo_row">
          <A_Text
            text='Small text'
            style='basicTypo-title'
          />
          <M_AddRemoveText
            // text={basictypo.otherText.value}
            text={basictypo.otherText.values}
            setStore={setBasicTypoStore}
          />
          <M_TextSettingsDropDown
            //basictypo={basictypo}
            title='Text settings'

            setStore={setBasicTypoStore}
            handleToggle={this.handleToggle}
            solidColorLock={this.state.otherSolidColorLock}
            typeLock={this.state.otherTypeLock}
            sizeLock={this.state.otherSizeLock}
            leadingLock={this.state.otherLeadingLock}
            textType='other'

            object='colorOtherText'
            color={basictypo.otherText.color}
            handleChange={this.handleChangeOtherTextColor}
            fontOptions={basictypo.otherText.fontOptions}
            currentFont={this.state.currentFontOtherText}
            handleDropDownClick={this.handleOtherTextDropDownClick}
            handleDropDownStyles={this.handleDropDownStyles}
            handleTextSize={this.handleSizeOtherText}
            size={this.state.sizeOtherText}
            minSize={basictypo.otherText.size.min}
            maxSize={basictypo.otherText.size.max}
            handleTextLeading={this.handleLeadingOtherText}
            leading={this.state.leadingOtherText}
            minLeading={basictypo.otherText.leading.min}
            maxLeading={basictypo.otherText.leading.max}
          />
        </div>
        : null
      }

    </div>
  }
}
