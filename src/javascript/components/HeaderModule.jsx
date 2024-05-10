import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// import ButtonPrimary_Randomize from './ButtonPrimary_Randomize'

export default class Image extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { title } = this.props

    return <div className="module__header">
      <div className="module__title">
        {title}
      </div>
    </div>
  }
}
