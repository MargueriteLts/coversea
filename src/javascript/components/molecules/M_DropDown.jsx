import React, { Component, createRef } from 'react'
import reactCSS from 'reactcss'

import A_DropDownButton from '../ATOMS/A_DropDownButton.jsx'
import M_TextSettings from './M_TextSettings.jsx'

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

  renderDropDownContent() {
    const { dropDownContent, textType, textData, setStore, object, itemLockColor, itemLockType, itemSizeLock, itemLeadingLock, handleChange, handleDropDownClick, handleTextSize, handleTextLeading, currentFont, size, leading } = this.props

    if (dropDownContent == 'TextSettings') {
      return (
        <M_TextSettings
          textType={textType}
          textData={textData}
          setStore={setStore}
          object={object}

          itemLockColor={itemLockColor}
          itemLockType={itemLockType}
          itemSizeLock={itemSizeLock}
          itemLeadingLock={itemLeadingLock}

          handleChange={handleChange}
          //handleDropDownClick={handleDropDownClick}
          //handleTextSize={handleTextSize}
          //handleTextLeading={handleTextLeading}

          currentFont={currentFont}
          size={size}
          leading={leading}
        />
      )
    }
  }
  

  render() {
    const {
      title
    } = this.props


    const styles = reactCSS({
      'default': {
        popover: {
          position: 'absolute',
          zIndex: '2',
          top: '0',
          right: '108px'
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
          {this.renderDropDownContent()}
        </div>

        : null
      }
    </div>
  }
}
