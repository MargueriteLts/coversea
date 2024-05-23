import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import TabButtonSet from '../../TabButtonSet.jsx'
import ColorPicker from '../../ColorPicker.jsx'
import M_GradientOrientation from '../../M_GradientOrientation.jsx'
import M_GradientColors from '../../M_GradientColors.jsx'
import TabImageSet from '../../TabImageSet.jsx'
import IconToggle from '../../buttons/IconToggle.jsx'

export default class M_BackgroundContent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      solidColorLock : this.props.background.preset.SolidColor?.locked,
      gradientLock: this.props.background.preset.Gradient?.locked,
      noiseLock: this.props.background.preset.Noise?.locked,
      pixelsLock: this.props.background.preset.Pixels?.locked
    }

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
      handleChangeBackgroundSolidColor,
      handleChangeBackgroundGradientColor,
      handleChangeBackgroundAngleGradient,
      handleTabClickNoise
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
      // return (
      //   <M_Controls
      //     isLocked={this.state.solidColorLock}
      //     setStore={setBackgroundStore}
      //     item='lockSolidColor'
      //     handleToggle={this.handleToggle}
      //     title=''
      //     controlType='solidColor'

      //     text={background.SolidColor.color}
      //     object='SolidColor'
      //     color={background.preset.SolidColor.color}
      //     handleChange={handleChangeBackgroundSolidColor}
      //     key='BackgroundColorPicker'
      //   />
      // )
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

  renderModuleContentUnits() {
    const { background, setColorPickerStore, handleChangeBackgroundSolidColor, handleChangeBackgroundGradientColor, handleBackgroundRandomizeGradient, handleChangeBackgroundAngleGradient, setBackgroundStore } = this.props

    const bgType = background.backgroundTypes

    if (bgType == 'SolidColor') {
      return <div>
        <IconToggle
          isLocked={this.state.solidColorLock}
          setStore={setBackgroundStore}
          item='lockSolidColor'
          handleToggle={this.handleToggle}
        />
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
    const { background, handleTabClickBackground } = this.props
    
    const nbBgTypes = background.backgroundTypes.length

    console.log('in M_BgC');
    console.log(background);

    return (
    <div className="M_BackgroundContent">
      {nbBgTypes > 1 ? (
        <div className="M_BackgroundContent-WithTabs">
          <TabButtonSet
            options={background.preset}
            value={background.currentBackgroundType}
            handleClick={handleTabClickBackground}
          />
          {this.renderModuleContentWithTabs()}
        </div>
      ) : (
        this.renderModuleContentUnits()
      )}
    </div>
    )
  }
}