import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import M_Control from '../controls/M_Control.jsx'

export default class M_VinylContent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tabsLock: this.props.vinyl.locked,
      sizeLock : this.props.vinyl.sizeLock,
      opacityLock: this.props.vinyl.opacityLock
    }
  }

  handleToggle = (item, setStore) => {
    
    if (item == 'lockTabs') {
      setStore(item, !this.state.tabsLock)
      this.setState({
        tabsLock: !this.state.tabsLock
      })
    }
    if (item == 'lockSize') {
      setStore(item, !this.state.sizeLock)
      this.setState({
        sizeLock: !this.state.sizeLock
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
      vinyl,
      handleTabClickVinyl,
      handleVinylSize,
      handleVinylOpacity,
      setVinylStore
    } = this.props


    return <div className="M_VinylContent">
      <M_Control
        orientation="column"
        controlType='TabImageSet'
        title='Vinyl size'
      //lock
        isLocked={this.state.tabsLock}
        setStore={setVinylStore}
        item='lockTabs'
        handleToggle={this.handleToggle}
      //data
        data={vinyl.currentVinylType}
        options = {vinyl.preset}
        handleChange = {handleTabClickVinyl}
        images={vinyl.tabBackgrounds}
      />
      <div className='content_row'>
        <M_Control
          orientation="row"
          controlType='Slider'
          title='Vinyl size'

          isLocked={this.state.sizeLock}
          setStore={setVinylStore}
          item='lockSize'
          handleToggle={this.handleToggle}
          
          data={vinyl.size}
          handleChange={handleVinylSize}
          min="10"
          max="100"
        />
        <M_Control
          orientation="row"
          isLocked={this.state.opacityLock}
          setStore={setVinylStore}
          data={vinyl.opacity}
          handleChange={handleVinylOpacity}
          item='lockOpacity'
          handleToggle={this.handleToggle}
          title='Vinyl opacity'
          controlType='SliderOpacity'
        />
      </div>
    </div>
  }
}
