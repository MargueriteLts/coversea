import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import './IconButton.css'; // Make sure to create and import the CSS file

class RandomizeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconSrc: null,
    };
  }

  componentDidMount() {
    this.loadIcon(this.props.iconName);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.iconName !== this.props.iconName) {
      this.loadIcon(this.props.iconName);
    }
  }

  loadIcon(iconName) {
    try {
      const iconSrc = require(`../../../images/ui/icons/${iconName}`);
      this.setState({ iconSrc });
    } catch (e) {
      console.error(`Icon ${iconName} not found!`);
      this.setState({ iconSrc: null });
    }
  }

  render() {
    const { onClick, text} = this.props;
    const { iconSrc } = this.state;

    return (
      <button
        className='btn--primary'
        onClick={onClick}
        disabled={!iconSrc} // Disable the button if the icon is not found
      >
        {iconSrc && <img src={iconSrc} alt={this.props.iconName} className="icon-button__icon" />}{text}
      </button>
    );
  }
}

export default RandomizeButton;
