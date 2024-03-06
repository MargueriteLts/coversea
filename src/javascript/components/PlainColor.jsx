import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class PlainColor extends Component {
  constructor(props) {
    super(props)
  }

  handleClick = () => {
    this.props.setBackgroundStore('PlainColor')
    console.log('click')
  }

  render() {
    return <div className="PlainColor">
      <div className="Button" onClick={this.handleClick}>Randomize background color</div>
    </div>
  }
}
