import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import A_ToggleIcon from '../../buttons/A_ToggleIcon.jsx'

export default class M_ToggleIconSet extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { options, value, handleClick } = this.props
    const buttonElements = []

    Object.keys(options).forEach((key, i) => {

      buttonElements.push(
        <A_ToggleIcon
          icon={options[key]}
          isOn={options[key] === value}
          handleClick={() => handleClick(options[key])}
          key={i}
        />
      )
    })

    return (
      <div className="toggle-icon-set">
        {buttonElements}
      </div>
    )
  }
}