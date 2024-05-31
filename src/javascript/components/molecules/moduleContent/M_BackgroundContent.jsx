import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import TabButtonSet from '../../TabButtonSet.jsx'
// import ColorPicker from '../../ColorPicker.jsx'
// import M_GradientOrientation from '../controls/M_GradientAngle.jsx'
// import M_GradientColors from '../controls/M_GradientColors.jsx'
import TabImageSet from '../../TabImageSet.jsx'
import IconToggle from '../../buttons/IconToggle.jsx'
import M_Control from '../controls/M_Control.jsx'
import M_GradientDirection from '../controls/M_GradientDirection.jsx'

export default class M_BackgroundContent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tabsLock: this.props.background.locked,
      solidColorLock : this.props.background.preset.SolidColor?.locked,
      gradientLock: this.props.background.preset.Gradient?.locked,
      gradientTypeLock: this.props.background.preset.Gradient?.typeLocked,
      gradientAngleLock: this.props.background.preset.Gradient?.angle.locked,
      gradientStopQuantityLock: this.props.background.preset.Gradient?.stops.locked,
      noiseLock: this.props.background.preset.Noise?.locked,
      pixelsLock: this.props.background.preset.Pixels?.locked,
    }

  }

  /////////////////////////// LOCK/UNLOCK ITEMS ///////////////////////////

  handleToggle = (item, setStore) => {
    
    
    if (item == 'lockTabs') {
      setStore(item, !this.state.tabsLock)
      this.setState({
        tabsLock: !this.state.tabsLock
      })
    }
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
    if (item == 'lockGradientType') {
      setStore(item, !this.state.gradientTypeLock)
      this.setState({
        gradientTypeLock: !this.state.gradientTypeLock
      })
    }
    if (item == 'lockGradientAngle') {
      setStore(item, !this.state.gradientAngleLock)
      this.setState({
        gradientAngleLock: !this.state.gradientAngleLock
      })
    }
    if (item == 'lockGradientStopQuantity') {
      setStore(item, !this.state.gradientStopQuantityLock)
      this.setState({
        gradientStopQuantityLock: !this.state.gradientStopQuantityLock
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

  renderTabContent() {
    
    const {
      background,
      setBackgroundStore,
      handleChangeBackgroundSolidColor,
      handleChangeBackgroundGradientColor,
      handleChangeBackgroundAngleGradient,
      handleChangeBackgroundGradientStopQuantity,
      handleChangeBackgroundGradientType,
      handleTabClickNoise
    } = this.props

    // console.log(gradientTypes);
    
    ////////////// SOLID COLOR

    if (background.currentBackgroundType == 'SolidColor') {
      return (
        <M_Control
          orientation="row"
          controlType='ColorPicker'
          hasTitle={false}

          isLocked={this.state.solidColorLock}
          setStore={setBackgroundStore}
          item='lockSolidColor'
          handleToggle={this.handleToggle}

          data={background.preset.SolidColor.color}
          object='SolidColor'
          handleChange={handleChangeBackgroundSolidColor}
          type='BackgroundColorPicker'
        />
      )
    }

    ////////////// GRADIENT

    if (background.currentBackgroundType == 'Gradient') {
      return <div className="BackgroundContent_TabContent row">
        <div className='TabContent-column'>
          <M_Control
            orientation="row"
            controlType='GradientColors'
            hasTitle={false}

            isLocked={this.state.gradientLock}
            setStore={setBackgroundStore}
            item='lockGradient'
            handleToggle={this.handleToggle}

            data={background.preset.Gradient.color1}
            data2={background.preset.Gradient.color2}
            handleChange={handleChangeBackgroundGradientColor}
          />
          <div className='gradientDirection'>
            <M_Control
              orientation="row"
              controlType='ToggleIconSet'

              isLocked={this.state.gradientTypeLock}
              setStore={setBackgroundStore}
              item='lockGradientType'
              handleToggle={this.handleToggle}

              handleChange={handleChangeBackgroundGradientType}
              data={background.preset.Gradient.gradientTypes}
              data2={background.preset.Gradient.currentGradientType}
            />
            { background.preset.Gradient.currentGradientType == 'Linear' ?
              <M_Control
                orientation="row"
                controlType='GradientAngle'

                isLocked={this.state.gradientAngleLock}
                setStore={setBackgroundStore}
                item='lockGradientAngle'
                handleToggle={this.handleToggle}

                handleChange={handleChangeBackgroundAngleGradient}
              />
              : null
            }
          </div>
          {/* <M_GradientDirection
             gradientAngleLock={this.state.gradientAngleLock}
            //  gradientTypeLock={this.state.gradientTypeLock}
             setBackgroundStore={setBackgroundStore}
             handleToggle={this.handleToggle}

             handleChangeBackgroundAngleGradient={handleChangeBackgroundAngleGradient}
          /> */}
        </div>
        <div className='TabContent-column'>
          <M_Control
            orientation="row"
            controlType='NumberInput'
            hasTitle={true}
            title='Color stops'

            isLocked={this.state.gradientStopQuantityLock}
            setStore={setBackgroundStore}
            item='lockGradientStopQuantity'
            handleToggle={this.handleToggle}

            data={background.preset.Gradient.stops.quantity}
            data2={background.preset.Gradient.stops}
            handleChange={handleChangeBackgroundGradientStopQuantity}
            
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

  // renderModuleContentUnits() {
  //   const { background, setColorPickerStore, handleChangeBackgroundSolidColor, handleChangeBackgroundGradientColor, handleBackgroundRandomizeGradient, handleChangeBackgroundAngleGradient, setBackgroundStore } = this.props

  //   const bgType = background.backgroundTypes

  //   if (bgType == 'SolidColor') {
  //     return (
  //       <M_Control
  //         isLocked={this.state.solidColorLock}
  //         setStore={setBackgroundStore}
  //         item='lockSolidColor'
  //         handleToggle={this.handleToggle}
  //         title=''
  //         controlType='ColorPicker'

  //         // text={background.SolidColor.color}
  //         object='SolidColor'
  //         color={background.preset.SolidColor.color}
  //         handleChange={handleChangeBackgroundSolidColor}
  //         type='BackgroundColorPicker'
  //       />
  //     )
  //   }
  //   if (bgType == 'Gradient') {
  //     return <div className="BackgroundContent_TabContent">
  //       <div className='tabContent-column'>
  //         <div className='module__content--gradientcolors'>
  //           <ColorPicker
  //             title=''
  //             // object='gradient1'
  //             object='GradientColor1'
  //             setColorPickerStore={setColorPickerStore}
  //             color={background.preset.Gradient.color1}
  //             handleChange={handleChangeBackgroundGradientColor}
  //             key='Gradient1ColorPicker'
  //           />
  //           <ColorPicker
  //             title=''
  //             // object='gradient2'
  //             object='GradientColor2'
  //             setColorPickerStore={setColorPickerStore}
  //             color={background.preset.Gradient.color2}
  //             handleChange={handleChangeBackgroundGradientColor}
  //             key='Gradient2ColorPicker'
  //           />
  //         </div>
  //         {/* FAIRE BUTTON ICON ROTATE */}
  //         <div className="btn--secondary" onClick={handleChangeBackgroundAngleGradient}>Rotate</div>
  //       </div>
  //       <div className='tabContent-column'>
  //         <M_Control
  //           isLocked={this.state.gradientStopQuantityLock}
  //           setStore={setBackgroundStore}
  //           item='lockGradientStopQuantity'
  //           handleToggle={this.handleToggle}
  //           title='Add color stops'

  //         />
  //       </div>
  //     </div>
  //   }
  //   // if (bgType == 'Noise') {
  //   //   return <div>
  //   //   </div>
  //   // }
  //   // if (bgType == 'Pixels') {
  //   //   return <div>
  //   //   </div>
  //   // }
  // }

  //////////////////////////////////////////////////////// RENDER
  
  render() {
    const { background, handleTabClickBackground, setBackgroundStore } = this.props
    
    const nbBgTypes = background.backgroundTypes.length

    return (
    <div className="M_BackgroundContent">
      {nbBgTypes > 1 ? (

        <div className="BackgroundContent_WithTabs">
          <div className="BackgroundContent_Tabs">
            <IconToggle
              isLocked={this.state.tabsLock}
              setStore={setBackgroundStore}
              item='lockTabs'
              handleToggle={this.handleToggle}
            />
            <TabButtonSet
              options={background.preset}
              value={background.currentBackgroundType}
              handleClick={handleTabClickBackground}
            />
          </div>
        {/* <div className="BackgroundContent_TabContent"> */}
          {this.renderTabContent()}
          {/* </div> */}
        </div>

      ) : (
        this.renderModuleContentUnits()
      )}
    </div>
    )
  }
}