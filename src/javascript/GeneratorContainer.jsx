import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import html2canvas from "html2canvas";
import { generateHash } from './utilities.js'

///////////////MODULES
//Background
import Background from './modules/Background.jsx'
import BackgroundImage from './modules/BackgroundImage.jsx'
//Graphics
import Image from './modules/Image.jsx'
import Lines from './modules/Lines.jsx'
import Module3D from './modules/Module3D.jsx'
import Particles from './modules/Particles.jsx'
import Shapes from './modules/Shapes.jsx'
import Vinyl from './modules/Vinyl.jsx'
//Text
import BasicTypo from './modules/BasicTypo.jsx'
//Overlay
import Overlay from './modules/Overlay.jsx'


///////////////VAR
let size



export default class GeneratorContainer extends Component {
  constructor(props) {
    super(props)
    this.sketchContainerRef = React.createRef();

    this.state = {

      //BACKGROUND MODULE
      currentBgType: this.props.background?.currentBgType,
      solidColor: this.props.background?.preset.SolidColor.color,
      colorG1: this.props.background?.preset.Gradient.color1,
      colorG2: this.props.background?.preset.Gradient.color2,

      //BACKGROUND IMAGE MODULE
      currentBgImgCollection: this.props.backgroundImage?.currentCollection,
      bgImgOpacity: this.props.backgroundImage?.sliderValue,

      //LINES MODULE
      linesWeight: this.props.lines?.strokeWeight,

      //PARTICLES MODULE
      currentParticlesType: this.props.particles?.currentParticlesType,
      particlesQuantity: this.props.particles?.sliderValue,
      particlesColor: this.props.particles?.color,

      //SHAPES MODULE
      currentShapesType: this.props.shapes?.currentShapeType,
      shapesSize: this.props.shapes?.settings.sliderValue,
      shapesColor: this.props.shapes?.settings.color,

      //VINYL MODULE
      currentVinylType: this.props.vinyl?.currentVinylType,
      vinylSize: this.props.vinyl?.sliderValue,
      vinylOpacity: this.props.vinyl?.sliderOpacity,

      //OVERLAY MODULE
      currentOverlayCollection: this.props.overlay?.currentCollection,
      overlayOpacity: this.props.overlay?.opacityValue
    }
  }

  ///////

  componentDidMount() {
    const sketchContainer = this.sketchContainerRef.current;
    const { clientWidth, clientHeight } = sketchContainer;
    // const size = parseInt(Math.min(clientWidth, clientHeight))
    size = parseInt(Math.min(clientWidth, clientHeight))

    // this.saveCanvasSize(size)

    this.props.initSketch('sketch', size);


  }


////////////////////////////////////// MODULE BACKGROUND

  // Tab
  handleTabClickBackground = (type) => {
    this.props.setBackgroundStore('CurrentTabChange', type)

    this.setState({
      currentBgType: type
    })
  }

  // SolidColor
  handleChangeBackgroundSolidColor = (object, value) => {
    this.props.setBackgroundStore(object, value)
      .then((color) => {
        this.setState({
          solidColor: color[0]
        })
      })
  }

  // Gradient

  handleBackgroundRandomizeGradient = () => {
    this.props.setBackgroundStore('Gradient')
      .then((colors) => {
        this.setState({
          colorG1: colors[0],
          colorG2: colors[1]
        })
      }
    )
  }

  handleChangeBackgroundGradientColor = (object, value) => {
    this.props.setBackgroundStore(object, value)
    .then((colors) => {
        this.setState({
          colorG1: colors[0],
          colorG2: colors[1]
        })
      }
    )
  }

  handleChangeBackgroundGradientAngle = () => {
    this.props.setBackgroundStore('AngleGradient')
  }

////////////////////////////////////// MODULE BACKGROUND IMAGE

  // Tab
  handleTabClickBackgroundImage = (type) => {
    this.props.setBackgroundImageStore('CurrentTabChange', type)

    this.setState({
      currentCollection: type
    })
  }

  // Randomize
  handleChangeBackgroundImage = () => {
    if (this.state.currentBgImgCollection === 'NightClub'){
      this.props.setBackgroundImageStore('NightClub')
    }
    if (this.state.currentBgImgCollection === 'Cars'){
      this.props.setBackgroundImageStore('Cars')
    }
  }

  // Opacity
  handleBackgroundImageOpacity = (e) => {
    this.props.setBackgroundImageStore('opacity', e.target.value)
    this.setState({bgImgOpacity: e.target.value})
  }

  ////////////////////////////////////// MODULE LINES

  handleChangeLines = () => {
    this.props.setLinesStore('randomize')
  }

  handleLinesColor = (object, value) => {
    this.props.setLinesStore(object, value)
      .then((color) => {
        this.setState({
          linesColor: color[0]
        })
      }
    )
  }

  handleLinesSize = (e) => {
    let type = 'strokeWeight'
    this.props.setLinesStore(type, e.target.value)
    this.setState({linesWeight: e.target.value})
  }

  ////////////////////////////////////// MODULE PARTICLES
  
