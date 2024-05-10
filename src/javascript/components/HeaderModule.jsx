import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// import ButtonPrimary_Randomize from './ButtonPrimary_Randomize'

export default class Image extends Component {
  constructor(props) {
    super(props)
  }

  RandomizeModule = () => {
    // const container = document.getElementById('reactComponentRoot')
    // const generatorName = container.dataset.generator
    // window.resetSketch()
    const { moduleType } = this.props

    this.props.randomizeModuleStore(moduleType)
  }

  render() {
    const { title } = this.props

    return <div className="module__header">
      <div className="module__title">
        {title}
      </div>
      <div className="btn--primary" onClick={this.RandomizeModule}>Randomize</div>
    </div>
  }
}
