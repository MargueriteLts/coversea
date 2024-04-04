import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import HeaderModule from '../components/HeaderModule.jsx'
import TabButtonSet from '../components/TabButtonSet.jsx'

export default class Vinyl extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentVinylType: this.props.vinyl.currentVinylType
    }
  }

  handleTabClick = (type) => {
    this.props.setVinylStore('CurrentTabChange', type)

    this.setState({
      currentVinylType: type
    })
  }

  // handleClick = () => {
  //   console.log('click');
  //   if (this.state.currentCollection === 'NightClub'){
  //     this.props.setBackgroundImageStore('NightClub')
  //   }
  //   if (this.state.currentCollection === 'Cars'){
  //     this.props.setBackgroundImageStore('Cars')
  //   }
  // }

  //////////////////////////////////////////////////////// RENDER
  
  render() {
    const { vinyl } = this.props

    return <div className="ModuleContainer">
      <HeaderModule
        title={vinyl.moduleName}
        // randomize={}
      />
      <div className="ModuleContent">
        <TabButtonSet
          options={vinyl.preset}
          value={this.state.currentVinylType}
          handleClick={this.handleTabClick}
        />
        {/* <div className="Button" onClick={this.handleClick}>Randomize image</div> */}
      </div>
    </div>
  }
}
