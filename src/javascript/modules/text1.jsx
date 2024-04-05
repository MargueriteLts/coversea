import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import HeaderModule from '../components/HeaderModule.jsx'
import TabButtonSet from '../components/TabButtonSet.jsx'

export default class Vinyl extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  handleInputChange = (event) => {
    const fontsList = ["poppins", "fasthand", "NHU", "IMVCR", "STATION", "ESENIN"]
    const inputValue = event.target.value.slice(0, 22);
    const fonts = this.state.fonts.slice();

    for (let i = 0; i < inputValue.length; i++) {
      if (fonts[i] === null) {
        const randomIndex = Math.floor(Math.random() * fontsList.length);
        fonts[i] = fontsList[randomIndex];
      }
    }

    this.setState({
      value: inputValue,
      fonts: fonts
    });
  }

  //////////////////////////////////////////////////////// RENDER
  
  render() {
    const { vinyl } = this.props

    return <div className="ModuleContainer">
      <HeaderModule
        title={vinyl.moduleName}
        // randomize={}
      />
      <div className="ModuleContent">
        <MyInput value={value} handleChange={this.handleInputChange} />
      </div>
    </div>
  }
}
