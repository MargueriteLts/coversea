import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import HeaderModule from '../components/HeaderModule.jsx'
import TabButtonSet from '../components/TabButtonSet.jsx'
import Slider from '../components/Slider.jsx'

export default class Vinyl extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentVinylType: this.props.vinyl.currentVinylType,
      sliderValue: this.props.vinyl.sliderValue,
      sliderOpacity: this.props.vinyl.sliderOpacity
    }
  }

  //////////OK je comprends pas comment marche la promise, pcq on a bosse avec la color, mais la jai une tab et 2 sliders et je comprends pas quelles donnees je dois peredat

  handleTabClick = (type) => {
    this.props.setVinylStore('CurrentTabChange', type)

    // this.setState({
    //   currentVinylType: type
    // })
      .then(([type]) => {
        this.setState({
          currentVinylType: type
        })
      })
  }

  handleInput = (e) => {
    const value = e.target.value
    this.props.setVinylStore('size', value)
    // this.setState({sliderValue: e.target.value})
      .then(([newValue]) => {
        this.setState({
          sliderValue: newValue
        })
      })
  }

  handleOpacity = (e) => {
    const value = e.target.value
    this.props.setVinylStore('opacity', value)
    // this.setState({sliderOpacity: e.target.value})
      .then(([newValue]) => {
        this.setState({
          sliderOpacity: newValue
        })
      })
  }

  //////////////////////////////////////////////////////// RENDER
  
  render() {
    const { vinyl } = this.props

    return <div className="module__container">
      <HeaderModule
        title={vinyl.moduleName}
        // randomize={}
      />
      <div className="module__content">
        <TabButtonSet
          options={vinyl.preset}
          value={this.state.currentVinylType}
          handleClick={this.handleTabClick}
        />
        <Slider
          title='Size'
          type="range"
          min="10"
          max="100"
          value={this.state.sliderValue}
          handleChange={this.handleInput}
        />
        <Slider
          title='Opacity'
          type="range"
          min="0"
          max="255"
          value={this.state.sliderOpacity}
          handleChange={this.handleOpacity}
        />
        {/* <div className="Button" onClick={this.handleClick}>Randomize image</div> */}
      </div>
    </div>
  }
}
