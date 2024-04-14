import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import HeaderModule from '../components/HeaderModule.jsx'
import TabButtonSet from '../components/TabButtonSet.jsx'

export default class Vinyl extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentVinylType: this.props.vinyl.currentVinylType,
      sliderValue: this.props.vinyl.preset.sliderValue,
      sliderOpacity: this.props.vinyl.preset.sliderOpacity
    }
  }

  handleTabClick = (type) => {
    this.props.setVinylStore('CurrentTabChange', type)

    this.setState({
      currentVinylType: type
    })
  }

  handleInput = (e) => {
    this.props.setVinylStore('size', e.target.value)
    this.setState({sliderValue: e.target.value})
  }

  handleOpacity = (e) => {
    // console.log('yes');
    this.props.setVinylStore('opacity', e.target.value)
    this.setState({sliderOpacity: e.target.value})
  }

  //////////////////////////////////////////////////////// RENDER
  
  render() {
    const { vinyl } = this.props

    return <div className="ModuleContainer">
      <HeaderModule
        title={vinyl.moduleName}
        // randomize={}
      />
      <div className="ModuleContent">
        <TabButtonSet
          options={vinyl.preset}
          value={this.state.currentVinylType}
          handleClick={this.handleTabClick}
        />
        <input
          type="range"
          min="10"
          max="100"
          value={this.state.sliderValue}
          onInput={this.handleInput}
        />
        <input
          type="range"
          min="0"
          max="255"
          value={this.state.sliderOpacity}
          onInput={this.handleOpacity}
        />
        {/* <div className="Button" onClick={this.handleClick}>Randomize image</div> */}
      </div>
    </div>
  }
}
