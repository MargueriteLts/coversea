import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class Shapes extends Component {
  constructor(props) {
    super(props)
  }

  handleInput = (e) => {
    this.props.setShapesValue(e.target.value)
  }

  render() {
    return <div className="Shapes">
      <input
        type="range"
        min="10"
        max="60"
        onInput={this.handleInput}
      />
    </div>
  }
}
