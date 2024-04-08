import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import HeaderModule from '../components/HeaderModule.jsx'
import TabButtonSet from '../components/TabButtonSet.jsx'
import Input from '../components/Input.jsx'
import ColorPicker from './background/ColorPicker.jsx'

export default class Text1 extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: this.props.text1.text,
      color: this.props.text1.color
    }
  }

  handleInputChange = (event) => {
    const type = 'text'
    const inputValue = event.target.value
    this.props.setText1Store(type, inputValue)
    this.setState({
      value: inputValue
    });
  }

  handleChange = (object, value) => {
    this.props.setText1Store(object, value)
      .then((color) => {
        this.setState({
          color: color[0]
        })
      }
    )
  }

  //////////////////////////////////////////////////////// RENDER
  
  render() {
    const { text1 } = this.props

    return <div className="ModuleContainer">
      <HeaderModule
        title={text1.moduleName}
        // randomize={}
      />
      <div className="ModuleContent">
        <Input
          value={this.state.value}
          handleChange={this.handleInputChange}
          />
        <ColorPicker
          // alpha={false}
          object='SolidColor'
          color={text1.color}
          handleChange={this.handleChange}
          key='ColorPicker'
        />
      </div>
    </div>
  }
}
