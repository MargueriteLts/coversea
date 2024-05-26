import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import HeaderModule from '../components/HeaderModule.jsx'
import DropDown from '../components/molecules/M_Select.jsx'
// import ColorPicker from './background/ColorPicker.jsx'

export default class Module3D extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const { module3D, handleRandomizeModule, handleDropDownClickModule3D } = this.props

    return <div className="moduleContainer">
      <HeaderModule
        title={module3D.moduleName}
        moduleType='Module3D'
        handleRandomizeModule={handleRandomizeModule}
      />
      <div className="moduleContent">
        <DropDown
          options={module3D.types}
          value={module3D.current3DType}
          handleClick={handleDropDownClickModule3D}
        />
        {/* <div className="btn--secondary" onClick={this.handleRandomize}>Randomize 3D</div> */}
      </div>
    </div>
  }
}
