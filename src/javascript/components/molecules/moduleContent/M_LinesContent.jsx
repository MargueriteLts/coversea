import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import M_Control from '../controls/M_Control.jsx'

export default class M_LinesContent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // tabsLock: this.props.vinyl.locked,
      weightLock : this.props.lines.strokeWeightLocked,
      solidColorLock: this.props.lines.colorLocked
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
  }
  
  render() {
    const {
      lines,
      handleLinesColor,
      handleLinesSize,
      setLinesStore
    } = this.props

    return <div className="M_LinesContent">
      {/* <div className='content_Column'></div> */}
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
