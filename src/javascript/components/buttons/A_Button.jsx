import React, { Component } from 'react';
import classnames from 'classnames'

// import icons from '../../loadIcons';

export default class A_Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconSrc: null,
    };
  }

  render() {
    const { onClick, text, type, icon, hasIcon} = this.props;

    const buttonClass = classnames('A_Button', {
      [`A_Button--${type}`]: true
    });

    const iconClass = classnames('A_Icon', {
      [`${icon}`]: true
    })

    return (
      <div className={buttonClass} onClick={onClick}>
        {hasIcon ? (
          <div className={iconClass}></div>
        ) : null }
        {text}
      </div>
    );
  }
}
