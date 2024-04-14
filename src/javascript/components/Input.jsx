import React, { PureComponent } from 'react'

export default class MyInput extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { value, handleChange } = this.props

    return (
      <input className="txtInput" value={value} onChange={handleChange} ></input>
    )
  }
}