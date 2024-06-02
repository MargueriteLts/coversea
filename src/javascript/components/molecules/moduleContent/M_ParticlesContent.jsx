import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import M_Control from '../controls/M_Control.jsx'
import M_Select from '../M_Select.jsx'

export default class Particles extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // tabsLock: this.props.vinyl.locked,
      solidColorLock: this.props.particles.colorLocked,
      quantityLock: this.props.particles.quantityLocked
    }
  }

  handleToggle = (item, setStore) => {
    
    
    // if (item == 'lockTabs') {
    //   setStore(item, !this.state.tabsLock)
    //   this.setState({
    //     tabsLock: !this.state.tabsLock
    //   })
    if (item == 'lockColor') {
      setStore(item, !this.state.solidColorLock)
      this.setState({
        solidColorLock: !this.state.solidColorLock
      })
    }
    if (item == 'lockQuantity') {
      setStore(item, !this.state.quantityLock)
      this.setState({
        quantityLock: !this.state.quantityLock
      })
    }
  }

  render() {
    const {
      particles,
      setParticlesStore,
      handleDropDownClickParticles,
      handleParticlesQuantity,
      handleParticlesColor
    } = this.props

    return (
      <div className="M_ParticlesContent">

        <div className="content_Column">
          <M_Select
            options={particles.options}
            value={particles.currentParticlesType}
            handleClick={handleDropDownClickParticles}
          />
        </div>
        
        <div className="content_Column">
          <M_Control
            orientation="row"
            controlType='ColorPicker'
            title='Particles color'
          //lock
            isLocked={this.state.solidColorLock}
            setStore={setParticlesStore}
            item='lockColor'
            handleToggle={this.handleToggle}
          //data
            data={particles.color}
            object='SolidColor'
            handleChange={handleParticlesColor}
            type='AllColorPicker'
          />
          <M_Control
            orientation="row"
            controlType='Slider'
            isFullWidth={true}
            hasTitle={true}
            title='Quantity'
          //lock
            isLocked={this.state.quantityLock}
            setStore={setParticlesStore}
            item='lockQuantity'
            handleToggle={this.handleToggle}
          //data
            data={particles.sliderValue}
            handleChange={handleParticlesQuantity}
            min={particles.min}
            max={particles.max}
          />
        </div>
      </div>
    )
  }
}
