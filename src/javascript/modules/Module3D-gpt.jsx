import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import HeaderModule from '../components/HeaderModule.jsx'
import Dropdown from '../components/DropDown.jsx'
// import ColorPicker from './background/ColorPicker.jsx'

export default class Module3D extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  handleClick = () => {
    this.props.set3DStore('randomize')
  }
  
  render() {
    const { module3D } = this.props

    return <div className="ModuleContainer">
      <HeaderModule
        title={module3D.moduleName}
      />
      <div className="ModuleContent flexRow">
        <Dropdown
          options={module3D.options}
        />
        <div className="Button" onClick={this.handleClick}>Randomize 3D</div>
      </div>
    </div>
  }
}
