import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class ButtonPrimary_Randomize extends Component {
  constructor(props) {
    super(props)
  }

  handleClick = () => {
    this.props.randomize()
  }

  render() {
    return <div className="ButtonPrimary" onClick={this.handleClick}>Randomize</div>
  }
}
