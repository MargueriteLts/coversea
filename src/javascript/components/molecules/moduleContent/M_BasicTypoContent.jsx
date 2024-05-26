import React, { Component } from 'react'
import ReactDOM from 'react-dom'

// import Input from '../../Input.jsx'
// import ColorPicker from '../../ColorPicker.jsx'
// import DropDown from '../M_Select.jsx'
// import Slider from '../../Slider.jsx'
import A_Text from '../../ATOMS/A_Text.jsx'
import TextArea from '../../TextArea.jsx'
import M_DropDown from '../M_DropDown.jsx'

import M_AddRemoveText from '../controls/M_AddRemoveText.jsx'

export default class BasicTypo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      valueMainText: this.props.basictypo.mainText,
      currentMainTextFont: this.props.basictypo.font,
      sliderValue: this.props.basictypo.sizeMainText.sliderValue,
      styleMainText: this.props.basictypo.styleMainText,
      color: this.props.basictypo.color
    }
  }

  handleMainTextChange = (event) => {

    const inputValue = event.target.value

    this.props.setBasicTypoStore('mainText', inputValue)

    this.setState({
      valueMainText: inputValue
    });
  }

  handleDropDownClick = (type) => {
    this.props.setBasicTypoStore('CurrentTabChange', type)

    this.setState({
      currentMainTextFont: type
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

  handleSizeMainText = (e) => {
    let type = 'sizeMainText'
    this.props.setBasicTypoStore(type, e.target.value)
    this.setState({sliderValue: e.target.value})
  }

  //////////////////////////////////////////////////////// RENDER
  
  render() {
    const { basictypo, setBasicTypoStore } = this.props

    return <div className="M_BasicTypoContent">

      <div className="BasicTypo_row">
        <A_Text
          text='Main text'
        />
        <TextArea
          className='textarea'
          rows={3}
          cols={40}
          value={this.state.valueMainText}
          onChange={this.handleMainTextChange}
        />

        <M_DropDown
          title='Text settings'
          typo={basictypo}
          handleChange={this.handleChange}
          handleDropDownClick={this.handleDropDownClick}
          // handleDropDownStyles={this.handleDropDownStyles}
          handleSizeMainText={this.handleSizeMainText}
          currentMainTextFont={this.state.currentMainTextFont}
          size={this.state.sliderValue}
        />

        {/* <div className='module__basictypo-maintext-controls'>
          <ColorPicker
            // alpha={false}
            object='SolidColor'
            color={basictypo.color}
            handleChange={this.handleChange}
            key='ColorPicker'
          />
          <DropDown
            options={basictypo.optionsMainTextFonts}
            value={this.state.currentMainTextFont}
            handleClick={this.handleDropDownClick}
          />
          <DropDown
            options={basictypo.styles}
            value={this.state.styleMainText}
            handleClick={this.handleDropDownStyles}
          />
          <Slider
            title='Size'
            min={basictypo.sizeMainText.min}
            max={basictypo.sizeMainText.max}
            value={this.state.sliderValue}
            handleChange={this.handleSizeMainText}
          />
        </div> */}
      </div>

      { basictypo.dopText
        ?
        <div className="BasicTypo_row">
          <A_Text
            text='Small text'
          />
          <M_AddRemoveText
            text={basictypo.textarea}
            setStore={setBasicTypoStore}
          />
        </div>
        : null
      }

    </div>
  }
}
