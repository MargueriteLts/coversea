import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

export default class AllColorPicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayColorPicker: false,
      color: this.props.color
    };
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  render() {

    const { title, alpha } = this.props

    let color = []

    if (typeof this.props.color == 'object') {
      color = `rgb(${this.props.color.join(',')})`
    } else {
      color = this.props.color
    }

    const styles = reactCSS({
      'default': {
        colorSwatch: {
          width: '24px',
          height: '24px',
          borderRadius: '2px',
          background: color,
        },
        swatch: {
          padding: '2px',
          background: '#2C2C2C',
          borderRadius: '2px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        }
      },
    });

    return <div className="PlainColor">
      <div>{title}</div>
      <div style={ styles.swatch } onClick={ this.handleClick }>
        <div style={ styles.colorSwatch } />
      </div>
      { this.state.displayColorPicker
      
        ? <div style={ styles.popover }>
            <div style={ styles.cover } onClick={ this.handleClose }/>

            <SketchPicker
              disableAlpha={true}
              color={color}
              onChange={ (color) => {this.props.handleChange(this.props.object, color.hex)} }
            />

          </div>

        : null
      }
    </div>
  }
}