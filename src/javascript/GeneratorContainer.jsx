import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import html2canvas from "html2canvas";
import { generateHash } from './utilities.js'

import Shapes from './modules/Shapes.jsx'
import Particles from './modules/Particles.jsx'
import Image from './modules/Image.jsx'
import Background from './modules/Background.jsx'
import BackgroundImage from './modules/BackgroundImage.jsx'
import Vinyl from './modules/Vinyl.jsx'
// import Text1 from './modules/Text1.jsx'
import Lines from './modules/Lines.jsx'
import Module3D from './modules/Module3D.jsx'
import BasicTypo from './modules/BasicTypo.jsx'
import Overlay from './modules/Overlay.jsx'

let size



export default class GeneratorContainer extends Component {
  constructor(props) {
    super(props)
    this.sketchContainerRef = React.createRef();
  }

  componentDidMount() {
    const sketchContainer = this.sketchContainerRef.current;
    const { clientWidth, clientHeight } = sketchContainer;
    // const size = parseInt(Math.min(clientWidth, clientHeight))
    size = parseInt(Math.min(clientWidth, clientHeight))

    // this.saveCanvasSize(size)

    this.props.initSketch('sketch', size);


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
      backgroundImage,
      setBackgroundImageStore,
      vinyl,
      setVinylStore,
      // text1,
      // setText1Store,
      lines,
      setLinesStore,
      module3D,
      set3DStore,
      basictypo,
      setBasicTypoStore,
      overlay,
      setOverlayStore,
      randomizeModuleStore
      // setCanvasSizeStore
    } = this.props

    const modules = []

    moduleList.forEach((moduleName, index) => {
      if (moduleName == 'Shapes') {
        modules.push(
          <Shapes
            shapes={shapes}
            setShapesStore={setShapesStore}
            key={index}
            randomizeModuleStore={randomizeModuleStore}
          />
        )
      }

      if (moduleName == 'Particles') {
        modules.push(
          <Particles
            particles={particles}
            setParticlesStore={setParticlesStore}
            key={index}
            randomizeModuleStore={randomizeModuleStore}
          />
        )
      }

      if (moduleName == 'Image') {
        modules.push(
          <Image
            setImageValue={setImageStore}
            key={index}
            randomizeModuleStore={randomizeModuleStore}
          />
        )
      }

      if (moduleName == 'Background') {
        modules.push(
          <Background
            background={background}
            setBackgroundStore={setBackgroundStore}
            key={index}
            randomizeModuleStore={randomizeModuleStore}
          />
        )
      }

      if (moduleName == 'BackgroundImage') {
        modules.push(
          <BackgroundImage
            backgroundImage={backgroundImage}
            setBackgroundImageStore={setBackgroundImageStore}
            key={index}
            randomizeModuleStore={randomizeModuleStore}
          />
        )
      }

      if (moduleName == 'Vinyl') {
        modules.push(
          <Vinyl
            vinyl={vinyl}
            setVinylStore={setVinylStore}
            // sliderMax={size}
            key={index}
            randomizeModuleStore={randomizeModuleStore}
          />
        )
      }

      // if (moduleName == 'Text1') {
      //   modules.push(
      //     <Text1
      //       text1={text1}
      //       setText1Store={setText1Store}
      //       key={index}
      //     />
      //   )
      // }

      if (moduleName == 'BasicTypo') {
        modules.push(
          <BasicTypo
            basictypo={basictypo}
            setBasicTypoStore={setBasicTypoStore}
            key={index}
            randomizeModuleStore={randomizeModuleStore}
          />
        )
      }

      if (moduleName == 'Lines') {
        modules.push(
          <Lines
            lines={lines}
            setLinesStore={setLinesStore}
            key={index}
            randomizeModuleStore={randomizeModuleStore}
          />
        )
      }

      if (moduleName == 'Module3D') {
        modules.push(
          <Module3D
            module3D={module3D}
            set3DStore={set3DStore}
            key={index}
            randomizeModuleStore={randomizeModuleStore}
          />
        )
      }

      if (moduleName == 'Overlay') {
        modules.push(
          <Overlay
            overlay={overlay}
            setOverlayStore={setOverlayStore}
            key={index}
            randomizeModuleStore={randomizeModuleStore}
          />
        )
      }

    })

    return modules
  }

  DownloadImage = () => {
    html2canvas(document.getElementById("defaultCanvas0")).then(function (canvas) {
      let a = document.createElement("a");
      a.href = canvas.toDataURL("image/jpeg");
      a.download = `cover-${generateHash()}.jpeg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  };

  GenerateCover = () => {
    // this.props.generateAllStore()
    const container = document.getElementById('reactComponentRoot')
    const generatorName = container.dataset.generator
    // this.props.initStore(generatorName)
    window.resetSketch()
    this.props.generateAllStore(generatorName)
      // .then(() => {
      //   this.renderModules()
      //   // this.setState({
      //   //   sliderOpacity: newValue[0]
      //   // })
      // })
  }

  // saveCanvasSize(size) {
  //   this.props.setCanvasSizeStore(size)
  // }

  render() {
    // const { generateAll } = this.props

    return <div className="generator__content">
      <div className='generator__modules-wrap'>
      {this.renderModules()}
      </div>
      <div className="generator__sketch-wrap">
        <div className="sketch" id="sketch" ref={this.sketchContainerRef}>
        </div>
        <div className="generator__sketch-controls">
          <div className="btn--big" onClick={this.GenerateCover}>GENERATE</div>
          <div className="btn--primary" onClick={this.DownloadImage}>Download image</div>
        </div>
      </div>
    </div>
  }
}
