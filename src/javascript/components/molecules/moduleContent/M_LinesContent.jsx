import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import M_Control from '../controls/M_Control.jsx'
import M_Select from '../M_Select.jsx'

export default class M_LinesContent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // tabsLock: this.props.vinyl.locked,
      weightLock : this.props.lines.strokeWeightLocked,
      solidColorLock: this.props.lines.colorLocked,
      quantityLock: this.props.lines.quantityLocked
    }
  }

  handleToggle = (item, setStore) => {
    
    
    // if (item == 'lockTabs') {
    //   setStore(item, !this.state.tabsLock)
    //   this.setState({
    //     tabsLock: !this.state.tabsLock
    //   })
    if (item == 'lockWeight') {
      setStore(item, !this.state.weightLock)
      this.setState({
        weightLock: !this.state.weightLock
      })
    }
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
      lines,
      handleLinesColor,
      handleLinesSize,
      setLinesStore,
      handleLinesQuantity,
      handleDropDownLinesTypeClick
    } = this.props
    

    return <div className="M_LinesContent">
      <div className='content_Column'>
        <M_Select
          options={lines.linesTypes}
          value={lines.currentLineType}
          handleClick={handleDropDownLinesTypeClick}
        />
        <M_Control
          orientation="row"
          controlType='Slider'
          isFullWidth={true}
          hasTitle={true}
          title='Quantity'
        //lock
          isLocked={this.state.quantityLock}
          setStore={setLinesStore}
          item='lockQuantity'
          handleToggle={this.handleToggle}
        //data
          data={lines.sliderValueQuantity}
          handleChange={handleLinesQuantity}
          min='1'
          max={lines.maxQuantity}
        />
      </div>
      <div className='content_Column'>
        <M_Control
          orientation="row"
          controlType='ColorPicker'
          title='Lines color'
        //lock
          isLocked={this.state.solidColorLock}
          setStore={setLinesStore}
          item='lockColor'
          handleToggle={this.handleToggle}
        //data
          data={lines.color}
          object='SolidColor'
          handleChange={handleLinesColor}
          type='AllColorPicker'
        />
        <M_Control
          orientation="row"
          controlType='Slider'
          isFullWidth={true}
          hasTitle={true}
          title='Thickness'
        //lock
          isLocked={this.state.weightLock}
          setStore={setLinesStore}
          item='lockWeight'
          handleToggle={this.handleToggle}
        //data
          data={lines.strokeWeight}
          handleChange={handleLinesSize}
          min={lines.min}
          max={lines.max}
        />
      </div>
    </div>
  }
}
