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
      valueMainText: this.props.basictypo.mainText,
      currentMainTextFont: this.props.basictypo.font,
      sliderValue: this.props.basictypo.sizeMainText.sliderValue,
      styleMainText: this.props.basictypo.styleMainText,
      // valueTextarea: this.props.basictypo.textarea,
      // valueTextarea2: this.props.basictypo.textarea,
      color: this.props.basictypo.color,
      textAreas: [{ value: this.props.basictypo.textarea }]
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

  handleDropDownClick = (type) => {
    this.props.setBasicTypoStore('CurrentTabChange', type)

    this.setState({
      currentMainTextFont: type
    })
  }

  handleDropDownStyles = (type) => {
    this.props.setBasicTypoStore('StyleTabChange', type)

    this.setState({
      styleMainText: type
    })
  }

  // handleTextareaChange = (event) => {
  //   const type = 'textarea'
  //   const textareaValue = event.target.value
  //   this.props.setBasicTypoStore(type, textareaValue)
  //   this.setState({
  //     valueTextarea: textareaValue
  //   })
  // }

  handleTextAreaChange = (event, index) => {
    const { textAreas } = this.state;
    const { value } = event.target;
    
    const updatedTextAreas = [...textAreas]
    
    updatedTextAreas[index] = { ...updatedTextAreas[index], value: value };
    
    this.setState({ textAreas: updatedTextAreas });
    
    // const type = `textarea${index}`
    // this.props.setBasicTypoStore(type, value);
    const type = 'textarea'
    this.props.setBasicTypoStore(type, updatedTextAreas)
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

  handleAddText = () => {
    const { textAreas } = this.state;

    // Check if maximum number of text areas (6) has been reached
    if (textAreas.length < 6) {
      this.setState({
        textAreas: [...textAreas, { value: '' }] // Add new empty textarea
      });
    }
  }

  handleRemoveText = (index) => {
    const { textAreas } = this.state;
    const updatedTextAreas = [...textAreas];
    updatedTextAreas.splice(index, 1); // Remove textarea at index
    this.setState({
      textAreas: updatedTextAreas
    })
    const type = 'textarea'
    this.props.setBasicTypoStore(type, updatedTextAreas)
  }

  //////////////////////////////////////////////////////// RENDER
  
  render() {
    const { basictypo, randomizeModuleStore } = this.props
    const { textAreas } = this.state;

    return <div className="moduleContainer">
      <HeaderModule
        title={basictypo.moduleName}
        moduleType='BasicTypo'
        randomizeModuleStore={randomizeModuleStore}
      />
      <div className="moduleContent">

        <div className="module__content--basictypo-maintext flexColumn">
          <Input
            title='Main text'
            value={this.state.valueMainText}
            handleChange={this.handleInputChange}
          />

          <div className='module__basictypo-maintext-controls'>
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
          </div>
        </div>

        { basictypo.dopText
          ?
          <div>
            {textAreas.map((textArea, index) => (
              <div key={index} className='flexRow'>
                <TextArea
                  title='Other text'
                  className='textarea'
                  rows={3}
                  cols={40}
                  value={textArea.value}
                  onChange={(event) => this.handleTextAreaChange(event, index)}
                  // onChange={this.handleTextAreaChange}
                />
                <div className="btn--secondary" onClick={() => this.handleRemoveText(index)}>Remove</div>
              </div>
            ))}
            <div className="btn--secondary" onClick={this.handleAddText}>Add text</div>
          </div>
          : null
        }
      </div>
    </div>
  }
}
