import React, { PureComponent } from 'react'

export default class M_NumberInput extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { value, handleChange } = this.props

    return (
      // <div className='input'>
        <input
          type="number"
          min="0"
          max="100"
          className="A_NumberInput"
          value={value}
          placeholder="Type a number…"
          onChange={handleChange}
        />
      // </div>
    )
  }
}