import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import A_Text from '../../ATOMS/A_Text.jsx'
import TextArea from '../../TextArea.jsx'
import M_TextSettingsDropDown from '../M_TextSettingsDropDown.jsx'
import M_DropDown from '../M_DropDown.jsx'
import M_AddRemoveText from '../controls/M_AddRemoveText.jsx'

export default class M_TypographyContent extends Component {
  constructor(props) {
    super(props)

    this.state = {

      valueMainText: this.props.typography.preset.Track.mainText.value,

      colorMainText: this.props.typography.preset.Track.mainText.color,

      valueOtherText: this.props.typography.preset.Track.otherText.value,

      colorOtherText: this.props.typography.preset.Track.otherText.color
    }
  }

  handleMainTextChange = (event) => {
    const inputValue = event.target.value
    this.props.setTypographyStore('mainText', inputValue)
    this.setState({
      valueMainText: inputValue
    });
  }

  handleChangeMainTextColor = (object, value) => {
    this.props.setTypographyStore(object, value)
      .then((color) => {
        this.setState({
          colorMainText: color[0]
        })
      }
    )
  }
  

  /// other text

  handleOtherTextChange = (event) => {
    const inputValue = event.target.value
    this.props.setTypographyStore('otherText', inputValue)
    this.setState({
      valueOtherText: inputValue
    });
  }

  handleChangeOtherTextColor = (object, value) => {
    this.props.setTypographyStore(object, value)
      .then((color) => {
        this.setState({
          colorOtherText: color[0]
        })
      }
    )
  }


  //////////////////////////////////////////////////////// RENDER
  
  render() {
    const { typography, setTypographyStore, handleDropDownTextTypeClick } = this.props

    return <div className="basic-typo-content">

      <div className='content-row'>
        <M_Control
          orientation="row"
          controlType='Select'
          isFullWidth={true}
          hasTitle={true}
          title='Cover type'
        //lock
          hasLock={false}
        //data
          options={typography.coverTypes}
          data={typography.currentCoverType}
          handleChange={handleDropDownTextTypeClick}
        />

        <M_Control
          orientation="row"
          controlType='Select'
          isFullWidth={true}
          hasTitle={true}
          title='text layout'
        //lock
          hasLock={true}
          isLocked={this.state.textLayoutLock}
          setStore={setTypographyStore}
          item='lockTextLayout'
          handleToggle={this.handleToggle}
        //data
          options={typography.coverTypes}
          data={typography.currentCoverType}
          handleChange={handleDropDownTextTypeClick}
        />
      </div>

      <div className="basic-typo-row">
        <A_Text
          text='Main text'
          style='basic-typo-title'
        />
        <TextArea
          className='textarea'
          rows={3}
          cols={40}
          value={this.state.valueMainText}
          onChange={this.handleMainTextChange}
        />

        <M_DropDown
          dropDownContent='TextSettings'
          title='Text settings'
          textType='main'
          setStore={setTypographyStore}
          textData={typography.preset.Track.mainText}
          object='colorMainText'
          itemLockColor='mainLockColor'
          itemLockType='mainLockType'
          itemSizeLock='mainLockSize'
          itemLeadingLock='mainLockLeading'
          handleChange={this.handleChangeMainTextColor}
        />
      </div>

      { typography.dopText
        ?
        <div className="basic-typo-row">
          <A_Text
            text='Small text'
            style='basic-typo-title'
          />
          <M_AddRemoveText
            // text={typography.otherText.value}
            text={typography.preset.Track.otherText.values}
            setStore={setTypographyStore}
          />

          <M_DropDown
            dropDownContent='TextSettings'
            title='Text settings'
            textType='other'
            setStore={setTypographyStore}
            textData={typography.preset.Track.otherText}
            object='colorOtherText'
            itemLockColor='otherLockColor'
            itemLockType='otherLockType'
            itemSizeLock='otherLockSize'
            itemLeadingLock='otherLockLeading'
            handleChange={this.handleChangeOtherTextColor}
            //handleDropDownClick={this.handleOtherTextDropDownClick}
            //handleTextSize={this.handleSizeOtherText}
            //handleTextLeading={this.handleLeadingOtherText}
            //currentFont={this.state.currentFontOtherText}
            //size={this.state.sizeOtherText}
            //leading={this.state.leadingOtherText}
          />
        </div>
        : null
      }

    </div>
  }
}