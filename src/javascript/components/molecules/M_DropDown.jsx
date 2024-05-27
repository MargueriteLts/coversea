import React, { Component, createRef } from 'react'
import ReactDOM from 'react-dom'
import reactCSS from 'reactcss'

import A_DropDownButton from '../ATOMS/A_DropDownButton.jsx'
import ColorPicker from '../ColorPicker.jsx'
import M_Select from './M_Select.jsx'
import Slider from '../Slider.jsx'

export default class M_DropDown extends Component {
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
      typo,
      handleChange,
      handleDropDownClick,
      // handleDropDownStyles,
      handleSizeMainText,
      currentMainTextFont,
      size
    } = this.props


    const styles = reactCSS({
      'default': {
        popover: {
          position: 'absolute', // Change to fixed to ensure popover position remains fixed relative to the viewport
          zIndex: '2',
          top: '21px',
          right: '50%'
        },
        // cover: {
        //   position: 'fixed',
        //   top: '0px',
        //   right: '0px',
        //   bottom: '0px',
        //   left: '0px',
        // }
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
          <ColorPicker
            // alpha={false}
            object='SolidColor'
            color={typo.color}
            handleChange={handleChange}
            key='ColorPicker'
          />
          <M_Select
            options={typo.optionsMainTextFonts}
            value={currentMainTextFont}
            handleClick={handleDropDownClick}
          />
          {/* <M_Select
            options={typo.styles}
            value={this.state.styleMainText}
            handleClick={handleDropDownStyles}
          /> */}
          <Slider
            title='Size'
            min={typo.sizeMainText.min}
            max={typo.sizeMainText.max}
            value={size}
            handleChange={handleSizeMainText}
          />
        </div>

        : null
      }
    </div>
  }
}
