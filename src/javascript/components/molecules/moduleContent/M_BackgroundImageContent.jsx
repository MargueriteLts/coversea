import React, { Component } from 'react'
import ReactDOM from 'react-dom'


import M_Control from '../controls/M_Control.jsx'

export default class BackgroundImage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tabsLock: this.props.backgroundImage.locked,
      opacityLock: this.props.backgroundImage.opacityLock,
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
      backgroundImage,
      handleTabClickBackgroundImage,
      handleBackgroundImageOpacity,
      setBackgroundImageStore
    } = this.props

    return <div className="M_BackgroundImageContent">
        <M_Control
          orientation='column'
          hasTitle={true}
          title='Choose a photo collection'
          controlType='TabImageSet'
        //lock
          isLocked={this.state.tabsLock}
          setStore={setBackgroundImageStore}
          item='lockTabs'
          handleToggle={this.handleToggle}
        //data
          data={backgroundImage.currentBackgroundImageCollection}
          options = {backgroundImage.preset}
          handleChange = {handleTabClickBackgroundImage}
          images={backgroundImage.tabBackgrounds}
        />

        <M_Control
          orientation="row"
          controlType='SliderOpacity'
          isHalfWidth={true}
          hasTitle={true}
          title='Image opacity'

          isLocked={this.state.opacityLock}
          setStore={setBackgroundImageStore}
          item='lockOpacity'
          handleToggle={this.handleToggle}

          data={backgroundImage.opacity}
          handleChange={handleBackgroundImageOpacity}
        />
    </div>
  }
}
