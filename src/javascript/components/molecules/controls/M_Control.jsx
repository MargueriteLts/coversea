import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import IconToggle from '../../buttons/IconToggle.jsx'
import ColorPicker from '../../ColorPicker.jsx'

export default class M_Control extends Component {
  constructor(props) {
    super(props)
  }

  renderControlType() {
    const {controlType} = this.props

    const {object, color, handleChange, type} = this.props

    if (controlType == 'SolidColor') {
      return (
        <ColorPicker
          object={object}
          color={color}
          handleChange={handleChange}
          key={type}
        />
      )
    }
  }

  render() {
    const { isLocked, setStore, item, handleToggle, title } = this.props

    return <div className="M_Control">
      <IconToggle
        isLocked={isLocked}
        setStore={setStore}
        item={item}
        handleToggle={handleToggle}
      />
      {title}
      {this.renderControlType()}
    </div>
  }
}
