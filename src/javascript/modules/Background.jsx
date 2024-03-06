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
      currentBgType: this.props.background.currentBgType
    }
  }

  handleTabClick = (type) => {
    this.props.setBackgroundStore('CurrentTabChange', type)

    this.setState({
      currentBgType: type
    })
  }

  renderBgContent() {
    const { setBackgroundStore, background } = this.props

    if (this.state.currentBgType == 'PlainColor') {
      return <div className="PlainColorComponent">
        <PlainColor
          setBackgroundStore={setBackgroundStore}
          key='PlainColor'
        />
      </div>
    } else if (this.state.currentBgType == 'ColorPicker') {
      return <div>
        <ColorPicker
          setBackgroundStore={setBackgroundStore}
          color={background.preset.ColorPicker.color}
          // getBackgroundStore={getBackgroundStore}
          key='ColorPicker'
        />
      </div>
    }
  }


  
  render() {
    const { background } = this.props

    return <div className="ModuleContainer">
      <HeaderModule
        title={background.moduleName}
      />
      <div className="ModuleContent">
        <TabButtonSet
          options={background.preset}
          value={this.state.currentBgType}
          handleClick={this.handleTabClick}
        />
        {this.renderBgContent()}
      </div>
    </div>
  }
}
