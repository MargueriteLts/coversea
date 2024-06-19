import React, { Component, createRef } from 'react'
import ReactDOM from 'react-dom'
import reactCSS from 'reactcss'

import A_DropDownButton from '../ATOMS/A_DropDownButton.jsx'
import M_ColorPicker from './controls/M_ColorPicker.jsx'
import M_Select from './M_Select.jsx'
import Slider from '../Slider.jsx'

export default class M_TextSettingsDropDown extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayContent: false,
      popoverPosition: { top: 0, left: 0 }
    };

    this.dropdownRef = createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick = () => {

    this.setState({
      displayContent: !this.state.displayContent,
    });
  };


  componentDidMount() {
    document.body.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.dropdownRef && !this.dropdownRef.current.contains(event.target)) {
      this.handleClose()
    }
  }

  handleClose() {
    this.setState({ displayContent: false });
  }


  

  render() {
    const {
      title,
      object,
      color,
      handleChange,
      fontOptions,
      currentFont,
      handleDropDownClick,
      // handleDropDownStyles,
      minSize,
      maxSize,
      size,
      handleTextSize
    } = this.props


    const styles = reactCSS({
      'default': {
        popover: {
          position: 'absolute',
          zIndex: '2',
          top: '44px',
          right: '0'
        },
      },
    });


    return <div className='M_DropDown' ref={this.dropdownRef}>
      
      <A_DropDownButton
        text={title}
        isOn={this.state.displayContent}
        handleClick={this.handleClick}
      />

      { this.state.displayContent
      
        ? <div style={ styles.popover } className='dropDownPopover'>
          {/* SHOULD BE COMPONENTS ATOMS */}
          <div className='dropDown-item'>
            <M_ColorPicker
              // alpha={false}
              object={object}
              color={color}
              handleChange={handleChange}
              key='ColorPicker'
            />
          </div>
          <div className='dropDown-item'>
            <M_Select
              options={fontOptions}
              value={currentFont}
              handleClick={handleDropDownClick}
            />
          </div>
          <div className='dropDown-item'>
            <Slider
              title='Size'
              min={minSize}
              max={maxSize}
              value={size}
              handleChange={handleTextSize}
            />
          </div>
          {/*<div className='dropDown-item'>
            <M_Select
              options={typo.styles}
              value={this.state.styleMainText}
              handleClick={handleDropDownStyles}
            />  
          </div>*/}
        </div>

        : null
      }
    </div>
  }
}
