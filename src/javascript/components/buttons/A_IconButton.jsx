import React, { Component } from 'react';
import classnames from 'classnames'

 export default class IconButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onClick, size, style, icon } = this.props;

    const buttonClasses = classnames('A_Button_Icon', {
      [`${size}`]: true,
      [`${style}`]: true
    });

    const iconClasses = classnames('A_Icon', {
      [`${icon}`]: true
    });


    return <div className={buttonClasses} onClick={onClick}>
      <div className={iconClasses}></div>
    </div>

  }
}
