import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

export default class AllColorPicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayColorPicker: false,
      color: this.props.color,
      popoverPosition: { top: 0, left: 0 }
    };
  }

  handleClick = () => {
    const parentRect = ReactDOM.findDOMNode(this).getBoundingClientRect();
    const popoverWidth = 220;
    const popoverHeight = 350;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top = parentRect.bottom;
    let left = parentRect.left;

    if (left + popoverWidth > viewportWidth) {
      left = viewportWidth - popoverWidth;
    }

    if (top + popoverHeight > viewportHeight) {
      top = viewportHeight - popoverHeight;
    }

    this.setState({
      displayColorPicker: !this.state.displayColorPicker,
      popoverPosition: { top, left }
    });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  render() {

    const { title } = this.props

    let color = []

    if (typeof this.props.color == 'object') {
      color = `rgb(${this.props.color.join(',')})`
    } else {
      color = this.props.color
    }

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
          position: 'fixed', // Change to fixed to ensure popover position remains fixed relative to the viewport
          zIndex: '2',
          top: this.state.popoverPosition.top,
          left: this.state.popoverPosition.left
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

    // <div className={styles.box}>
    return <div className='colorPicker-box'>
      {/* <div>{title}</div> */}
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
