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
    return <div className="ModuleContainer">
      <HeaderModule
        title='Random Image'
        // randomize={}
      />
      <div className="ModuleContent">
        <div className="Button" onClick={this.handleClick}>Randomize Shoe</div>
      </div>
    </div>
  }
}
