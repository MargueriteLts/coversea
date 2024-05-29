import React, { Component } from 'react';
import classnames from 'classnames'
// import PropTypes from 'prop-types';
// import './IconButton.css'; // Make sure to create and import the CSS file

class IconButton extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   iconSrc: null,
    // };
  }

  // componentDidMount() {
  //   this.loadIcon(this.props.iconName);
  // }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.iconName !== this.props.iconName) {
  //     this.loadIcon(this.props.iconName);
  //   }
  // }

  // loadIcon(iconName) {
  //   try {
  //     const iconSrc = require(`../../../images/ui/icons/${iconName}`);
  //     this.setState({ iconSrc });
  //   } catch (e) {
  //     console.error(`Icon ${iconName} not found!`);
  //     this.setState({ iconSrc: null });
  //   }
  // }

  render() {
    const { onClick, size, style, icon } = this.props;
    const { iconSrc } = this.state;

    const buttonClass = classnames('A_Button__Icon', {
      [`${size}`]: true,
      [`${style}`]: true
    });

    const iconClass = classnames('A_Icon', {
      [`${icon}`]: true
    });


    return (
      <div
        className={buttonClass}
        onClick={onClick}
        disabled={!iconSrc} // Disable the button if the icon is not found
      >
        {iconSrc &&
        // <img src={iconSrc} alt={this.props.iconName} className="A_Icon" />
        <div className={iconClass}></div>
      }
      </div>
    );
  }
}

export default IconButton;
