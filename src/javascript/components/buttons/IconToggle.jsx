import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import LockOpen from '../../../images/ui/icons/LockOpen.svg';
import LockClosed from '../../../images/ui/icons/LockClosed.svg';

export default class IconToggle extends Component {
  constructor(props) {
    super(props);
    
    // this.state = {
    //   isLocked: this.props.isLocked
    // };
  }

  // handleToggle = () => {
  //   const { item } = this.props

  //   this.setState((prevState) => ({
  //     isLocked: !prevState.isLocked,
  //   }));

  //   // this.setState({isLocked: !this.state.isLocked})
  //   console.log(this.props.lockState);
  //   console.log(this.state.isLocked);

  //   this.props.setStore(item, !this.state.isLocked)
 
  // };

  // handleToggleInside = () => {
  //   this.setState((prevState) => ({
  //     isLocked: !prevState.isLocked,
  //   }));
  //   this.props.handleToggle(this.props.item, this.props.setStore, !this.state.isLocked)
  // }

  render() {
    const { isLocked, handleToggle } = this.props;
    return (
      <div onClick={() => handleToggle(this.props.item, this.props.setStore)} style={{ cursor: 'pointer' }}>
        {isLocked ? (
          <img src={LockClosed} alt="Icon Lock Closed" />
        ) : (
          <img src={LockOpen} alt="Icon Lock Open" />
        )}
      </div>
    );
  }
}