  // DropDown
  handleDropDownClickParticles = (type) => {
    this.props.setParticlesStore('CurrentTabChange', type)

      .then(([type]) => {
        this.setState({
          currentParticlesType: type
        })
      })
  }

  // Quantity
  handleParticlesQuantity = (e) => {
    let type = 'quantity'
    this.props.setParticlesStore(type, e.target.value)

      .then(([newValue]) => {
        this.setState({
          particlesQuantity: newValue
        })
      })
  }

  // Color
  handleParticlesColor = (object, value) => {
    this.props.setParticlesStore(object, value)
      .then((color) => {
        this.setState({
          particlesColor: color[0]
        })
      }
    )
  }

  ////////////////////////////////////// MODULE SHAPES

  // DropDown
  handleDropDownClickShapes = (type) => {
    this.props.setShapesStore('CurrentTabChange', type)

      .then((color) => {
        this.setState({
          currentShapesType: color[0]
        })
      })
  }

  // Size
  handleShapesSize = (e) => {
    let type = 'Size'
    this.props.setShapesStore(type, e.target.value)

      .then(([newValue]) => {
          this.setState({
            shapesSize: newValue
          })
        })
  }

  // Color
  handleShapesColor = (object, value) => {
    this.props.setShapesStore(object, value)
      .then((color) => {
        this.setState({
          shapesColor: color[0]
        })
      })
  }

  ////////////////////////////////////// MODULE VINYL

  // Tab
  handleTabClickVinyl = (type) => {
    this.props.setVinylStore('CurrentTabChange', type)

      .then(([type]) => {
        this.setState({
          currentVinylType: type
        })
      })
  }

  // Size
  handleVinylSize = (e) => {
    const value = e.target.value
    this.props.setVinylStore('size', value)

      .then(([newValue]) => {
        this.setState({
          vinylSize: newValue
        })
      })
  }

  // Opacity
  handleVinylOpacity = (e) => {
    const value = e.target.value
    this.props.setVinylStore('opacity', value)
    
      .then(([newValue]) => {
        this.setState({
          vinylOpacity: newValue
        })
      })
  }

  ////////////////////////////////////// MODULE OVERLAY

  // Tab
  handleTabClickOverlay = (type) => {
    this.props.setOverlayStore('CurrentTabChange', type)

    this.setState({
      currentCollection: type
    })
  }

  // Randomize
  handleChangeOverlay = () => {
    console.log('click');
    if (this.state.currentOverlayCollection === 'Plastic'){
      this.props.setOverlayStore('Plastic')
    }
    if (this.state.currentOverlayCollection === 'Stickers'){
      this.props.setOverlayStore('Stickers')
    }
  }

  // Opacity
  handleOverlayOpacity = (e) => {
    this.props.setOverlayStore('opacity', e.target.value)
    this.setState({overlayOpacity: e.target.value})
  }


  ////////////////////////////////////////////////////////////////////////////


  /////////////////////////// RANDOMIZE MODULE ///////////////////////////


  handleRandomizeModule = (moduleType) => {
    if (moduleType == 'Background') {
      this.props.randomizeModuleStore(moduleType)
        .then((newValues) => {
          this.setState({
            currentBgType: newValues[0],
            solidColor: newValues[1],
            colorG1: newValues[4],
            colorG2: newValues[5]
          })
        })
    }
    if (moduleType == 'BackgroundImage') {
      this.props.randomizeModuleStore(moduleType)
        .then((newValues) => {
          this.setState({
            currentBgImgCollection: newValues[0],
            bgImgOpacity: newValues[1]
          })
        })
    }
    if (moduleType == 'Particles') {
      this.props.randomizeModuleStore(moduleType)
        .then((newValues) => {
          this.setState({
            currentParticlesType: newValues[0],
            particlesQuantity: newValues[1],
            particlesColor: newValues[2]
          })
        })
    }
    if (moduleType == 'Shapes') {
      this.props.randomizeModuleStore(moduleType)
        .then((newValues) => {
          this.setState({
            currentShapesType: newValues[0],
            shapesColor: newValues[1],
            shapesSize: newValues[2]
          })
        })
    }
    if (moduleType == 'Vinyl') {
      this.props.randomizeModuleStore(moduleType)
        .then((newValues) => {
          this.setState({
            currentVinylType: newValues[0],
            vinylSize: newValues[1],
            vinylOpacity: newValues[2]
          })
        })
    }
    if (moduleType == 'Overlay') {
      this.props.randomizeModuleStore(moduleType)
        .then((newValues) => {
          this.setState({
            currentOverlayCollection: newValues[0],
            overlayOpacity: newValues[1]
          })
        })
    }
  }


/////////////////////////// RENDER MODULES ///////////////////////////

