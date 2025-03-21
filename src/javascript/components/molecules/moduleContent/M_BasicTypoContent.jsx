import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import A_Text from '../../ATOMS/A_Text.jsx'
import TextArea from '../../TextArea.jsx'
import M_TextSettingsDropDown from '../M_TextSettingsDropDown.jsx'
import M_DropDown from '../M_DropDown.jsx'
import M_AddRemoveText from '../controls/M_AddRemoveText.jsx'

export default class BasicTypo extends Component {
  constructor(props) {
    super(props)

    this.state = {

      valueMainText: this.props.basictypo.mainText.value,

      colorMainText: this.props.basictypo.mainText.color,

      valueOtherText: this.props.basictypo.otherText.value,

      colorOtherText: this.props.basictypo.otherText.color
    }
  }

  handleMainTextChange = (event) => {
    const inputValue = event.target.value
    this.props.setBasicTypoStore('mainText', inputValue)
    this.setState({
      valueMainText: inputValue
    });
  }

  handleChangeMainTextColor = (object, value) => {
    this.props.setBasicTypoStore(object, value)
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
    this.props.setBasicTypoStore('otherText', inputValue)
    this.setState({
      valueOtherText: inputValue
    });
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


  //////////////////////////////////////////////////////// RENDER
  
  render() {
    const { basictypo, setBasicTypoStore } = this.props

    return <div className="basic-typo-content">

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
          setStore={setBasicTypoStore}
          textData={basictypo.mainText}
          object='colorMainText'
          itemLockColor='mainLockColor'
          itemLockType='mainLockType'
          itemSizeLock='mainLockSize'
          itemLeadingLock='mainLockLeading'
          handleChange={this.handleChangeMainTextColor}
        />
      </div>

      { basictypo.dopText
        ?
        <div className="basic-typo-row">
          <A_Text
            text='Small text'
            style='basic-typo-title'
          />
          <M_AddRemoveText
            // text={basictypo.otherText.value}
            text={basictypo.otherText.values}
            setStore={setBasicTypoStore}
          />

          <M_DropDown
            dropDownContent='TextSettings'
            title='Text settings'
            textType='other'
            setStore={setBasicTypoStore}
            textData={basictypo.otherText}
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
