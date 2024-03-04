import React, { Component } from 'react'
import ReactDOM from 'react-dom'

// import TabButtonSet from '../components/TabButtonSet'
import HeaderModule from '../components/HeaderModule.jsx'
// import PlainColor from '../components/PlainColor'

export default class Background extends Component {
  constructor(props) {
    super(props)
  }
  
  // render() {
  //   return <div className="Background">
  //   </div>
  // }

  /////////////////////////////////////////////////////////

  // renderBackgroundTypes() {
  //   const {
  //     backgroundTypeList,
  //     setPlainColorStore,
  //     setGradientStore
  //   } = this.props

  //   const backgroundTypes = []

  //   backgroundTypeList.forEach((backgroundTypeName) => {
  //     if (backgroundTypeName == 'PlainColor') {
  //       backgroundTypes.push(
  //         <PlainColor
  //           setColorValue={setPlainColorStore}
  //           key={index}
  //         />
  //       )
  //     }

  //     if (backgroundTypeName == 'Gradient') {
  //       backgroundTypes.push(
  //         <Gradient
  //           setGradientValue={setGradientStore}
  //           key={index}
  //         />
  //       )
  //     }

  //     if (background)
  //   });

  //   return backgroundTypes
  // }

  // renderContentBackgroundType() {
  //   const { backgroundTypeList } = this.props

  //   const backgroundTypeContent = []

  //   backgroundTypeList.forEach((backgroundTypeName, index) => {
  //     ///////////????///////
  //   });

  //   return backgroundTypeContent
  // }

  // handlePresetSwitchClick = (instrumentId, presetIndex) => {
  //   const instruments = structuredClone(this.state.instruments)
  //   const chains = structuredClone(this.state.chains)

  //   const instrument = instruments.find(
  //     (instrument) => instrument.id === instrumentId
  //   )

  //   instruments.forEach((ins) => {
  //     if (ins.id === instrumentId) {
  //       ins.settings.preset = presetIndex
  //       ins.settings.sequence = presetIndex
  //     }
  //   })

  //   const chain = chains.find(
  //     (chain) => chain.name === instrument.settings.chain
  //   )

  //   chains.forEach((c) => {
  //     chain.settings.preset = presetIndex
  //   })

  //   const instrumentNode = nodes[instrumentId]
  //   const instrumentPreset = instrument.presets[presetIndex]
  //   const loopSequence = instrument.sequences[presetIndex]
  //   const loopNode = nodes[instrument.loopNodeId]

  //   this.changeNodeSettings(instrument.type, instrumentNode, instrumentPreset)
  //   this.changeLoopSequence(loopNode, loopSequence)

  //   chain.effectIds.forEach((effectId, i) => {
  //     const effectNode = nodes[effectId]
  //     const effectPreset = chain.presets[presetIndex][effectNode.name]
  //     this.changeNodeSettings(effectNode.name, effectNode, effectPreset)
  //   })

  //   this.setState({
  //     instruments,
  //     chains
  //   })
  // }

  //what is presetIndex?
  // handleChange = (presetIndex) => {
  //   handlePresetSwitchClick(backgroundTypeList.backgroundTypeName, presetIndex)
  // }

  //////////////////////////////// render content

  // renderBgType = (type) => {
  //   const {
  //     setColorValue,
  //     // availablebgTypes,
  //     index
  //   } = this.props

  //   const type = []

  //   if (this.props.currentBgType == 'PlainColor') {
  //     type.push(
  //       <PlainColor 
  //         setColorValue={setColorValue}
  //         key={index}
  //       />
  //     )
  //   }

  //   // bgTypes = ['color', 'shapes', 'circle', 'disc']
  //   // const bg = sample(bgTypes)

  //   // switch (bg) {
  //   //   case 'color':
  //   //     p.background(r, g, b)
  //   //     break;
  //   //   case 'shapes':
  //   //     drawShapes(p)
  //   //     break;
  //   //   case 'circle':
  //   //     p.ellipse(xCenter, yCenter, bgCircleWidth)
  //   //     break;
  //   //   case 'disc':
  //   //     p.background(0)
  //   //     p.image(imgDisc, 0, 0, canvasSize, canvasSize)
  //   //     break;

  //   //   default:
  //   //     break;
  //   // }

  //   // availablebgTypes.forEach((bgtype, index) => {
  //     // if (bgtype == this.props.currentBgType == 'PlainColor') {
  //     //   type.push(
  //     //     <PlainColor 
  //     //       setColorValue={setColorValue}
  //     //       key={index}
  //     //     />
  //     //   )
  //     // }
  //   // })

  //   return type

  //   this.setState({
  //     type
  //   })
  // }

  // renderBgType = (property, value) => {
    // const { synthSettings } = this.state
    // synth.oscillator.type = value
    // synthSettings.oscillator.type = value

    // this.setState({
    //   synthSettings
    // })
  // }


  render() {
    const { getBackgroundStore, backgroundTypeList } = this.props

    return <div className="ModuleBackground">
      <HeaderModule
        title={getBackgroundStore.moduleName}
      />
      {/* <div className="ModuleContentContainer">
        <TabButtonSet
          // instrumentId={instrument.id}
          options={backgroundTypeList}
          value={(backgroundTypeList.backgroundTypeName)}
          handleChange={handleChange}
        />
        {this.renderContentBackgroundType()}
      </div> */}
    </div>
  }
}
