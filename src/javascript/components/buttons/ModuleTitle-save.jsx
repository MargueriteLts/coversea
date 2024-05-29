import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import icons from '../../loadIcons';

export default class ModuleTitle extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { title, handleClick, isOpen } = this.props

    return <button className="module__title" onClick={handleClick}>
      {isOpen ? (
        <img src={icons["AngleUp"]} alt="" />
      ) : (
        <img src={icons["AngleDown"]} alt="" />
      )}{title}
    </button>
  }
}