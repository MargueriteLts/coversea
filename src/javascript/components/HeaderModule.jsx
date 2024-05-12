import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// import ButtonPrimary_Randomize from './ButtonPrimary_Randomize'

export default class Image extends Component {
  constructor(props) {
    super(props)
  }

  // randomizeModule = () => {
  //   const { moduleType } = this.props
  //   this.props.randomizeModuleStore(moduleType)
  // }

  render() {
    const { title, randomizeModule } = this.props

    return <div className="module__header">
      <div className="module__title">
        {title}
      </div>
      <div className="btn--primary" onClick={randomizeModule}>Randomize</div>
    </div>
  }
}
