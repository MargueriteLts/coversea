import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'

export default class A_DropDownButton extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { text, isOn, handleClick } = this.props

    const classes = classnames({
      dropdown__button: true,
      active: isOn
    })

    // const classes = classnames({
    //   TabButton: true,
    //   active: isOn
    // })

    return (
      // <div className={classes} onClick={handleClick}>
      <div className={classes} onClick={handleClick}>
        {text}
      </div>
    )
  }
}