import React, { Component, createRef } from 'react';

import classnames from 'classnames'

// import icons from '../../loadIcons';


export default class M_Select extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isOpen: false
    };

    this.selectRef = createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleClose = this.handleClose.bind(this);
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

  componentDidMount() {
    document.body.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.selectRef && !this.selectRef.current.contains(event.target)) {
      this.handleClose()
    }
  }

  handleClose = () => {
    this.setState({ isOpen: false })
  };

  render() {
    const { isOpen } = this.state;
    const { options, value } = this.props;

    //const availableOptions = options.filter(option => option !== value);
    
    const iconClasses = classnames({
      'A_Icon': true,
      angleDown: !isOpen,
      angleUp: isOpen
    })

    const buttonClasses = classnames({
      'dropdown-toggle': true,
      closed: !isOpen,
      open: isOpen
    })

    return (
      <div className="select" ref={this.selectRef}>

        <div className={buttonClasses} onClick={this.toggleDropdown}>
          {value}
          <div className={iconClasses}></div>
        </div>

        {isOpen && (
          <div className="dropdown-menu">
            {this.props.options.map((option) => {
              const itemClasses = classnames('dropdown-item', {
                selectedItem: option === value,
              });

              return (
                <div
                  className={itemClasses}
                  onClick={() => this.handleClick(option)}
                  key={option}
                >
                  {option}
                </div>
              );
            })}
          </div>
        )}




      </div>
    );
  }
}
