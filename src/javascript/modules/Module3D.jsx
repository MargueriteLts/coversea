import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import HeaderModule from '../components/HeaderModule.jsx'
import DropDown from '../components/DropDown.jsx'
// import ColorPicker from './background/ColorPicker.jsx'

export default class Module3D extends Component {
  constructor(props) {
    super(props)

    this.state = {
      current3DType: this.props.module3D.current3DType
    }
  }

  handleRandomize = () => {
    this.props.set3DStore('randomize')
  }

  handleDropDownClick = (type) => {
    this.props.set3DStore('CurrentTabChange', type)

    this.setState({
      current3DType: type
    })
  }
  
  render() {
    const { module3D } = this.props

    return <div className="ModuleContainer">
      <HeaderModule
        title={module3D.moduleName}
      />
      <div className="ModuleContent flexRow">
        <DropDown
          options={module3D.options}
          value={this.state.current3DType}
          handleClick={this.handleDropDownClick}
        />
        <div className="Button" onClick={this.handleRandomize}>Randomize 3D</div>
      </div>
    </div>
  }
}
