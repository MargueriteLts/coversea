import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import HeaderModule from '../components/HeaderModule.jsx'
import TabButtonSet from '../components/TabButtonSet.jsx'

export default class Background extends Component {
  constructor(props) {
    super(props)
  }

  handleBackgroundTypeChange = (property, value) => {
    const { backgroundTypeList } = this.props

    //STORE
  }
  
  render() {
    const { moduleName, backgroundTypeList, bgTypeName, backgroundMode } = this.props

    return <div className="ModuleContainer">
      <HeaderModule
        title={moduleName}
      />
      <div className="ModuleContent">
        <TabButtonSet
          options={backgroundTypeList}
          value={bgTypeName}
          property={backgroundMode}
          handleChange={this.handleBackgroundTypeChange}
        />
      </div>
    </div>
  }
}
