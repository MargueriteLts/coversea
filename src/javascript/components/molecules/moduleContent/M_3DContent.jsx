import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import M_Select from '../M_Select.jsx'
import M_Control from '../controls/M_Control.jsx'

export default class M_3DContent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      color1Lock: this.props.module3D.color1Locked,
      color2Lock: this.props.module3D.color2Locked,
      sizeLock: this.props.module3D.sizeLocked
    }
  }

  handleToggle = (item, setStore) => {
    
    if (item == 'lockColor1') {
      setStore(item, !this.state.color1Lock)
      this.setState({
        color1Lock: !this.state.color1Lock
      })
    }
    if (item == 'lockColor2') {
      setStore(item, !this.state.color2Lock)
      this.setState({
        color2Lock: !this.state.color2Lock
      })
    }
    if (item == 'lockSize') {
      setStore(item, !this.state.sizeLock)
      this.setState({
        sizeLock: !this.state.sizeLock
      })
    }
  }
  
  render() {
    const { module3D, handleDropDownClickModule3D, set3DStore, handle3DColor, handle3DSize } = this.props

    return <div className="M_3DContent">

        <div className="content-column">
          <M_Select
            options={module3D.types}
            value={module3D.current3DType}
            handleClick={handleDropDownClickModule3D}
          />
        </div>
        <div className="content-column">
          <M_Control
            orientation="row"
            controlType='Slider'
            isFullWidth={true}
            hasTitle={true}
            title='Size'
          //lock
            isLocked={this.state.sizeLock}
            setStore={set3DStore}
            item='lockSize'
            handleToggle={this.handleToggle}
          //data
            data={module3D.sliderValue}
            handleChange={handle3DSize}
            min='1'
            max='10'
          />
          {/*<M_Control
            orientation="row"
            controlType='ColorPicker'
            title='Light 1'
          //lock
            isLocked={this.state.color1Lock}
            setStore={set3DStore}
            item='lockColor1'
            handleToggle={this.handleToggle}
          //data
            data={module3D.color1}
            object='SolidColor1'
            handleChange={handle3DColor}
            type='AllColorPicker'
          />
          <M_Control
            orientation="row"
            controlType='ColorPicker'
            title='Light 2'
          //lock
            isLocked={this.state.color2Lock}
            setStore={set3DStore}
            item='lockColor2'
            handleToggle={this.handleToggle}
          //data
            data={module3D.color2}
            object='SolidColor2'
            handleChange={handle3DColor}
            type='AllColorPicker'
          />*/}
        </div>
    </div>
  }
}