  renderModules() {
    const {
      moduleList,
      background,
      setBackgroundStore,
      shapes,
      particles,
      setShapesStore,
      setParticlesStore,
      setImageStore,
      backgroundImage,
      setBackgroundImageStore,
      vinyl,
      setVinylStore,
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

      if (moduleName == 'Background') {
        modules.push(
          <Background
            background={background}
            setBackgroundStore={setBackgroundStore}
            key={index}
            handleRandomizeModule={this.handleRandomizeModule}
            currentBgType={this.state.currentBgType}
            solidColor={this.state.solidColor}
            colorG1={this.state.colorG1}
            colorG2={this.state.colorG2}
            handleTabClickBackground={this.handleTabClickBackground}
            handleChangeBackgroundSolidColor={this.handleChangeBackgroundSolidColor}
            handleBackgroundRandomizeGradient={this.handleBackgroundRandomizeGradient}
            handleChangeBackgroundAngleGradient={this.handleChangeBackgroundGradientAngle}
          />
        )
      }
      if (moduleName == 'BackgroundImage') {
        modules.push(
          <BackgroundImage
            backgroundImage={backgroundImage}
            setBackgroundImageStore={setBackgroundImageStore}
            key={index}
            handleRandomizeModule={this.handleRandomizeModule}
            currentBgImgCollection={this.state.currentBgImgCollection}
            bgImgOpacity={this.state.bgImgOpacity}
            handleTabClickBackgroundImage={this.handleTabClickBackgroundImage}
            handleChangeBackgroundImage={this.handleChangeBackgroundImage}
            handleBackgroundImageOpacity={this.handleBackgroundImageOpacity}
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
      if (moduleName == 'Lines') {
        modules.push(
          <Lines
            lines={lines}
            setLinesStore={setLinesStore}
            key={index}
            handleRandomizeModuleStore={this.handleRandomizeModuleStore}
            handleChangeLines={this.handleChangeLines}
            handleLinesColor={this.handleLinesColor}
            handleLinesSize={this.handleLinesSize}
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
      if (moduleName == 'Particles') {
        modules.push(
          <Particles
            particles={particles}
            setParticlesStore={setParticlesStore}
            key={index}
            handleRandomizeModule={this.handleRandomizeModule}
            currentParticlesType={this.state.currentParticlesType}
            particlesQuantity={this.state.particlesQuantity}
            particlesColor={this.state.particlesColor}
            handleDropDownClickParticles={this.handleDropDownClickParticles}
            handleParticlesQuantity={this.handleParticlesQuantity}
            handleParticlesColor={this.handleParticlesColor}
          />
        )
      }
      if (moduleName == 'Shapes') {
        modules.push(
          <Shapes
            shapes={shapes}
            setShapesStore={setShapesStore}
            key={index}
            handleRandomizeModule={this.handleRandomizeModule}
            currentShapesType={this.state.currentShapesType}
            shapesColor={this.state.shapesColor}
            shapesSize={this.state.shapesSize}
            handleDropDownClickShapes={this.handleDropDownClickShapes}
            handleShapesColor={this.handleShapesColor}
            handleShapesSize={this.handleShapesSize}
          />
        )
      }
      if (moduleName == 'Vinyl') {
        modules.push(
          <Vinyl
            vinyl={vinyl}
            setVinylStore={setVinylStore}
            key={index}
            handleRandomizeModule={this.handleRandomizeModule}
            handleTabClickVinyl={this.handleTabClickVinyl}
            handleChangeVinylSize={this.handleVinylSize}
            handleVinylOpacity={this.handleVinylOpacity}
          />
        )
      }

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

      if (moduleName == 'Overlay') {
        modules.push(
          <Overlay
            overlay={overlay}
            setOverlayStore={setOverlayStore}
            key={index}
            handleRandomizeModule={this.handleRandomizeModule}
            currentOverlayCollection={this.state.currentOverlayCollection}
            overlayOpacity={this.state.overlayOpacity}
            handleTabClickOverlay={this.handleTabClickOverlay}
            handleChangeOverlay={this.handleChangeOverlay}
            handleOverlayOpacity={this.handleOverlayOpacity}
          />
        )
      }

    })

    return modules
  }

  /////////////////////////// DOWNLOAD COVER ///////////////////////////

  downloadImage = () => {
    html2canvas(document.getElementById("defaultCanvas0")).then(function (canvas) {
      let a = document.createElement("a");
      a.href = canvas.toDataURL("image/jpeg");
      a.download = `cover-${generateHash()}.jpeg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  };

  /////////////////////////// GENERATE COVER ///////////////////////////

  generateCover = () => {
    const container = document.getElementById('reactComponentRoot')
    const generatorName = container.dataset.generator
    const moduleList = this.props.moduleList;

    this.props.generateAllStore(generatorName, moduleList)
      .then(newValues => {
        
        newValues.forEach(({ module, ...values }) => {
          if (moduleList.includes(module)) {
            this.setState(values);
          }
        });
      });
  }



  ////////////////
  ////////////////



  ////////////////////////////////////////////////////////////////////////////

  render() {

    return <div className="generator__content">
      <div className='generator__modules-wrap'>
      {this.renderModules()}
      </div>
      <div className="generator__sketch-wrap">
        <div className="sketch" id="sketch" ref={this.sketchContainerRef}>
        </div>
        <div className="generator__sketch-controls">
          <div className="btn--big" onClick={this.generateCover}>GENERATE</div>
          <div className="btn--primary" onClick={this.downloadImage}>Download image</div>
        </div>
      </div>
    </div>
  }
}
