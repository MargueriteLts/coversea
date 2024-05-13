import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import HeaderModule from '../components/HeaderModule.jsx'
import TabButtonSet from '../components/TabButtonSet.jsx'

export default class BackgroundImage extends Component {
  constructor(props) {
    super(props)
  }

  //////////////////////////////////////////////////////// RENDER
  
  render() {
    const { backgroundImage, handleRandomizeModule, currentBgImgCollection, handleTabClickBackgroundImage, bgImgOpacity, handleBackgroundImageOpacity, handleChangeBackgroundImage } = this.props

    return <div className="module__container">
      <HeaderModule
        title={backgroundImage.moduleName}
        moduleType='BackgroundImage'
        handleRandomizeModule={handleRandomizeModule}
      />
      <div className="module__content">
        <TabButtonSet
          options={backgroundImage.preset}
          value={currentBgImgCollection}
          handleClick={handleTabClickBackgroundImage}
        />
        <div className="btn--secondary" onClick={handleChangeBackgroundImage}>Randomize image</div>
        <input
          type="range"
          min="0"
          max="255"
          value={bgImgOpacity}
          onInput={handleBackgroundImageOpacity}
        />
      </div>
    </div>
  }
}
