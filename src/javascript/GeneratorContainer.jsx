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
import Text1 from './modules/Text1.jsx'
import Lines from './modules/Lines.jsx'
import Module3D from './modules/Module3D.jsx'


export default class GeneratorContainer extends Component {
  constructor(props) {
    super(props)
    this.sketchContainerRef = React.createRef();
  }

  componentDidMount() {
    const sketchContainer = this.sketchContainerRef.current;
    const { clientWidth, clientHeight } = sketchContainer;
    const size = parseInt(Math.min(clientWidth, clientHeight))

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
      text1,
      setText1Store,
      lines,
      setLinesStore,
      module3D,
      set3DStore
    } = this.props

    const modules = []

    moduleList.forEach((moduleName, index) => {
      if (moduleName == 'Shapes') {
        modules.push(
          <Shapes
            shapes={shapes}
            setShapesStore={setShapesStore}
            sliderValue={shapes.settings.sliderValue}
            key={index}
          />
        )
      }

      if (moduleName == 'Particles') {
        modules.push(
          <Particles
            particles={particles}
            setParticlesStore={setParticlesStore}
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

      if (moduleName == 'BackgroundImage') {
        modules.push(
          <BackgroundImage
            backgroundImage={backgroundImage}
            setBackgroundImageStore={setBackgroundImageStore}
            key={index}
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
          />
        )
      }

      if (moduleName == 'Text1') {
        modules.push(
          <Text1
            text1={text1}
            setText1Store={setText1Store}
            key={index}
          />
        )
      }

      if (moduleName == 'Lines') {
        modules.push(
          <Lines
            lines={lines}
            setLinesStore={setLinesStore}
            key={index}
          />
        )
      }

      if (moduleName == 'Module3D') {
        modules.push(
          <Module3D
            module3D={module3D}
            set3DStore={set3DStore}
            key={index}
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

  // saveCanvasSize(size) {
  //   this.props.setCanvasSizeStore(size)
  // }

  render() {
    return <div className="GeneratorContent">
      <div className='wrapModules'>
      {this.renderModules()}
      </div>
      <div className="wrapSketch">
        <div className="sketch" id="sketch" ref={this.sketchContainerRef}>
        </div>
        <div className="controls">
          <div className="ButtonPrimary" onClick={this.DownloadImage}>Download image</div>
        </div>
      </div>
    </div>
  }
}
