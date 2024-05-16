import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import HeaderModule from '../components/HeaderModule.jsx'
import TabImageSet from '../components/TabImageSet.jsx'

export default class Image extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { handleRandomizeModule, objects, handleTabClickObject } = this.props
    
    return <div className="moduleContainer">
      <HeaderModule
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
