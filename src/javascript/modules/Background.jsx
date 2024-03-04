import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import HeaderModule from '../components/HeaderModule.jsx'
import TabButtonSet from '../components/TabButtonSet.jsx'
import PlainColor from '../components/PlainColor.jsx'

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
    // console.log(currentBgTitle)
  }


  // renderPlainColorContent() {
  //   const { setColorBackgroundStore } = this.props

  //   return <div className="PlainColorComponent">
  //     <PlainColor
  //       setColorValue={setColorBackgroundStore}
  //       key={index}
  //     />
  //   </div>
  // }

  // renderGradientContent() {
  // }

  renderBgContent() {
    const { setColorBackgroundStore, index } = this.props

    if (this.state.currentBgType == 'PlainColor') {
      return <div className="PlainColorComponent">
        <PlainColor
          setColorValue={setColorBackgroundStore}
          key={index}
        />
      </div>
    } else if (this.state.currentBgType == 'Gradient') {
      // renderGradientContent()
    }
  }

  // renderTitles() {
  //   const title = ''
  //   if (this.state.currentBgType == 'PlainColor') {
  //     title = 'Plain color'
  //   }
  //   if (this.state.currentBgType == 'Gradient') {
  //     title = 'Gradient'
  //   }
  //   return title
  // }

  // renderTitle() {
  //   const { setColorBackgroundStore } = this.props
  //   const bgName = {}

  //   if (this.state.currentBgType == 'PlainColor') {
  //     bgName = setColorBackgroundStore().bgName
  //     console.log(setColorBackgroundStore)
  //   } else if (this.state.currentBgType == 'Gradient') {
  //   }

  //   return bgName
  // }

  // renderTitle() {
  //   // const { getplainColorBackgroundStore } = this.props
  //   let title = ''

  //   if (this.state.currentBgType == 'PlainColor') {
  //     title = 'Plain Color'
  //   }
  //   return title
  // }


  
  render() {
    const { moduleName, availablebgTypes, BgTypeTitles } = this.props

    return <div className="ModuleContainer">
      <HeaderModule
        title={moduleName}
      />
      <div className="ModuleContent">
        <TabButtonSet
          options={availablebgTypes}
          // title={BgTypeTitles}
          // title={availablebgTypes}
          // title={this.state.currentBgTitle}
          // title={this.renderTitles}
          // title={setCurrentTitle}
          title={this.state.currentBgType}
          value={this.state.currentBgType}
          handleClick={this.handleTabClick}
        />
        {this.renderBgContent()}
      </div>
    </div>
  }
}
