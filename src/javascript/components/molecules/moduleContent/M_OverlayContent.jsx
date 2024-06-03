import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import M_Control from '../controls/M_Control.jsx'

export default class M_OverLayContent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tabsLock: this.props.overlay.locked,
      opacityLock: this.props.overlay.opacityLock,
    }
  }

  handleToggle = (item, setStore) => {
    
    if (item == 'lockTabs') {
      setStore(item, !this.state.tabsLock)
      this.setState({
        tabsLock: !this.state.tabsLock
      })
    }
    if (item == 'lockOpacity') {
      setStore(item, !this.state.opacityLock)
      this.setState({
        opacityLock: !this.state.opacityLock
      })
    }
  };

  //////////////////////////////////////////////////////// RENDER
  
  render() {
    const {
      overlay,
      handleTabClickOverlay,
      handleOverlayOpacity,
      setOverlayStore
    } = this.props

    return <div className="M_OverLayContent">

        <M_Control
          orientation='column'
          hasTitle={true}
          title='Choose an image collection'
          controlType='TabImageSet'
        //lock
          isLocked={this.state.tabsLock}
          setStore={setOverlayStore}
          item='lockTabs'
          handleToggle={this.handleToggle}
        //data
          data={overlay.currentCollection}
          options = {overlay.preset}
          handleChange = {handleTabClickOverlay}
          images={overlay.tabBackgrounds}
        />

        <M_Control
          orientation="row"
          controlType='SliderOpacity'
          isHalfWidth={true}
          hasTitle={true}
          title='Overlay opacity'

          isLocked={this.state.opacityLock}
          setStore={setOverlayStore}
          item='lockOpacity'
          handleToggle={this.handleToggle}

          data={overlay.opacity}
          handleChange={handleOverlayOpacity}
        />
    </div>
  }
}
