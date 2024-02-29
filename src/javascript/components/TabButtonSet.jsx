import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import TabButton from './TabButton.jsx'

export default class TabButtonSet extends Component {
  constructor(props) {
    super(props)
  }

  handleChange = (value) => {
    const { property, handleChange } = this.props
    handleChange(property, value)
  }

  render() {
    const { options, value } = this.props
    const buttonElements = []

    options.forEach((option, i) => {
      buttonElements.push(
        <TabButton
          text={option}
          isOn={option === value}
          handleClick={() => this.handleChange(option)}
          key={i}
        />
      )
    })

    return (
      <div className="TabButtonSet">
        {buttonElements}
      </div>
    )
  }
}