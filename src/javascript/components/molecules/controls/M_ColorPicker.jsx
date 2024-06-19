import React, { Component, createRef } from 'react'
import ReactDOM from 'react-dom'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import {rgbToHex} from '../../../utilities.js'

import A_Text from '../../ATOMS/A_Text.jsx'

export default class M_ColorPicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayColorPicker: false,
      color: this.props.color,
    };

    this.colorpickerRef = createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick = () => {

    this.setState({
      displayColorPicker: !this.state.displayColorPicker,
    });
  };

  componentDidMount() {
    document.body.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.colorpickerRef && !this.colorpickerRef.current.contains(event.target)) {
      this.handleClose()
    }
  }

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  render() {

    let color = []
    let hexColor

    if (typeof this.props.color == 'object') {
      color = `rgb(${this.props.color.join(',')})`
      hexColor = rgbToHex(color)
    } else {
      color = this.props.color
      hexColor = color
    }

    let text = `${hexColor}`

    const styles = reactCSS({
      'default': {
        box: {
          width: '100%',
          height: '100%',
          fontSize: '0px',
        },
        colorSwatch: {
          width: '32px',
          height: '32px',
          borderRadius: '6px',
          background: color,
          border: '1px solid #4d4d4d',
        },
        swatch: {
          //padding: '1px',
          //background: '#6d6d6d',
          borderRadius: '4px',
          //boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '10'
        }
      },
    });
    
    return <div className='M_ColorPicker' ref={this.colorpickerRef}>
      <div className='A_ColorPickerButton' onClick={ this.handleClick }>

        <div style={ styles.swatch }>
          <div style={ styles.colorSwatch } />
        </div>

        {/*{text}*/}

        <A_Text
          text={text}
          style='titleText'
          isUpperCase={true}
        />

      </div>

      {this.state.displayColorPicker && (
          <div style={styles.popover}>
            <SketchPicker
              disableAlpha={true}
              color={color}
              onChange={(color) => {
                this.setState({ color: color.hex });
                this.props.handleChange(this.props.object, color.hex);
              }}
            />
          </div>
        )}

    </div>
  }
}