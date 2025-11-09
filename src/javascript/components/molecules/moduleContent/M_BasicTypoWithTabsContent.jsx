import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import TabButtonSet from '../../TabButtonSet.jsx'
import A_Text from '../../ATOMS/A_Text.jsx'
import TextArea from '../../TextArea.jsx'
import M_TextSettingsDropDown from '../M_TextSettingsDropDown.jsx'
import M_DropDown from '../M_DropDown.jsx'
import M_AddRemoveText from '../controls/M_AddRemoveText.jsx'
import M_Control from '../controls/M_Control.jsx'

export default class M_BasicTypoWithTabsContent extends Component {
  constructor(props) {
    super(props)

    this.state = {

      trackLayoutStyleLock: this.props.basictypowithtabs.preset.Track.layoutStyleLocked,

      valueMainText: this.props.basictypowithtabs.preset.Track.mainText.value,
      colorMainText: this.props.basictypowithtabs.preset.Track.mainText.color,

      valueOtherText: this.props.basictypowithtabs.preset.Track.otherText.value,
      colorOtherText: this.props.basictypowithtabs.preset.Track.otherText.color
    }
  }

  handleToggle = (item, setStore) => {
    if (item == 'lockTrackLayoutStyle') {
      setStore(item, !this.state.trackLayoutStyleLock)
      this.setState({
        trackLayoutStyleLock: !this.state.trackLayoutStyleLock
      })
    }
    //console.log(this.state.trackLayoutStyleLock)

    // Trigger p5 redraw
    if (window.triggerRedraw) {
      window.triggerRedraw()
    }
  }

  handleMainTextChange = (event) => {
    const inputValue = event.target.value
    this.props.setBasicTypoWithTabsStore('mainText', inputValue)
    this.setState({
      valueMainText: inputValue
    });

    // Trigger p5 redraw
    if (window.triggerRedraw) {
      window.triggerRedraw()
    }
  }

  handleChangeMainTextColor = (object, value) => {
    this.props.setBasicTypoWithTabsStore(object, value)
      .then((color) => {
        this.setState({
          colorMainText: color[0]
        })
      }
    )

    // Trigger p5 redraw
    if (window.triggerRedraw) {
      window.triggerRedraw()
    }
  }
  

  /// other text

  handleOtherTextChange = (event) => {
    const inputValue = event.target.value
    this.props.setBasicTypoWithTabsStore('otherText', inputValue)
    this.setState({
      valueOtherText: inputValue
    });

    // Trigger p5 redraw
    if (window.triggerRedraw) {
      window.triggerRedraw()
    }
  }

  handleChangeOtherTextColor = (object, value) => {
    this.props.setBasicTypoWithTabsStore(object, value)
      .then((color) => {
        this.setState({
          colorOtherText: color[0]
        })
      }
    )

    // Trigger p5 redraw
    if (window.triggerRedraw) {
      window.triggerRedraw()
    }
  }


  //////////////////////////////////////////////////////// RENDER

