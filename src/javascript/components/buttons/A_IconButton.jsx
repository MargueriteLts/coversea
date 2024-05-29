import React, { Component } from 'react';
import classnames from 'classnames'
// import PropTypes from 'prop-types';
// import './IconButton.css'; // Make sure to create and import the CSS file

 export default class IconButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onClick, size, style, icon } = this.props;

    const buttonClass = classnames('A_Button__Icon', {
      [`${size}`]: true,
      [`${style}`]: true
    });

    const iconClass = classnames('A_Icon', {
      [`${icon}`]: true
    });


    return <div className={buttonClass} onClick={onClick}>
      <div className={iconClass}></div>
    </div>

  }
}
