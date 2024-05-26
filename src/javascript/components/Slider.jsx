import React, { PureComponent } from 'react'

export default class Slider extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { min, max, value, handleChange } = this.props

    return (
      <div className='slider'>
        <input
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