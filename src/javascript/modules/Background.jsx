import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import HeaderModule from '../components/HeaderModule.jsx'
import TabButtonSet from '../components/TabButtonSet.jsx'
import PlainColor from '../components/PlainColor.jsx'

export default class Background extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentBgType: this.props.currentBgType
    }
  }

  handleTabClick = (type) => {
    this.props.setCurrentBgType(type)
    this.setState({currentBgType: type})
  }

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

  renderBgType = (property, value) => {
    // const { synthSettings } = this.state
    // synth.oscillator.type = value
    // synthSettings.oscillator.type = value

    // this.setState({
    //   synthSettings
    // })
  }
  
  render() {
    const { moduleName, availablebgTypes } = this.props

    return <div className="ModuleContainer">
      <HeaderModule
        title={moduleName}
      />
      <div className="ModuleContent">
        <TabButtonSet
          options={availablebgTypes}
          value={this.state.currentBgType}
          handleClick={this.handleTabClick}
        />
        {this.renderBgType}
      </div>
    </div>
  }
}
