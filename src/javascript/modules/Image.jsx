import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import HeaderModule from '../components/HeaderModule.jsx'

export default class Image extends Component {
  constructor(props) {
    super(props)
  }

  handleClick = () => {
    this.props.setImageValue()
  }

  render() {
    const { randomizeModuleStore } = this.props
    
    return <div className="module__container">
      <HeaderModule
        title='Random Image'
        moduleType='Image'
        randomizeModuleStore={randomizeModuleStore}
      />
      <div className="module__content">
        <div className="btn-secondary" onClick={this.handleClick}>Randomize Shoe</div>
      </div>
    </div>
  }
}
