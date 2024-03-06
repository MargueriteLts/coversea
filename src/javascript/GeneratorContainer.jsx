import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Shapes from './modules/Shapes.jsx'
import Particles from './modules/Particles.jsx'
import Image from './modules/Image.jsx'
import Background from './modules/Background.jsx'

export default class GeneratorContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.initSketch('sketch')
  }

  renderModules() {
    const {
      moduleList,
      shapes,
      particles,
      setShapesStore,
      setParticlesStore,
      setImageStore,
      background,
      setBackgroundStore,
      setCurrentBgTypeStore,
      // setTitleCurrentBackgroundStore,
      // currenBgTitle,
      // setTitleCurrentBgStore,
      // backgroundType,
      bgTypeTitles,
      setColorBackgroundStore,
      setColorValueStore
    } = this.props

    const modules = []

    moduleList.forEach((moduleName, index) => {
      if (moduleName == 'Shapes') {
        modules.push(
          <Shapes
            sliderValue={shapes.sliderValue}
            setSliderValue={setShapesStore}
            key={index}
          />
        )
      }

      if (moduleName == 'Particles') {
        modules.push(
          <Particles
            sliderValue={particles.sliderValue}
            setSliderValue={setParticlesStore}
            key={index}
          />
        )
      }

      if (moduleName == 'Image') {
        modules.push(
          <Image
            setImageValue={setImageStore}
            key={index}
          />
        )
      }

      if (moduleName == 'Background') {
        modules.push(
          <Background
            background={background}
            setBackgroundStore={setBackgroundStore}
            key={index}
          />
        )
      }
    })

    return modules
  }

  render() {
    return <div className="GeneratorContainer">
      {this.renderModules()}
      <div className="sketch" id="sketch"></div>
    </div>
  }
}
