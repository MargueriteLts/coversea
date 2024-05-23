import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import M_ModuleHeader from '../HeaderModule.jsx'
import M_BackgroundContent from '../molecules/moduleContent/M_BackgroundContent.jsx'
import M_LinesContent from '../molecules/moduleContent/M_LinesContent.jsx'

export default class Module extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  handleOpenModule = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  renderModuleContent = () => {
    const {
      moduleType,
      background,
      handleTabClickBackground,
      handleChangeBackgroundSolidColor,
      handleChangeBackgroundGradientColor,
      handleChangeBackgroundAngleGradient,
      handleTabClickNoise,
      setBackgroundStore,
      lines,
      handleLinesColor,
      handleLinesSize
    } = this.props

    if (moduleType == 'Background') {
      console.log('in O_Module');
      console.log(background);
      return (
        <M_BackgroundContent
          background={background}
          handleTabClickBackground={handleTabClickBackground}
          handleChangeBackgroundSolidColor={handleChangeBackgroundSolidColor}
          handleChangeBackgroundGradientColor={handleChangeBackgroundGradientColor}
          handleChangeBackgroundAngleGradient={handleChangeBackgroundAngleGradient}
          handleTabClickNoise={handleTabClickNoise}
          setBackgroundStore={setBackgroundStore}
        />
      )
    }
    if (moduleType == 'Lines') {
      return (
        <M_LinesContent
          lines={lines}
          handleLinesColor={handleLinesColor}
          handleLinesSize={handleLinesSize}
        />
      )
    }
  }

  //////////////////////////////////////////////////////// RENDER
  
  render() {
    const { moduleName, moduleType, handleRandomizeModule } = this.props


    return <div className="moduleContainer">
      <M_ModuleHeader
        title={moduleName}
        handleRandomizeModule={handleRandomizeModule}
        moduleType={moduleType}
        handleOpenModule={this.handleOpenModule}
        isOpen={this.state.isOpen}
      />
      
      { this.state.isOpen ?

          <div className="moduleContentContainer">
            {this.renderModuleContent()}
          </div>

        : null
      }

    </div>
  }
}
