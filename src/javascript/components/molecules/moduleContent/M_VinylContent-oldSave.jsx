import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import M_Control from '../controls/M_Control.jsx'
//import M_ControlWithSubControl from '../controls/M_TabSetWithSubControl.jsx'

export default class M_VinylContent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tabsLock: this.props.vinyl.locked,
      sizeLock : this.props.vinyl.sizeLock,
      opacityLock: this.props.vinyl.opacityLock,
      tintColorLock: this.props.vinyl.tintColorLock
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
    if (item == 'lockTintColor') {
      setStore(item, !this.state.tintColorLock)
      this.setState({
        tintColorLock: !this.state.tintColorLock
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
      handleChangeVinylTintColor,
      setVinylStore
    } = this.props


    return <div className="vinyl-content">
      <div className='content-row'>
        <M_Control
          hasTitle={true}
          title='Vinyl Disc'
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
        <M_Control
          orientation="row"
          controlType='ColorPicker'
          hasTitle={true}
          title='Tint color'

          isLocked={this.state.tintColorLock}
          setStore={setVinylStore}
          item='lockTintColor'
          handleToggle={this.handleToggle}

          data={vinyl.tintColor}
          object='TintColor'
          handleChange={handleChangeVinylTintColor}
          type='AllColorPicker'
        />

      </div>
      <div className='content-row'>
        <M_Control
          orientation="row"
          controlType='Slider'
          isFullWidth={true}
          hasTitle={true}
          title='Vinyl size'

          isLocked={this.state.sizeLock}
          setStore={setVinylStore}
          item='lockSize'
          handleToggle={this.handleToggle}
          
          data={vinyl.size}
          handleChange={handleVinylSize}
          min="20"
          max="100"
        />
        <M_Control
          orientation="row"
          controlType='SliderOpacity'
          isFullWidth={true}
          hasTitle={true}
          title='Vinyl opacity'

          isLocked={this.state.opacityLock}
          setStore={setVinylStore}
          item='lockOpacity'
          handleToggle={this.handleToggle}

          data={vinyl.opacity}
          handleChange={handleVinylOpacity}
        />
      </div>
    </div>
  }
}
