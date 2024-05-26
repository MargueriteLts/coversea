import React, { Component, createRef } from 'react';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';

export default class AllColorPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayColorPicker: false,
      color: this.props.color,
    };

    this.colorpickerRef = createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
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


  render() {
    const { color, displayColorPicker, title } = this.state;

    const styles = reactCSS({
      default: {
        swatch: {
          display: 'inline-block',
          marginRight: '8px', // Add spacing between swatch and popover
          cursor: 'pointer',
        },
        colorSwatch: {
          width: '32px',
          height: '32px',
          borderRadius: '2px',
          background: color,
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
          top: '0',
          left: '100%',
        }
      },
    });

    return (
      <div style={{ position: 'relative' }} ref={this.colorpickerRef}>
        <div>{title}</div>
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.colorSwatch} />
        </div>
        {displayColorPicker && (
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
    );
  }
}
