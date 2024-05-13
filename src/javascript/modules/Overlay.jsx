import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import HeaderModule from '../components/HeaderModule.jsx'
import TabButtonSet from '../components/TabButtonSet.jsx'
import Slider from '../components/Slider.jsx'

export default class Overlay extends Component {
  constructor(props) {
    super(props)

    // this.state = {
    //   currentCollection: this.props.overlay.currentCollection,
    //   opacityValue: this.props.overlay.opacityValue
    // }
  }

  // handleTabClick = (type) => {
  //   this.props.setOverlayStore('CurrentTabChange', type)

  //   this.setState({
  //     currentCollection: type
  //   })
  // }

  // handleClick = () => {
  //   console.log('click');
  //   if (this.state.currentCollection === 'Plastic'){
  //     this.props.setOverlayStore('Plastic')
  //   }
  //   if (this.state.currentCollection === 'Stickers'){
  //     this.props.setOverlayStore('Stickers')
  //   }
  // }

  // handleInput = (e) => {
  //   this.props.setOverlayStore('opacity', e.target.value)
  //   this.setState({opacityValue: e.target.value})
  // }

  //////////////////////////////////////////////////////// RENDER
  
  render() {
    const { overlay, handleRandomizeModule, currentOverlayCollection, handleTabClickOverlay, overlayOpacity, handleOverlayOpacity, handleChangeOverlay } = this.props

    return <div className="module__container">
      <HeaderModule
        title={overlay.moduleName}
        moduleType='Overlay'
        handleRandomizeModule={handleRandomizeModule}
      />
      <div className="module__content">
        <TabButtonSet
          options={overlay.preset}
          value={currentOverlayCollection}
          handleClick={handleTabClickOverlay}
        />
        <div className="btn--secondary" onClick={handleChangeOverlay}>Randomize overlay</div>
        <Slider
          title='Opacity'
          type="range"
          min="0"
          max="255"
          value={overlayOpacity}
          handleChange={handleOverlayOpacity}
        />
      </div>
    </div>
  }
}
