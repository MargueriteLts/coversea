import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import HeaderModule from '../components/HeaderModule.jsx'
import TabButtonSet from '../components/TabButtonSet.jsx'
import ColorPicker from '../components/ColorPicker.jsx'

export default class Background extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentBgType: this.props.background.currentBgType,
      color: this.props.background.preset.SolidColor.color,
      colorG1: this.props.background.preset.Gradient.color1,
      colorG2: this.props.background.preset.Gradient.color2
    }
  }

  handleTabClick = (type) => {
    this.props.setBackgroundStore('CurrentTabChange', type)

    this.setState({
      currentBgType: type
    })
  }

  handleChangeSolidColor = (object, value) => {
    this.props.setBackgroundStore(object, value)
    .then((color) => {
      this.setState({
        color: color[0]
      })
    })
  }

  ///////////////////////// GRADIENT

  handleRandomizeGradient = () => {
    this.props.setBackgroundStore('Gradient')
      .then((colors) => {
        this.setState({
          colorG1: colors[0],
          colorG2: colors[1]
        })
      }
    )
  }

  handleChangeGradientColor = (object, value) => {
    this.props.setBackgroundStore(object, value)
    .then((colors) => {
        this.setState({
          colorG1: colors[0],
          colorG2: colors[1]
        })
      }
    )
  }

  handleChangeAngleGradient = () => {
    this.props.setBackgroundStore('AngleGradient')
  }

  ///////////////////////// RENDER CONTENT BACKGROUND TAB

  renderBgContent() {
    const {background, setColorPickerStore } = this.props

    ////////////// SOLID COLOR

    if (this.state.currentBgType == 'SolidColor') {
      return <div className='module__content--bgmodule-controls'>
        <ColorPicker
          title=''
          // object='background'
          object='SolidColor'
          setColorPickerStore={setColorPickerStore}
          color={this.state.color}
          handleChange={this.handleChangeSolidColor}
          key='BackgroundColorPicker'
        />
      </div>
    }

    ////////////// GRADIENT

    if (this.state.currentBgType == 'Gradient') {
      return <div className='module__content--bgmodule-controls'>
        <div className='module__content--gradientcolors'>
          <ColorPicker
            title=''
            // object='gradient1'
            object='GradientColor1'
            setColorPickerStore={setColorPickerStore}
            color={this.state.colorG1}
            handleChange={this.handleChangeGradientColor}
            key='Gradient1ColorPicker'
          />
          <ColorPicker
            title=''
            // object='gradient2'
            object='GradientColor2'
            setColorPickerStore={setColorPickerStore}
            color={this.state.colorG2}
            handleChange={this.handleChangeGradientColor}
            key='Gradient2ColorPicker'
          />
        </div>
        <div className="btn--secondary" onClick={this.handleRandomizeGradient}>Randomize Gradient</div>
        <div className="btn--secondary" onClick={this.handleChangeAngleGradient}>Rotate</div>
      </div>
    }
  }

  //////////////////////////////// NO TAB RENDER

  renderBgContentOnly() {
    const { background, setColorPickerStore } = this.props

    const bgType = background.bgTypes

    if (bgType == 'SolidColor') {
      return <div>
        <ColorPicker
          title=''
          // object='background'
          object='SolidColor'
          setColorPickerStore={setColorPickerStore}
          color={this.state.color}
          handleChange={this.handleChangeSolidColor}
          key='BackgroundColorPicker'
        />
      </div>
    }
    if (bgType == 'Gradient') {
      return <div className='gradientControls'>
        <div className='gradientColors'>
          <ColorPicker
            title=''
            // object='gradient1'
            object='GradientColor1'
            setColorPickerStore={setColorPickerStore}
            color={this.state.colorG1}
            handleChange={this.handleChangeGradientColor}
            key='Gradient1ColorPicker'
          />
          <ColorPicker
            title=''
            // object='gradient2'
            object='GradientColor2'
            setColorPickerStore={setColorPickerStore}
            color={this.state.colorG2}
            handleChange={this.handleChangeGradientColor}
            key='Gradient2ColorPicker'
          />
        </div>
        <div className="Button" onClick={this.handleRandomizeGradient}>Randomize Gradient</div>
        <div className="Button" onClick={this.handleChangeAngleGradient}>Rotate</div>
      </div>
    }
    if (bgType == 'Noise') {
      return <div>
      </div>
    }
    if (bgType == 'Pixels') {
      return <div>
      </div>
    }
  }

  //////////////////////////////////////////////////////// RENDER
  
  render() {
    const { background } = this.props
    const nbBgTypes = background.bgTypes.length

    return <div className="module__container">
      <HeaderModule
        title={background.moduleName}
        // randomize={}
      />
      { nbBgTypes > 1
        ? <div className="module__content--bgmodule flexColumn"> 
            <TabButtonSet
              options={background.preset}
              value={this.state.currentBgType}
              handleClick={this.handleTabClick}
            />
            {this.renderBgContent()}
          </div>
        : <div className="ModuleContentBgOnly ">{this.renderBgContentOnly()}</div>
      }
    </div>
  }
}
