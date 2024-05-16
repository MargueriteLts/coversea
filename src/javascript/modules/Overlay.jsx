import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import HeaderModule from '../components/HeaderModule.jsx'
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
      <HeaderModule
        title={overlay.moduleName}
        moduleType='Overlay'
        handleRandomizeModule={handleRandomizeModule}
      />
      <div className="moduleContent">
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
