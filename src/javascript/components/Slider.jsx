import React, { PureComponent } from 'react'

export default class Slider extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { min, max, value, handleChange, title } = this.props

    return (
      <div className='input'>
        {title}
        <input
          className="slider"
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
        ></input>
      </div>
    )
  }
}