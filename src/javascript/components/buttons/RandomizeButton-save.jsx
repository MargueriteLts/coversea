import React, { Component } from 'react';

import icons from '../../loadIcons';

class RandomizeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconSrc: null,
    };
  }

  render() {
    const { onClick, text} = this.props;

    return (
      <button
        className='btn--primary'
        onClick={onClick}
      >
        <img src={icons["Dice"]} alt={this.props.iconName} className="icon-button__icon" />{text}
      </button>
    );
  }
}

export default RandomizeButton;
