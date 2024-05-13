import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import HeaderModule from '../components/HeaderModule.jsx'
import TabButtonSet from '../components/TabButtonSet.jsx'
import ColorPicker from '../components/ColorPicker.jsx'

export default class Background extends Component {
  constructor(props) {
    super(props)
  }

  ///////////////////////// RENDER CONTENT BACKGROUND TAB

  renderBgContent() {
    const { setColorPickerStore, handleChangeBackgroundSolidColor, handleChangeBackgroundGradientColor, handleBackgroundRandomizeGradient, handleChangeBackgroundAngleGradient, currentBgType, solidColor, colorG1, colorG2 } = this.props

    ////////////// SOLID COLOR

    if (currentBgType == 'SolidColor') {
      return <div className='module__content--bgmodule-controls'>
        <ColorPicker
          title=''
          // object='background'
          object='SolidColor'
          setColorPickerStore={setColorPickerStore}
          color={solidColor}
          handleChange={handleChangeBackgroundSolidColor}
          key='BackgroundColorPicker'
        />
      </div>
    }

    ////////////// GRADIENT

    if (currentBgType == 'Gradient') {
      return <div className='module__content--bgmodule-controls'>
        <div className='module__content--gradientcolors'>
          <ColorPicker
            title=''
            // object='gradient1'
            object='GradientColor1'
            setColorPickerStore={setColorPickerStore}
            color={colorG1}
            handleChange={handleChangeBackgroundGradientColor}
            key='Gradient1ColorPicker'
          />
          <ColorPicker
            title=''
            // object='gradient2'
            object='GradientColor2'
            setColorPickerStore={setColorPickerStore}
            color={colorG2}
            handleChange={handleChangeBackgroundGradientColor}
            key='Gradient2ColorPicker'
          />
        </div>
        <div className="btn--secondary" onClick={handleBackgroundRandomizeGradient}>Randomize Gradient</div>
        <div className="btn--secondary" onClick={handleChangeBackgroundAngleGradient}>Rotate</div>
      </div>
    }
  }

  //////////////////////////////// NO TAB RENDER

  renderBgContentOnly() {
    const { background, setColorPickerStore, handleChangeBackgroundSolidColor, handleChangeBackgroundGradientColor, handleBackgroundRandomizeGradient, handleChangeBackgroundAngleGradient, solidColor, colorG1, colorG2 } = this.props

    const bgType = background.bgTypes

    if (bgType == 'SolidColor') {
      return <div>
        <ColorPicker
          title=''
          // object='background'
          object='SolidColor'
          setColorPickerStore={setColorPickerStore}
          color={solidColor}
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
            color={colorG1}
            handleChange={handleChangeBackgroundGradientColor}
            key='Gradient1ColorPicker'
          />
          <ColorPicker
            title=''
            // object='gradient2'
            object='GradientColor2'
            setColorPickerStore={setColorPickerStore}
            color={colorG2}
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
    const { background, handleRandomizeModule, handleTabClickBackground, currentBgType } = this.props
    const nbBgTypes = background.bgTypes.length

    return <div className="module__container">
      <HeaderModule
        title={background.moduleName}
        handleRandomizeModule={handleRandomizeModule}
        moduleType='Background'
      />
      { nbBgTypes > 1
        ? <div className="module__content--bgmodule flexColumn"> 
            <TabButtonSet
              options={background.preset}
              value={currentBgType}
              handleClick={handleTabClickBackground}
            />
            {this.renderBgContent()}
          </div>
        : <div className="module__content">{this.renderBgContentOnly()}</div>
      }
    </div>
  }
}
