import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import HeaderModule from '../components/HeaderModule.jsx'
import TabButtonSet from '../components/TabButtonSet.jsx'

export default class Overlay extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentCollection: this.props.overlay.currentCollection,
      sliderValue: this.props.overlay.preset.sliderValue
    }
  }

  handleTabClick = (type) => {
    this.props.setOverlayStore('CurrentTabChange', type)

    this.setState({
      currentCollection: type
    })
  }

  handleClick = () => {
    console.log('click');
    if (this.state.currentCollection === 'Plastic'){
      this.props.setOverlayStore('Plastic')
    }
    if (this.state.currentCollection === 'Stickers'){
      this.props.setOverlayStore('Stickers')
    }
  }

  handleInput = (e) => {
    this.props.setOverlayStore('opacity', e.target.value)
    this.setState({sliderValue: e.target.value})
  }

  //////////////////////////////////////////////////////// RENDER
  
  render() {
    const { overlay } = this.props

    return <div className="ModuleContainer">
      <HeaderModule
        title={overlay.moduleName}
        // randomize={}
      />
      <div className="ModuleContent">
        <TabButtonSet
          options={overlay.preset}
          value={this.state.currentCollection}
          handleClick={this.handleTabClick}
        />
        <div className="Button" onClick={this.handleClick}>Randomize overlay</div>
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
