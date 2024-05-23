import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class M_Control extends Component {
  constructor(props) {
    super(props)
  }

  renderControlType() {
    const {controlType} = this.props

    const {text, object, color, handleChange, key} = this.props

    if (controlType == 'SolidColor') {
    <ColorPicker
        text={text}
        object={object}
        color={color}
        handleChange={handleChange}
        key={key}
      />
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
