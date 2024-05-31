import React, { PureComponent } from 'react'

export default class M_NumberInput extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { value, handleChange, object } = this.props

    return (
      // <div className='input'>
        <input
          type="number"
          min={object.min}
          max={object.max}
          className="A_NumberInput"
          value={value}
          placeholder="Type a number…"
          onChange={handleChange}
        />
      // </div>
    )
  }
}