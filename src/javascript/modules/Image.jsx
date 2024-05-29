import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import M_ModuleHeader from '../components/M_ModuleHeader.jsx'
import TabImageSet from '../components/TabImageSet.jsx'

export default class Image extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { handleRandomizeModule, objects, handleTabClickObject } = this.props
    
    return <div className="moduleContainer">
      <M_ModuleHeader
        title='Random Image'
        moduleType='Image'
        handleRandomizeModule={handleRandomizeModule}
      />
      <div className="moduleContent">
        <TabImageSet
          options = {objects.preset}
          value = {objects.currentCollection}
          handleClick = {handleTabClickObject}
          tabBackgrounds={objects.tabBackgrounds}
        />
      </div>
    </div>
  }
}
