import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import RandomizeButton from './buttons/RandomizeButton.jsx'
import ModuleTitle from './buttons/ModuleTitle.jsx'

export default class HeaderModule extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { title, moduleType, handleOpenModule, isOpen } = this.props

    return <div className="module__header">
      <ModuleTitle
        title={title}
        handleClick={handleOpenModule}
        isOpen={isOpen}
      />
      <RandomizeButton
        onClick={() => this.props.handleRandomizeModule(moduleType)}
        iconName='Dice.svg'
        text='Randomize'
      />
    </div>
  }
}
