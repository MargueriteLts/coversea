import React, { PureComponent } from 'react'

export default class Input extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { value, handleChange, title } = this.props

    return (
      <div className='input'>
        {title}
        <input className="input__entry" value={value} onChange={handleChange} ></input>
      </div>
    )
  }
}