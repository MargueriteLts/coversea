import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import M_ModuleHeader from '../molecules/M_ModuleHeader.jsx'
import M_BackgroundContent from '../molecules/moduleContent/M_BackgroundContent.jsx'
import M_LinesContent from '../molecules/moduleContent/M_LinesContent.jsx'
import M_VinylContent from '../molecules/moduleContent/M_VinylContent.jsx'
import M_BasicTypoContent from '../molecules/moduleContent/M_BasicTypoContent.jsx'

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
      handleChangeBackgroundGradientStopQuantity,
      handleChangeBackgroundGradientType,
      handleTabClickNoise,
      setBackgroundStore,
      vinyl,
      handleTabClickVinyl,
      handleVinylSize,
      handleVinylOpacity,
      setVinylStore,
      lines,
      handleLinesColor,
      handleLinesSize,
      setLinesStore,
      basictypo,
      setBasicTypoStore
    } = this.props

    if (moduleType == 'Background') {
      return (
        <M_BackgroundContent
          background={background}
          handleTabClickBackground={handleTabClickBackground}
          handleChangeBackgroundGradientType={handleChangeBackgroundGradientType}
          handleChangeBackgroundSolidColor={handleChangeBackgroundSolidColor}
          handleChangeBackgroundGradientColor={handleChangeBackgroundGradientColor}
          handleChangeBackgroundAngleGradient={handleChangeBackgroundAngleGradient}
          handleChangeBackgroundGradientStopQuantity={handleChangeBackgroundGradientStopQuantity}
          handleTabClickNoise={handleTabClickNoise}
          setBackgroundStore={setBackgroundStore}
        />
      )
    }
    if (moduleType == 'Vinyl') {
      return (
        <M_VinylContent
          vinyl={vinyl}
          handleTabClickVinyl={handleTabClickVinyl}
          handleVinylSize={handleVinylSize}
          handleVinylOpacity={handleVinylOpacity}
          setVinylStore={setVinylStore}
        />
      )
    }
    if (moduleType == 'Lines') {
      return (
        <M_LinesContent
          lines={lines}
          handleLinesColor={handleLinesColor}
          handleLinesSize={handleLinesSize}
          setLinesStore={setLinesStore}
        />
      )
    }
    if (moduleType == 'BasicTypo') {
      return (
        <M_BasicTypoContent
          basictypo={basictypo}
          setBasicTypoStore={setBasicTypoStore}
        />
      )
    }
  }

  //////////////////////////////////////////////////////// RENDER
  
  render() {
    const { moduleName, moduleType, handleRandomizeModule } = this.props


    return <div className="O_Module">
      <M_ModuleHeader
        title={moduleName}
        handleRandomizeModule={handleRandomizeModule}
        moduleType={moduleType}
        handleOpenModule={this.handleOpenModule}
        isOpen={this.state.isOpen}
      />
      
      { this.state.isOpen ?

          <div className="moduleContent">
            {this.renderModuleContent()}
          </div>

        : null
      }

    </div>
  }
}
