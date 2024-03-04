import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import TabButton from './TabButton.jsx'

export default class TabButtonSet extends Component {
  constructor(props) {
    super(props)
  }

  // handleClick = (option) => {
  //   const { option, handleClick } = this.props
  //   handleClick(option)
  // }

  // renderTitle() {
  //   const { options, title } = this.props

  //   options.forEach((option) => {
  //     return title
  //   })
  // }

  render() {
    const { title, options, value, handleClick } = this.props
    const buttonElements = []

    options.forEach((option, i) => {
      buttonElements.push(
        <TabButton
          text={option}
          isOn={option === value}
          handleClick={() => handleClick(option)}
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