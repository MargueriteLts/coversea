import React, { Component } from 'react';
import classnames from 'classnames'

import icons from '../../loadIcons';

export default class A_Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconSrc: null,
    };
  }

  render() {
    const { onClick, text, type} = this.props;

    const buttonClass = classnames('A_Button', {
      [`A_Button--${type}`]: true
    });

    return (
      <div
        className={buttonClass}
        onClick={onClick}
      >
        <img src={icons["Dice"]} alt={this.props.iconName} className="A_Icon" />{text}
      </div>
    );
  }
}
