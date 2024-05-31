import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import classnames from 'classnames'

// import LockOpen from '../../../images/ui/icons/LockOpen.svg';
// import LockClosed from '../../../images/ui/icons/LockClosed.svg';

export default class A_ToggleIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isOn, handleClick, icon } = this.props;

    const iconClasses = classnames({
      'A_Icon': true,
      [`${icon}`]:true,
    })

    const buttonClasses = classnames({
      toggleIcon: true,
      active: isOn
    })

    return (
      // <div onClick={() => handleToggle(this.props.item, this.props.setStore)}>
      <div onClick={handleClick} className={buttonClasses}>
        <div className={iconClasses}></div>
      </div>
    );
  }
}