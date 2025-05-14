import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'

export default class TabImage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { text, isOn, handleClick, imageLink } = this.props

    const classes = classnames({
      "tab-image": true,
      active: isOn
    })

    return (
      <div className={classes} onClick={handleClick}>
        <img src={imageLink} className="tab-image__background" />
        <span className="tab-image__text">{text}</span>
      </div>
    )
  }
}