import React, { Component } from 'react'
import ReactDOM from 'react-dom'


import M_Control from '../controls/M_Control.jsx'
import M_Select from '../M_Select.jsx'

export default class Shapes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // tabsLock: this.props.vinyl.locked,
      solidColorLock: this.props.shapes.settings.colorLocked,
      sizeLock: this.props.shapes.settings.sizeLocked
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
    if (item == 'lockSize') {
      setStore(item, !this.state.sizeLock)
      this.setState({
        sizeLock: !this.state.sizeLock
      })
    }
  }
  
  render() {
    const {
      shapes,
      handleDropDownClickShapes,
      handleShapesSize,
      handleShapesColor,
      setShapesStore
    } = this.props


    return <div className="M_ShapesContent">
      
      <div className="content_Column">
        <M_Select
          options={shapes.types}
          value={shapes.currentType}
          handleClick={handleDropDownClickShapes}
        />
      </div>

      <div className="content_Column">
        <M_Control
          orientation="row"
          controlType='Slider'
          isFullWidth={true}
          hasTitle={true}
          title='Size'
        //lock
          isLocked={this.state.sizeLock}
          setStore={setShapesStore}
          item='lockSize'
          handleToggle={this.handleToggle}
        //data
          data={shapes.settings.sliderValue}
          handleChange={handleShapesSize}
          min='2'
          max='74'
        />
        { shapes.settings.gradient
          ?
          null :
          <M_Control
            orientation="row"
            controlType='ColorPicker'
            title='Shapes color'
          //lock
            isLocked={this.state.solidColorLock}
            setStore={setShapesStore}
            item='lockColor'
            handleToggle={this.handleToggle}
          //data
            data={shapes.settings.color}
            object='SolidColor'
            handleChange={handleShapesColor}
            type='AllColorPicker'
          />
        }
      </div>
    </div>
  }
}
