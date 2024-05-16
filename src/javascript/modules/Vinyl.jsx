import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import HeaderModule from '../components/HeaderModule.jsx'
import TabButtonSet from '../components/TabButtonSet.jsx'
import Slider from '../components/Slider.jsx'
import TabImageSet from '../components/TabImageSet.jsx'

export default class Vinyl extends Component {
  constructor(props) {
    super(props)
  }

  //////////////////////////////////////////////////////// RENDER
  
  render() {
    const { vinyl, handleRandomizeModule, handleTabClickVinyl, handleChangeVinylSize, handleVinylOpacity, currentVinylType } = this.props

    // console.log(vinyl.tabBackgroundImages);

    return <div className="moduleContainer">
      <HeaderModule
        title={vinyl.moduleName}
        handleRandomizeModule={handleRandomizeModule}
        moduleType='Vinyl'
      />
      <div className="moduleContent">
        <TabImageSet
          options = {vinyl.preset}
          value = {vinyl.currentVinylType}
          handleClick = {handleTabClickVinyl}
          tabBackgrounds={vinyl.tabBackgrounds}
        />
        <div className='Sliders'>
          <Slider
            title='Size'
            type="range"
            min="10"
            max="100"
            value={vinyl.sliderValue}
            handleChange={handleChangeVinylSize}
          />
          <Slider
            title='Opacity'
            type="range"
            min="0"
            max="255"
            value={vinyl.sliderOpacity}
            handleChange={handleVinylOpacity}
          />
        </div>
        {/* <div className="Button" onClick={this.handleClick}>Randomize image</div> */}
      </div>
    </div>
  }
}
