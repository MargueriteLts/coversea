import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import M_ModuleHeader from '../components/M_ModuleHeader.jsx'
import TabImageSet from '../components/TabImageSet.jsx'
import Slider from '../components/Slider.jsx'

export default class Overlay extends Component {
  constructor(props) {
    super(props)
  }

  //////////////////////////////////////////////////////// RENDER
  
  render() {
    const {
      overlay,
      handleRandomizeModule,
      currentOverlayCollection,
      handleTabClickOverlay,
      overlayOpacity,
      handleOverlayOpacity,
      handleChangeOverlay
    } = this.props

    return <div className="moduleContainer">
      <M_ModuleHeader
        title={overlay.moduleName}
        moduleType='Overlay'
        handleRandomizeModule={handleRandomizeModule}
      />
      <div className="module__content">
        <TabImageSet
          options = {overlay.preset}
          value = {overlay.currentCollection}
          handleClick = {handleTabClickOverlay}
          tabBackgrounds={overlay.tabBackgrounds}
        />
        {/* <div className="btn--secondary" onClick={handleChangeOverlay}>Randomize overlay</div> */}
        <Slider
          title='Opacity'
          type="range"
          min="0"
          max="255"
          value={overlay.opacity}
          handleChange={handleOverlayOpacity}
        />
      </div>
    </div>
  }
}
