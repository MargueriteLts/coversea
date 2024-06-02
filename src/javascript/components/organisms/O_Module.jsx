import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import M_ModuleHeader from '../molecules/M_ModuleHeader.jsx'
import M_BackgroundContent from '../molecules/moduleContent/M_BackgroundContent.jsx'
import M_LinesContent from '../molecules/moduleContent/M_LinesContent.jsx'
import M_VinylContent from '../molecules/moduleContent/M_VinylContent.jsx'
import M_BasicTypoContent from '../molecules/moduleContent/M_BasicTypoContent.jsx'
import M_ParticlesContent from '../molecules/moduleContent/M_ParticlesContent.jsx'
import M_BackgroundImageContent from '../molecules/moduleContent/M_BackgroundImageContent.jsx'
import M_ShapesContent from '../molecules/moduleContent/M_ShapesContent.jsx'
import M_ObjectsContent from '../molecules/moduleContent/M_ObjectsContent.jsx'

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
      handleChangeNoiseTintColor,
      setBackgroundStore,
      vinyl,
      handleTabClickVinyl,
      handleVinylSize,
      handleVinylOpacity,
      handleChangeVinylTintColor,
      setVinylStore,
      lines,
      handleLinesColor,
      handleLinesSize,
      handleLinesQuantity,
      handleMaxQuantityValue,
      handleQuantityValue,
      handleDropDownLinesTypeClick,
      setLinesStore,
      basictypo,
      setBasicTypoStore,
      particles,
      setParticlesStore,
      handleDropDownClickParticles,
      handleParticlesQuantity,
      handleParticlesColor,
      backgroundImage,
      setBackgroundImageStore,
      handleTabClickBackgroundImage,
      handleBackgroundImageOpacity,
      shapes,
      setShapesStore,
      handleDropDownClickShapes,
      handleShapesColor,
      handleShapesSize,
      objects,
      setImageStore,
      handleTabClickObject
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
          handleChangeNoiseTintColor={handleChangeNoiseTintColor}
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
          handleChangeVinylTintColor={handleChangeVinylTintColor}
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
          handleDropDownLinesTypeClick={handleDropDownLinesTypeClick}
          handleLinesQuantity={handleLinesQuantity}
          handleMaxQuantityValue={handleMaxQuantityValue}
          handleQuantityValue={handleQuantityValue}
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
    if (moduleType == 'Particles') {
      return (
        <M_ParticlesContent
          particles={particles}
          setParticlesStore={setParticlesStore}
          handleDropDownClickParticles={handleDropDownClickParticles}
          handleParticlesQuantity={handleParticlesQuantity}
          handleParticlesColor={handleParticlesColor}
        />
      )
    }
    if (moduleType == 'BackgroundImage') {
      return (
        <M_BackgroundImageContent
          backgroundImage={backgroundImage}
          setBackgroundImageStore={setBackgroundImageStore}
          handleTabClickBackgroundImage={handleTabClickBackgroundImage}
          handleBackgroundImageOpacity={handleBackgroundImageOpacity}
        />
      )
    }
    if (moduleType == 'Shapes') {
      return (
        <M_ShapesContent
          shapes={shapes}
          setShapesStore={setShapesStore}
          handleDropDownClickShapes={handleDropDownClickShapes}
          handleShapesColor={handleShapesColor}
          handleShapesSize={handleShapesSize}
        />
      )
    }
    if (moduleType == 'Objects') {
      return (
        <M_ObjectsContent
          objects={objects}
          setImageStore={setImageStore}
          handleTabClickObject={handleTabClickObject}
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
