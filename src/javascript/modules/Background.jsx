import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import HeaderModule from '../components/HeaderModule.jsx'
import TabButtonSet from '../components/TabButtonSet.jsx'
import PlainColor from './background/PlainColor.jsx'
import ColorPicker from './background/ColorPicker.jsx'

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
    const { setBackgroundStore, background, setColorPickerStore } = this.props

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
          title=''
          object='background'
          setColorPickerStore={setColorPickerStore}
          color={background.preset.ColorPicker.color}
          key='AllColorPicker'
        />
      </div>
    }
  }

  renderBgContentOnly() {
    const { setBackgroundStore, background, setColorPickerStore } = this.props

    const bgType = background.bgTypes

    if (bgType == 'PlainColor') {
      return <div className="PlainColorComponent">
        <PlainColor
          setBackgroundStore={setBackgroundStore}
          key='PlainColor'
        />
      </div>
    }
    if (bgType == 'ColorPicker') {
      return (<div>
        <ColorPicker
          title='Color Picker'
          object='background'
          setColorPickerStore={setColorPickerStore}
          color={background.preset.ColorPicker.color}
          key='AllColorPicker'
        />
      </div>)
    }
  }
  
  render() {
    const { background } = this.props
    const nbBgTypes = background.bgTypes.length
    console.log(nbBgTypes);

    return <div className="ModuleContainer">
      <HeaderModule
        title={background.moduleName}
        // randomize={}
      />
      { nbBgTypes > 1
        ? <div className="ModuleContent flexColumn"> 
            <TabButtonSet
              options={background.preset}
              value={this.state.currentBgType}
              handleClick={this.handleTabClick}
            />
            {this.renderBgContent()}
          </div>
        : <div>{this.renderBgContentOnly()}</div>
      }
    </div>
  }
}
