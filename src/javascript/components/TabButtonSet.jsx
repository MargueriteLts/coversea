import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import TabButton from './TabButton.jsx'

export default class TabButtonSet extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { options, value, handleClick } = this.props
    const buttonElements = []

    Object.keys(options).forEach((key, i) => {
      buttonElements.push(
        <TabButton
          text={options[key].text}
          isOn={key === value}
          handleClick={() => handleClick(key)}
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