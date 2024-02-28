import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class ColorBackground extends Component {
  constructor(props) {
    super(props)
  }

  handleClick = () => {
    this.props.setColorValue()
  }

  render() {
    return <div className="PlainColorBackground">
      <div className="Button" onClick={this.handleClick}>Randomize color</div>
    </div>
  }
}
