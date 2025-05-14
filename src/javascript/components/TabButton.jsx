import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'

export default class TabButton extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { text, isOn, handleClick } = this.props

    const classes = classnames({
      "tab-button": true,
      active: isOn
    })

    return (
      <div className={classes} onClick={handleClick}>
        {text}
      </div>
    )
  }
}