import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import HeaderModule from '../components/HeaderModule.jsx'
import TabButtonSet from '../components/TabButtonSet.jsx'
import Slider from '../components/Slider.jsx'

export default class Vinyl extends Component {
  constructor(props) {
    super(props)

    // this.state = {
    //   currentVinylType: this.props.vinyl.currentVinylType,
    //   sliderValue: this.props.vinyl.sliderValue,
    //   sliderOpacity: this.props.vinyl.sliderOpacity
    // }
  }

  // handleTabClick = (type) => {
  //   this.props.setVinylStore('CurrentTabChange', type)

  //     .then(([type]) => {
  //       this.setState({
  //         currentVinylType: type
  //       })
  //     })
  // }

  // handleInput = (e) => {
  //   const value = e.target.value
  //   this.props.setVinylStore('size', value)

  //     .then(([newValue]) => {
  //       this.setState({
  //         sliderValue: newValue
  //       })
  //     })
  // }

  // handleOpacity = (e) => {
  //   const value = e.target.value
  //   this.props.setVinylStore('opacity', value)
    
  //     .then(([newValue]) => {
  //       this.setState({
  //         sliderOpacity: newValue
  //       })
  //     })
  // }

  //////////////////////////////////////////////////////// RENDER
  
  render() {
    const { vinyl, handleRandomizeModule, currentVinylType, handleTabClickVinyl, vinylSize, handleChangeVinylSize, vinylOpacity, handleVinylOpacity } = this.props

    return <div className="module__container">
      <HeaderModule
        title={vinyl.moduleName}
        handleRandomizeModule={handleRandomizeModule}
        moduleType='Vinyl'
      />
      <div className="module__content">
        <TabButtonSet
          options={vinyl.preset}
          value={currentVinylType}
          handleClick={handleTabClickVinyl}
        />
        <Slider
          title='Size'
          type="range"
          min="10"
          max="100"
          value={vinylSize}
          handleChange={handleChangeVinylSize}
        />
        <Slider
          title='Opacity'
          type="range"
          min="0"
          max="255"
          value={vinylOpacity}
          handleChange={handleVinylOpacity}
        />
        {/* <div className="Button" onClick={this.handleClick}>Randomize image</div> */}
      </div>
    </div>
  }
}
