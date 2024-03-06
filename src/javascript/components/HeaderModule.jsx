import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// import ButtonPrimary_Randomize from './ButtonPrimary_Randomize'

export default class Image extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { title } = this.props

    return <div className="ModuleHeader">
      <div className="ModuleTitle">
        {title}
      </div>
      {/* <ButtonPrimary_Randomize
        randomize={randomize}
      /> */}
    </div>
  }
}
