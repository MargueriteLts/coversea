import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import classnames from 'classnames'

// import LockOpen from '../../../images/ui/icons/LockOpen.svg';
// import LockClosed from '../../../images/ui/icons/LockClosed.svg';

export default class IconToggle extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isLocked, handleToggle } = this.props;

    const classes = classnames({
      'A_Icon': true,
      locked: isLocked,
      unLocked: !isLocked
    })

    return (
      <div onClick={() => handleToggle(this.props.item, this.props.setStore)}>
        <div className={classes}></div>
      </div>
    );
  }
}