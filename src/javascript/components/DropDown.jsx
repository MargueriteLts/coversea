import React, { Component } from 'react';


export default class DropDown extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isOpen: false
      // selectedOption: 'Torus' // Set the default selected option to "Torus"
    };
  }

  toggleDropdown = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  // handleOptionClick = (option) => {
  //   this.setState({
  //     selectedOption: option,
  //     isOpen: false
  //   });
  // };

  render() {
    const { isOpen } = this.state;
    const { options, value, handleClick } = this.props;

    const availableOptions = options.filter(option => option !== value);

    return (
      <div className="dropdown">

        <button className="dropdown-toggle" onClick={this.toggleDropdown}>
          {value}
        </button>

        {isOpen && (
          <div className="dropdown-menu">
            {availableOptions.map(option => (
              <div
              className="dropdown-item"
              text={option.text}
              onClick={() => handleClick(option)}
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
