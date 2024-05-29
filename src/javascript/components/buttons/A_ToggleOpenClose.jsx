import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import icons from '../../loadIcons';

export default class A_ToggleOpenClose extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { title, handleClick, isOpen, hasIconRight, hasIconLeft, style, type } = this.props

    return <div className={style} onClick={handleClick}>
      {hasIconLeft ? (
      isOpen ? (
        <img src={icons["AngleUp"]} alt="" />
      ) : (
        <img src={icons["AngleDown"]} alt="" />
      )
    ) : null}
      
      {title}

      {hasIconRight ? (
      isOpen ? (
        <img src={icons["AngleUp"]} alt="" />
      ) : (
        <img src={icons["AngleDown"]} alt="" />
      )
    ) : null}

    </div>
  }
}