import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import HeaderModule from '../components/HeaderModule.jsx'
import TabImageSet from '../components/TabImageSet.jsx'

export default class BackgroundImage extends Component {
  constructor(props) {
    super(props)
  }

  //////////////////////////////////////////////////////// RENDER
  
  render() {
    const {
      backgroundImage,
      handleRandomizeModule,
      handleTabClickBackgroundImage,
      handleBackgroundImageOpacity,
      // handleChangeBackgroundImage
    } = this.props

    return <div className="moduleContainer">
      <HeaderModule
        title={backgroundImage.moduleName}
        moduleType='BackgroundImage'
        handleRandomizeModule={handleRandomizeModule}
      />
      <div className="moduleContent">
        <TabImageSet
          options = {backgroundImage.preset}
          value = {backgroundImage.currentBackgroundImageCollection}
          handleClick = {handleTabClickBackgroundImage}
          tabBackgrounds={backgroundImage.tabBackgrounds}
        />
        {/* <div className="btn--secondary" onClick={handleChangeBackgroundImage}>Randomize image</div> */}
        <input
          type="range"
          min="0"
          max="255"
          value={backgroundImage.opacity}
          onInput={handleBackgroundImageOpacity}
        />
      </div>
    </div>
  }
}