  renderTabContent() {
    const { basictypowithtabs, setBasicTypoWithTabsStore, handleDropDownLayoutStyleClick } = this.props

    if (basictypowithtabs.currentCoverType == 'Track') {
      return (
        <div className='content-colum-fullWidth'>
          <div className='content-column'>
            <M_Control
              orientation="row"
              controlType='Select'
              isFullWidth={true}
              hasTitle={true}
              title='Layout style'
            //lock
              hasLock={true}
              isLocked={this.state.trackLayoutStyleLock}
              setStore={setBasicTypoWithTabsStore}
              item='lockTrackLayoutStyle'
              handleToggle={this.handleToggle}
            //data
              options={basictypowithtabs.preset.Track.layoutStyles}
              data={basictypowithtabs.preset.Track.currentLayoutStyle}
              handleChange={handleDropDownLayoutStyleClick}
            />
          </div>
          {/*{this.renderTextInputs()}*/}
          <div className="basic-typo-content">
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
                setStore={setBasicTypoWithTabsStore}
                textData={basictypowithtabs.preset.Track.mainText}
                object='colorMainText'
                itemLockColor='mainLockColor'
                itemLockType='mainLockType'
                itemSizeLock='mainLockSize'
                itemLeadingLock='mainLockLeading'
                handleChange={this.handleChangeMainTextColor}
              />
            </div>

            { basictypowithtabs.preset.Track.dopText
              ?
              <div className="basic-typo-row">
                <A_Text
                  text='Small text'
                  style='basic-typo-title'
                />
                <M_AddRemoveText
                  // text={basictypowithtabs.otherText.value}
                  text={basictypowithtabs.preset.Track.otherText.values}
                  setStore={setBasicTypoWithTabsStore}
                />

                <M_DropDown
                  dropDownContent='TextSettings'
                  title='Text settings'
                  textType='other'
                  setStore={setBasicTypoWithTabsStore}
                  textData={basictypowithtabs.preset.Track.otherText}
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
        </div>
      )
    }
  }
  
  //renderTextInputs() {
  //  const { basictypowithtabs, setBasicTypoWithTabsStore } = this.props

  //  ////////////// TRACK

  //  if (basictypowithtabs.currentCoverType == 'Track') {
  //    return <div className="basic-typo-content">

  //      <div className="basic-typo-row">
  //        <A_Text
  //          text='Main text'
  //          style='basic-typo-title'
  //        />
  //        <TextArea
  //          className='textarea'
  //          rows={3}
  //          cols={40}
  //          value={this.state.valueMainText}
  //          onChange={this.handleMainTextChange}
  //        />

  //        <M_DropDown
  //          dropDownContent='TextSettings'
  //          title='Text settings'
  //          textType='main'
  //          setStore={setBasicTypoWithTabsStore}
  //          textData={basictypowithtabs.preset.Track.mainText}
  //          object='colorMainText'
  //          itemLockColor='mainLockColor'
  //          itemLockType='mainLockType'
  //          itemSizeLock='mainLockSize'
  //          itemLeadingLock='mainLockLeading'
  //          handleChange={this.handleChangeMainTextColor}
  //        />
  //      </div>

  //      { basictypowithtabs.preset.Track.dopText
  //        ?
  //        <div className="basic-typo-row">
  //          <A_Text
  //            text='Small text'
  //            style='basic-typo-title'
  //          />
  //          <M_AddRemoveText
  //            // text={basictypowithtabs.otherText.value}
  //            text={basictypowithtabs.preset.Track.otherText.values}
  //            setStore={setBasicTypoWithTabsStore}
  //          />

  //          <M_DropDown
  //            dropDownContent='TextSettings'
  //            title='Text settings'
  //            textType='other'
  //            setStore={setBasicTypoWithTabsStore}
  //            textData={basictypowithtabs.preset.Track.otherText}
  //            object='colorOtherText'
  //            itemLockColor='otherLockColor'
  //            itemLockType='otherLockType'
  //            itemSizeLock='otherLockSize'
  //            itemLeadingLock='otherLockLeading'
  //            handleChange={this.handleChangeOtherTextColor}
  //            //handleDropDownClick={this.handleOtherTextDropDownClick}
  //            //handleTextSize={this.handleSizeOtherText}
  //            //handleTextLeading={this.handleLeadingOtherText}
  //            //currentFont={this.state.currentFontOtherText}
  //            //size={this.state.sizeOtherText}
  //            //leading={this.state.leadingOtherText}
  //          />
  //        </div>
  //        : null
  //      }

  //    </div>
  //  }
  //}

  render() {
    const { basictypowithtabs, handleTabClickBasicTypoCoverType } = this.props

    const nbCoverTypes = basictypowithtabs.coverTypes.length

    return (
    <div className="background-content">
      {nbCoverTypes > 1 ? (

        <div className="background-content__with-tabs">
          <div className="background-content__with-tabs-tabs">
            <TabButtonSet
              options={basictypowithtabs.preset}
              value={basictypowithtabs.currentCoverType}
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
