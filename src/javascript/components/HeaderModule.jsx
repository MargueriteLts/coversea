import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import RandomizeButton from './buttons/RandomizeButton.jsx'

export default class Image extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { title, handleRandomizeModule, moduleType } = this.props

    return <div className="module__header">
      <div className="module__title">
        {title}
      </div>
      <RandomizeButton
        onClick={() => this.props.handleRandomizeModule(moduleType)}
        iconName='Dice.svg'
        text='Randomize'
      />
    </div>
  }
}
