import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import HeaderModule from '../components/HeaderModule.jsx'

export default class Background extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const { moduleName } = this.props

    return <div className="ModuleBackground">
      <HeaderModule
        title={moduleName}
      />
    </div>
  }
}
