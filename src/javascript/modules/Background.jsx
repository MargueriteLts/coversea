import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import HeaderModule from '../components/HeaderModule.jsx'
import TabButtonSet from '../components/TabButtonSet.jsx'
import PlainColor from '../components/PlainColor.jsx'
import ColorPicker from '../components/ColorPicker.jsx'

export default class Background extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentBgType: this.props.currentBgType
    }
  }

  handleTabClick = (type) => {
    this.props.setCurrentBgType(type)
    this.setState({
      currentBgType: type
    })
  }

  renderBgContent() {
    const { setColorBackgroundStore, index, setColorValueStore } = this.props

    if (this.state.currentBgType == 'PlainColor') {
      return <div className="PlainColorComponent">
        <PlainColor
          setColorValue={setColorBackgroundStore}
          key={index}
        />
      </div>
    } else if (this.state.currentBgType == 'ColorPicker') {
      return <div>
        <ColorPicker
          setColorValueStore={setColorValueStore}
        />
      </div>
    }
  }


  
  render() {
    const { moduleName, availablebgTypes, BgTypeTitle } = this.props

    return <div className="ModuleContainer">
      <HeaderModule
        title={moduleName}
      />
      <div className="ModuleContent">
        <TabButtonSet
          options={availablebgTypes}
          title={availablebgTypes}
          value={this.state.currentBgType}
          handleClick={this.handleTabClick}
        />
        {this.renderBgContent()}
      </div>
    </div>
  }
}
