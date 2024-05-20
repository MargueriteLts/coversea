import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import HeaderModule from '../components/HeaderModule.jsx'
import TabButtonSet from '../components/TabButtonSet.jsx'
import Input from '../components/Input.jsx'
import ColorPicker from '../components/ColorPicker.jsx'
import DropDown from '../components/DropDown.jsx'
import Slider from '../components/Slider.jsx'
import TextArea from '../components/TextArea.jsx'

export default class BasicTypo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      valueText: this.props.basictypoV2.mainText,
      currentTextFont: this.props.basictypoV2.font,
      sliderValue: this.props.basictypoV2.sizeText.sliderValue,
      styleText: this.props.basictypoV2.styleText,
      color: this.props.basictypoV2.color
    }
  }

  handleInputChange = (event) => {
    const type = 'Text'
    const inputValue = event.target.value
    this.props.setBasicTypoV2Store(type, inputValue)
    this.setState({
      valueText: inputValue
    });
  }

  handleDropDownClick = (type) => {
    this.props.setBasicTypoV2Store('CurrentTabChange', type)

    this.setState({
      currentTextFont: type
    })
  }

  handleDropDownStyles = (type) => {
    this.props.setBasicTypoV2Store('StyleTabChange', type)

    this.setState({
      styleText: type
    })
  }


  handleChange = (object, value) => {
    this.props.setBasicTypoV2Store(object, value)
      .then((color) => {
        this.setState({
          color: color[0]
        })
      }
    )
  }

  handleSizeMainText = (e) => {
    let type = 'sizeText'
    this.props.setBasicTypoV2Store(type, e.target.value)
    this.setState({sliderValue: e.target.value})
  }

  //////////////////////////////////////////////////////// RENDER
  
  render() {
    const { basictypoV2, randomizeModuleStore } = this.props

    return <div className="moduleContainer">
      <HeaderModule
        title={basictypoV2.moduleName}
        moduleType='BasicTypo'
        randomizeModuleStore={randomizeModuleStore}
      />
      <div className="moduleContent">

        <div className="module__content--basictypo-maintext flexColumn">
          <Input
            title='Main text'
            value={this.state.valueText}
            handleChange={this.handleInputChange}
          />
          <div className='module__basictypo-maintext-controls'>
            <ColorPicker
              // alpha={false}
              object='SolidColor'
              color={basictypoV2.color}
              handleChange={this.handleChange}
              key='ColorPicker'
            />
            <DropDown
              options={basictypoV2.optionsTextFonts}
              value={this.state.currentTextFont}
              handleClick={this.handleDropDownClick}
            />
            <DropDown
              options={basictypoV2.styles}
              value={this.state.styleText}
              handleClick={this.handleDropDownStyles}
            />
            <Slider
              title='Size'
              min={basictypoV2.sizeText.min}
              max={basictypoV2.sizeText.max}
              value={this.state.sliderValue}
              handleChange={this.handleSizeMainText}
            />
          </div>
        </div>
      </div>
    </div>
  }
}
