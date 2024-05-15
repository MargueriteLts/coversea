import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import HeaderModule from '../components/HeaderModule.jsx'
import TabButtonSet from '../components/TabButtonSet.jsx'
import ColorPicker from '../components/ColorPicker.jsx'
import M_GradientOrientation from '../components/M_GradientOrientation.jsx'
import M_GradientColors from '../components/M_GradientColors.jsx'

export default class Background extends Component {
  constructor(props) {
    super(props)
  }

  ///////////////////////// RENDER CONTENT BACKGROUND TAB

  renderModuleContentWithTabs() {
    const {
      background, 
      currentBackgroundType,
      handleChangeBackgroundSolidColor,
      handleChangeBackgroundGradientColor,
      handleBackgroundRandomizeGradient,
      handleChangeBackgroundAngleGradient, backgroundGradientColor1, backgroundGradientColor2
    } = this.props

    ////////////// SOLID COLOR

    if (currentBackgroundType == 'SolidColor') {
      return <div className='TabContent'>
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

    if (currentBackgroundType == 'Gradient') {
      return <div className='TabContent'>

        <div className='moduleContent-Left'>
          <M_GradientOrientation
            handleChangeBackgroundAngleGradient={handleChangeBackgroundAngleGradient}
          />
        </div>

        <div className='moduleContent-Right'>
          <M_GradientColors
            background={background}
            handleChangeBackgroundGradientColor={handleChangeBackgroundGradientColor}
            color1={backgroundGradientColor1}
            color2={backgroundGradientColor2}
          />
        </div>

        {/* je suppr pas pour l'instant mais a terme ca doit etre remplace par la fonction lock */}
        {/* <div className="btn--secondary" onClick={handleBackgroundRandomizeGradient}>Randomize Gradient</div> */}
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
    const { background, handleRandomizeModule, handleTabClickBackground, currentBackgroundType } = this.props
    const nbBgTypes = background.backgroundTypes.length

    return <div className="moduleContainer">
      <HeaderModule
        title={background.moduleName}
        handleRandomizeModule={handleRandomizeModule}
        moduleType='Background'
      />
      { nbBgTypes > 1
        ? <div className="moduleContent_Background"> 
            <TabButtonSet
              options={background.preset}
              value={currentBackgroundType}
              handleClick={handleTabClickBackground}
            />
            {this.renderModuleContentWithTabs()}
          </div>
        : <div className="module__content">{this.renderModuleContentAlone()}</div>
      }
    </div>
  }
}
