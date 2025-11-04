import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import TabButtonSet from '../../TabButtonSet.jsx'
import A_Text from '../../ATOMS/A_Text.jsx'
import TextArea from '../../TextArea.jsx'
import M_TextSettingsDropDown from '../M_TextSettingsDropDown.jsx'
import M_DropDown from '../M_DropDown.jsx'
import M_AddRemoveText from '../controls/M_AddRemoveText.jsx'

export default class BasicTypo extends Component {
  constructor(props) {
    super(props)

    this.state = {

      valueMainText: this.props.basictypo.preset.Track.mainText.value,

      colorMainText: this.props.basictypo.preset.Track.mainText.color,

      valueOtherText: this.props.basictypo.preset.Track.otherText.value,

      colorOtherText: this.props.basictypo.preset.Track.otherText.color
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
  
  renderTabContent() {
    const { basictypo, setBasicTypoStore } = this.props

    ////////////// TRACK

    if (basictypo.currentCoverType == 'Track') {
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
            textData={basictypo.preset.Track.mainText}
            object='colorMainText'
            itemLockColor='mainLockColor'
            itemLockType='mainLockType'
            itemSizeLock='mainLockSize'
            itemLeadingLock='mainLockLeading'
            handleChange={this.handleChangeMainTextColor}
          />
        </div>

        { basictypo.preset.Track.dopText
          ?
          <div className="basic-typo-row">
            <A_Text
              text='Small text'
              style='basic-typo-title'
            />
            <M_AddRemoveText
              // text={basictypo.otherText.value}
              text={basictypo.preset.Track.otherText.values}
              setStore={setBasicTypoStore}
            />

            <M_DropDown
              dropDownContent='TextSettings'
              title='Text settings'
              textType='other'
              setStore={setBasicTypoStore}
              textData={basictypo.preset.Track.otherText}
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

  render() {
    const { basictypo, setBasicTypoStore, handleTabClickBasicTypoCoverType } = this.props

    const nbCoverTypes = basictypo.coverTypes.length

    return (
    <div className="background-content">
      {nbCoverTypes > 1 ? (

        <div className="background-content__with-tabs">
          <div className="background-content__with-tabs-tabs">
            <TabButtonSet
              options={basictypo.preset}
              value={basictypo.currentCoverType}
              handleClick={handleTabClickBasicTypoCoverType}
            />
          </div>
          {this.renderTabContent()}
        </div>

      ) : (
        this.renderModuleContentUnits()
      )}
    </div>
    )
  }
}
