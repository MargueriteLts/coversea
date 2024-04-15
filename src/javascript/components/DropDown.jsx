import React, { Component } from 'react';


export default class DropDown extends Component {
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
  };

  handleClick = (option) => {
    this.props.handleClick(option); // Call the handleClick function passed from props
    this.setState({ isOpen: false }); // Close the dropdown after selecting an option
  };

  render() {
    const { isOpen } = this.state;
    const { options, value, handleClick } = this.props;

    const availableOptions = options.filter(option => option !== value);

    return (
      <div className="dropdown">

        <button className={`dropdown-toggle ${isOpen ? 'open' : ''}`} onClick={this.toggleDropdown}>
          {value}
        </button>

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
