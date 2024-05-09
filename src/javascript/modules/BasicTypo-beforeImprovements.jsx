import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import HeaderModule from '../components/HeaderModule.jsx'
import TabButtonSet from '../components/TabButtonSet.jsx'
import Input from '../components/Input.jsx'
import ColorPicker from './background/ColorPicker.jsx'

export default class BasicTypo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      valueMainText: this.props.basictypo.mainText,
      valueTextarea: this.props.basictypo.textarea,
      color: this.props.basictypo.color
    }
  }

  handleInputChange = (event) => {
    const type = 'mainText'
    const inputValue = event.target.value
    this.props.setBasicTypoStore(type, inputValue)
    this.setState({
      valueMainText: inputValue
    });
  }

  handleTextareaChange = (event) => {
    const type = 'textarea'
    const textareaValue = event.target.value
    this.props.setBasicTypoStore(type, textareaValue)
    this.setState({
      valueTextarea: textareaValue
    })
  }

  handleChange = (object, value) => {
    this.props.setBasicTypoStore(object, value)
      .then((color) => {
        this.setState({
          color: color[0]
        })
      }
    )
  }

  //////////////////////////////////////////////////////// RENDER
  
  render() {
    const { basictypo } = this.props

    return <div className="ModuleContainer">
      <HeaderModule
        title={basictypo.moduleName}
        // randomize={}
      />
      <div className="ModuleContent flexColumn">
        <div className="mainText">
          <div><p>Main text</p></div>
          <Input
            value={this.state.valueMainText}
            handleChange={this.handleInputChange}
          />
          <ColorPicker
            // alpha={false}
            object='SolidColor'
            color={basictypo.color}
            handleChange={this.handleChange}
            key='ColorPicker'
          />
        </div>
        { basictypo.dopText
          ? <label>
              Other text
              <textarea
                rows={3}
                cols={40}
                value={this.state.valueTextarea}
                onChange={this.handleTextareaChange}
              />
            </label>
            : null
        }
      </div>
    </div>
  }
}
