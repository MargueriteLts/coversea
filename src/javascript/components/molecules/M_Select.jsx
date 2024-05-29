import React, { Component } from 'react';

import classnames from 'classnames'

// import icons from '../../loadIcons';


export default class M_Select extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isOpen: false
    };
  }

  toggleDropdown = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  handleClick = (option) => {
    this.props.handleClick(option)
    this.setState({ isOpen: false })
  }

  render() {
    const { isOpen } = this.state;
    const { options, value } = this.props;

    const availableOptions = options.filter(option => option !== value);

     const classes = classnames({
      'icon-button__icon': true,
      'AngleDown': true
    })

    return (
      <div className="dropdown">

        <div className={`dropdown-toggle ${isOpen ? 'open' : ''}`} onClick={this.toggleDropdown}>
          {value}
          <div className={classes}></div>
          {/* <img src={icons["AngleDown"]} alt="iconAngleDown" className='icon-button__icon'/> */}
        </div>

        {isOpen && (
          <div className="dropdown-menu">
            {availableOptions.map(option => (
              <div
              className="dropdown-item"
              text={option.text}
              onClick={() => this.handleClick(option)}
              key={option}
              >
              {option}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
