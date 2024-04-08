import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import HeaderModule from '../components/HeaderModule.jsx'
import TabButtonSet from '../components/TabButtonSet.jsx'

export default class BackgroundImage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentCollection: this.props.backgroundImage.currentCollection,
      sliderValue: this.props.backgroundImage.preset.sliderValue
    }
  }

  handleTabClick = (type) => {
    this.props.setBackgroundImageStore('CurrentTabChange', type)

    this.setState({
      currentCollection: type
    })
  }

  handleClick = () => {
    console.log('click');
    if (this.state.currentCollection === 'NightClub'){
      this.props.setBackgroundImageStore('NightClub')
    }
    if (this.state.currentCollection === 'Cars'){
      this.props.setBackgroundImageStore('Cars')
    }
  }

  handleInput = (e) => {
    this.props.setBackgroundImageStore('opacity', e.target.value)
    this.setState({sliderValue: e.target.value})
  }

  //////////////////////////////////////////////////////// RENDER
  
  render() {
    const { backgroundImage } = this.props

    return <div className="ModuleContainer">
      <HeaderModule
        title={backgroundImage.moduleName}
        // randomize={}
      />
      <div className="ModuleContent">
        <TabButtonSet
          options={backgroundImage.preset}
          value={this.state.currentCollection}
          handleClick={this.handleTabClick}
        />
        <div className="Button" onClick={this.handleClick}>Randomize image</div>
        <input
          type="range"
          min="0"
          max="255"
          value={this.state.sliderValue}
          onInput={this.handleInput}
        />
      </div>
    </div>
  }
}
