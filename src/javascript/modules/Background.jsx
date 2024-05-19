import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import HeaderModule from '../components/HeaderModule.jsx'
import TabButtonSet from '../components/TabButtonSet.jsx'
import ColorPicker from '../components/ColorPicker.jsx'
import M_GradientOrientation from '../components/M_GradientOrientation.jsx'
import M_GradientColors from '../components/M_GradientColors.jsx'
import TabImageSet from '../components/TabImageSet.jsx'
import IconToggle from '../components/buttons/IconToggle.jsx'

export default class Background extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,

      solidColorLock : this.props.background.preset.SolidColor.locked,
      gradientLock: this.props.background.preset.Gradient.locked,
      noiseLock: this.props.background.preset.Noise.locked,
      pixelsLock: this.props.background.preset.Pixels.locked
    }
  }

  handleOpenModule = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  /////////////////////////// LOCK/UNLOCK ITEMS ///////////////////////////

  handleToggle = (item, setStore) => {
    
    
    if (item == 'lockSolidColor') {
      setStore(item, !this.state.solidColorLock)
      this.setState({
        solidColorLock: !this.state.solidColorLock
      })
    }
    if (item == 'lockGradient') {
      setStore(item, !this.state.gradientLock)
      this.setState({
        gradientLock: !this.state.gradientLock
      })
    }
    if (item == 'lockNoise') {
      setStore(item, !this.state.noiseLock)
      this.setState({
        noiseLock: !this.state.noiseLock
      })
    }
    if (item == 'lockPixels') {
      setStore(item, !this.state.pixelsLock)
      this.setState({
        pixelsLock: !this.state.pixelsLock
      })
    }
  };

  ///////////////////////// RENDER CONTENT BACKGROUND TAB

  renderModuleContentWithTabs() {
    
    const {
      background,
      setBackgroundStore,
      currentBackgroundType,
      handleChangeBackgroundSolidColor,
      handleChangeBackgroundGradientColor,
      handleBackgroundRandomizeGradient,
      handleChangeBackgroundAngleGradient,
      backgroundGradientColor1,
      backgroundGradientColor2,
      currentNoiseType,
      handleTabClickNoise,
      onToggle
    } = this.props
    
    ////////////// SOLID COLOR

    if (background.currentBackgroundType == 'SolidColor') {
      return <div className='TabContent'>
        <IconToggle
          isLocked={this.state.solidColorLock}
          setStore={setBackgroundStore}
          item='lockSolidColor'
          handleToggle={this.handleToggle}
        />
        <ColorPicker
          title=''
          object='SolidColor'
          color={background.preset.SolidColor.color}
          handleChange={handleChangeBackgroundSolidColor}
          key='BackgroundColorPicker'
        />
      </div>
    }

    ////////////// GRADIENT

    if (background.currentBackgroundType == 'Gradient') {
      return <div className='TabContent'>
        <IconToggle
          isLocked={this.state.gradientLock}
          setStore={setBackgroundStore}
          item='lockGradient'
          handleToggle={this.handleToggle}
        />

        <div className='moduleContent-Left'>
          <M_GradientOrientation
            handleChangeBackgroundAngleGradient={handleChangeBackgroundAngleGradient}
          />
        </div>

        <div className='moduleContent-Right'>
          <M_GradientColors
            background={background}
            handleChangeBackgroundGradientColor={handleChangeBackgroundGradientColor}
            color1={background.preset.Gradient.color1}
            color2={background.preset.Gradient.color2}
          />
        </div>

        {/* je suppr pas pour l'instant mais a terme ca doit etre remplace par la fonction lock */}
        {/* <div className="btn--secondary" onClick={handleBackgroundRandomizeGradient}>Randomize Gradient</div> */}
      </div>
    }

    if (background.currentBackgroundType == 'Noise') {
      return <div className='TabContent'>
        <IconToggle
          isLocked={this.state.noiseLock}
          setStore={setBackgroundStore}
          item='lockNoise'
          handleToggle={this.handleToggle}
        />
        <div className='moduleContent-Left'>
          <TabImageSet
            options = {background.preset.Noise.preset}
            value = {background.preset.Noise.currentNoiseType}
            handleClick = {handleTabClickNoise}
            tabBackgrounds={background.preset.Noise.tabBackgrounds}
          />
        </div>
      </div>
    }

    if (background.currentBackgroundType == 'Pixels') {
      return <div className='TabContent'>
        <IconToggle
          isLocked={this.state.pixelsLock}
          setStore={setBackgroundStore}
          item='lockPixels'
          handleToggle={this.handleToggle}
        />
      </div>
    }
  }

  //////////////////////////////// NO TAB RENDER

  renderModuleContentAlone() {
    const { background, setColorPickerStore, handleChangeBackgroundSolidColor, handleChangeBackgroundGradientColor, handleBackgroundRandomizeGradient, handleChangeBackgroundAngleGradient, solidColor, colorG1, colorG2 } = this.props

    const bgType = background.backgroundTypes

    if (bgType == 'SolidColor') {
      return <div>
        <ColorPicker
          title=''
          // object='background'
          object='SolidColor'
          setColorPickerStore={setColorPickerStore}
          color={background.preset.SolidColor.color}
          handleChange={handleChangeBackgroundSolidColor}
          key='BackgroundColorPicker'
        />
      </div>
    }
    if (bgType == 'Gradient') {
      return <div className='gradientControls flexRow'>
        <div className='module__content--gradientcolors'>
          <ColorPicker
            title=''
            // object='gradient1'
            object='GradientColor1'
            setColorPickerStore={setColorPickerStore}
            color={background.preset.Gradient.color1}
            handleChange={handleChangeBackgroundGradientColor}
            key='Gradient1ColorPicker'
          />
          <ColorPicker
            title=''
            // object='gradient2'
            object='GradientColor2'
            setColorPickerStore={setColorPickerStore}
            color={background.preset.Gradient.color2}
            handleChange={handleChangeBackgroundGradientColor}
            key='Gradient2ColorPicker'
          />
        </div>
        <div className="btn--secondary" onClick={handleBackgroundRandomizeGradient}>Randomize Gradient</div>
        <div className="btn--secondary" onClick={handleChangeBackgroundAngleGradient}>Rotate</div>
      </div>
    }
    // if (bgType == 'Noise') {
    //   return <div>
    //   </div>
    // }
    // if (bgType == 'Pixels') {
    //   return <div>
    //   </div>
    // }
  }

  //////////////////////////////////////////////////////// RENDER
  
  render() {
    const { background, handleRandomizeModule, handleTabClickBackground } = this.props
    
    const nbBgTypes = background.backgroundTypes.length

    return <div className="moduleContainer">
      <HeaderModule
        title={background.moduleName}
        handleRandomizeModule={handleRandomizeModule}
        moduleType='Background'
        handleOpenModule={this.handleOpenModule}
        isOpen={this.state.isOpen}
      />
      
      { this.state.isOpen ? (
          nbBgTypes > 1 ? (
            <div className="moduleContent_Background"> 
              <TabButtonSet
                options={background.preset}
                value={background.currentBackgroundType}
                handleClick={handleTabClickBackground}
              />
              {this.renderModuleContentWithTabs()}
            </div>
          ) : (
            <div className="module__content">{this.renderModuleContentAlone()}</div>
          )
        ) : null
      }

    </div>
  }
}
