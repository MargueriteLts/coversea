import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import html2canvas from "html2canvas";
import { generateHash } from './utilities.js'

//UI
import A_IconButton from './components/buttons/A_IconButton.jsx'
import A_Text from './components/ATOMS/A_Text.jsx'

///////////////MODULES
import O_Module from './components/organisms/O_Module.jsx'
import { set3DStore } from './store.js';

// //Background
// // import Background from './modules/Background.jsx'
// import BackgroundImage from './modules/BackgroundImage.jsx'
// //Graphics
// import Image from './modules/Image.jsx'
// // import Lines from './modules/Lines.jsx'
// import Module3D from './modules/Module3D.jsx'
// import Particles from './modules/Particles.jsx'
// import Shapes from './modules/Shapes.jsx'
// import Vinyl from './modules/Vinyl.jsx'
// // //Text
// // import BasicTypo from './modules/BasicTypo.jsx'
// import BasicTypoV2 from './modules/BasicTypoV2.jsx'
// // //Overlay
// import Overlay from './modules/Overlay.jsx'


///////////////VAR
let size



export default class GeneratorContainer extends Component {
  constructor(props) {
    super(props)
    this.sketchContainerRef = React.createRef();
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

  // Tab -OK
  handleTabClickBackground = (type) => {
    this.props.setBackgroundStore('CurrentTabChange', type)
    this.setState({})
  }

   handleChangeBackgroundGradientType = (type) => {
    //console.log('CurrentGradientType', type);
     this.props.setBackgroundStore('CurrentGradientType', type)
     this.setState({})
  }

  // SolidColor -OK
  handleChangeBackgroundSolidColor = (object, value) => {
    this.props.setBackgroundStore(object, value)
    this.setState({})
  }

  // Gradient
  // -OK
  handleBackgroundRandomizeGradient = () => {
    this.props.setBackgroundStore('Gradient')
    this.setState({})
  }
  // -OK
  handleChangeBackgroundGradientColor = (object, value) => {
    this.props.setBackgroundStore(object, value)
    this.setState({})
  }
  // -OK (no state update here)
  handleChangeBackgroundGradientAngle = () => {
    this.props.setBackgroundStore('AngleGradient')
  }

  handleChangeBackgroundGradientStopQuantity = (e) => {
    this.props.setBackgroundStore('stopQuantity', e.target.value)
    this.setState({})
  }

  // Noise -OK
   handleTabClickNoise = (type) => {
    this.props.setBackgroundStore('currentTabImageChange', type)
    this.setState({})
  }

  handleChangeNoiseTintColor = (object, value) => {
    this.props.setBackgroundStore(object, value)
    this.setState({})
  }

////////////////////////////////////// MODULE BACKGROUND IMAGE

  // Tab -OK
  handleTabClickBackgroundImage = (type) => {
    this.props.setBackgroundImageStore('CurrentTabChange', type)
    this.setState({})
  }

  // Opacity -OK
  handleBackgroundImageOpacity = (e) => {
    this.props.setBackgroundImageStore('opacity', e.target.value)
    this.setState({})
  }

////////////////////////////////////// MODULE IMAGES (OBJECTS)

  // Tab -OK
  handleTabClickObject = (type) => {
    this.props.setImageStore('CurrentTabChange', type)
    this.setState({})
  }

////////////////////////////////////// MODULE LINES

  // Colors -OK
  handleLinesColor = (object, value) => {
    this.props.setLinesStore(object, value)
    this.setState({})
  }
  // Stroke -OK
  handleLinesSize = (e) => {
    this.props.setLinesStore('strokeWeight', e.target.value)
    this.setState({})
  }

  handleLinesQuantity = (e) => {
    this.props.setLinesStore('linesQuantity', e.target.value)
    this.setState({})
    //   .then(() => {
    //   }
    // )
  }

  handleDropDownLinesTypeClick = (type) => {
    this.props.setLinesStore('CurrentTypeChange', type)
    this.setState({})
  }

////////////////////////////////////// MODULE 3D

  // DropDown -OK
  handleDropDownClickModule3D = (type) => {
    this.props.set3DStore('CurrentTabChange', type)
    this.setState({})
  }

  handle3DColor = (object, value) => {
    this.props.set3DStore(object, value)
    this.setState({})
  }

  handle3DSize = (e) => {
    this.props.set3DStore('Size', e.target.value)
    this.setState({})
  }

  ////////////////////////////////////// MODULE PARTICLES
  
  // DropDown -OK
  handleDropDownClickParticles = (type) => {
    this.props.setParticlesStore('CurrentTabChange', type)
    this.setState({})
  }

  // Quantity -OK
  handleParticlesQuantity = (e) => {
    this.props.setParticlesStore('quantity', e.target.value)
    this.setState({})
  }

  // Color -OK
  handleParticlesColor = (object, value) => {
    this.props.setParticlesStore(object, value)
    this.setState({})
  }

  ////////////////////////////////////// MODULE SHAPES

  // DropDown -OK
  handleDropDownClickShapes = (type) => {
    this.props.setShapesStore('CurrentTabChange', type)
    this.setState({})
  }

  // Size -OK
  handleShapesSize = (e) => {
    this.props.setShapesStore('Size', e.target.value)
    this.setState({})
  }

  // Color -OK
  handleShapesColor = (object, value) => {
    this.props.setShapesStore(object, value)
    this.setState({})
  }

  ////////////////////////////////////// MODULE VINYL

  // Tab -OK
  handleTabClickVinyl = (type) => {
    this.props.setVinylStore('CurrentTabChange', type)
    this.setState({})
  }

  // Size -OK
  handleVinylSize = (e) => {
    this.props.setVinylStore('size', e.target.value)
    this.setState({})
  }

  // Opacity -OK
  handleVinylOpacity = (e) => {
    this.props.setVinylStore('opacity', e.target.value)
    this.setState({})
  }

  handleChangeVinylTintColor = (object, value) => {
    this.props.setVinylStore(object, value)
    this.setState({})
  }

  ////////////////////////////////////// MODULE OVERLAY

  // Tab -OK
  handleTabClickOverlay = (type) => {
    this.props.setOverlayStore('CurrentTabChange', type)
    this.setState({})
  }

  // Opacity -OK
  handleOverlayOpacity = (e) => {
    this.props.setOverlayStore('opacity', e.target.value)
    this.setState({})
  }


  ////////////////////////////////////////////////////////////////////////////


  /////////////////////////// RANDOMIZE MODULE ///////////////////////////
  //ji kompran pas.... sans this.setState ca effectivement n'update pas le state, le soucis... c'est quon a aucun state ici ni dans les modules... et en plus les newValues c'est juste des values, sans aucune keys.... alors comment il comprend ce quil doit updater...????
  // -OK
  handleRandomizeModule = (moduleName) => {
    this.props.randomizeModuleStore(moduleName)
    this.setState({})
  }

  /////////////////////////// GENERATE COVER ///////////////////////////

  generateCover = () => {
    const container = document.getElementById('reactComponentRoot')
    const generatorName = container.dataset.generator

    this.props.generateAllStore(generatorName, this.props.moduleList)
    this.setState({})
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

// /////////////////////////// LOCK/UNLOCK ITEMS ///////////////////////////

//   toggleLock = (module, item) => {
//     // let 
//     this.setState({})
//     // if (module == 'Background') {
//       // if (item == 'SolidColor') {

//       // }
//     // }
//     // this.setState((prevState) => ({
//     //   items: prevState.items.map(item =>
//     //     item.id === id ? { ...item, locked: !item.locked } : item
//     //   ),
//     // }));
//   };


/////////////////////////// RENDER MODULES ///////////////////////////

  renderModules() {
    const {
      moduleList,
      background,
      setBackgroundStore,
      objects,
      setImageStore,
      shapes,
      setShapesStore,
      particles,
      setParticlesStore,
      backgroundImage,
      vinyl,
      setVinylStore,
      lines,
      setLinesStore,
      module3D,
      set3DStore,
      basictypo,
      basictypoV2,
      setBasicTypoV2Store,
      setBasicTypoStore,
      overlay,
      setOverlayStore
      // setCanvasSizeStore
    } = this.props

    const modules = []

    moduleList.forEach((moduleName, index) => {

      // Background
      if (moduleName == 'Background') {
        modules.push(
          <O_Module
            moduleType='Background'
            background={background}
            moduleName={background.moduleName}
            handleRandomizeModule={this.handleRandomizeModule}
            handleTabClickBackground={this.handleTabClickBackground}
            handleChangeBackgroundGradientType={this.handleChangeBackgroundGradientType}
            handleChangeBackgroundSolidColor={this.handleChangeBackgroundSolidColor}
            handleChangeBackgroundGradientColor={this.handleChangeBackgroundGradientColor}
            handleChangeBackgroundAngleGradient={this.handleChangeBackgroundGradientAngle}
            handleChangeBackgroundGradientStopQuantity={this.handleChangeBackgroundGradientStopQuantity}
            handleTabClickNoise={this.handleTabClickNoise}
            handleChangeNoiseTintColor={this.handleChangeNoiseTintColor}
            setBackgroundStore={setBackgroundStore}
            key={index}
          />
        )
      }
      if (moduleName == 'BackgroundImage') {
        modules.push(
          <O_Module
            moduleType='BackgroundImage'
            backgroundImage={backgroundImage}
            moduleName={backgroundImage.moduleName}
            handleRandomizeModule={this.handleRandomizeModule}
            handleTabClickBackgroundImage={this.handleTabClickBackgroundImage}
            handleBackgroundImageOpacity={this.handleBackgroundImageOpacity}
            key={index}
          />
        )
      }

      // Graphics
      if (moduleName == 'Image') {
        modules.push(
          //<Image
          //  key={index}
          //  handleRandomizeModule={this.handleRandomizeModule}
          //  objects={objects}
          //  handleTabClickObject={this.handleTabClickObject}
          ///>
          <O_Module
            moduleType='Objects'
            objects={objects}
            moduleName={objects.moduleName}
            handleRandomizeModule={this.handleRandomizeModule}
            handleTabClickObject={this.handleTabClickObject}
            setImageStore={setImageStore}
            key={index}
          />
        )
      }
      if (moduleName == 'Lines') {
        modules.push(
          <O_Module
            moduleType='Lines'
            lines={lines}
            moduleName={lines.moduleName}
            handleRandomizeModule={this.handleRandomizeModule}
            handleLinesColor={this.handleLinesColor}
            handleLinesSize={this.handleLinesSize}
            handleLinesQuantity={this.handleLinesQuantity}
            handleDropDownLinesTypeClick={this.handleDropDownLinesTypeClick}
            setLinesStore={setLinesStore}
            key={index}
          />
        )
      }
      if (moduleName == 'Module3D') {
        modules.push(
          <O_Module
            moduleType='Module3D'
            module3D={module3D}
            moduleName={module3D.moduleName}
            set3DStore={set3DStore}
            handleRandomizeModule={this.handleRandomizeModule}
            handleDropDownClickModule3D={this.handleDropDownClickModule3D}
            handle3DSize={this.handle3DSize}
            handle3DColor={this.handle3DColor}
            key={index}
          />
        )
      }
      if (moduleName == 'Particles') {
        modules.push(
          <O_Module
            moduleType='Particles'
            particles={particles}
            moduleName={particles.moduleName}
            handleRandomizeModule={this.handleRandomizeModule}
            setParticlesStore={setParticlesStore}
            handleDropDownClickParticles={this.handleDropDownClickParticles}
            handleParticlesQuantity={this.handleParticlesQuantity}
            handleParticlesColor={this.handleParticlesColor}
            key={index}
          />
        )
      }
      if (moduleName == 'Shapes') {
        modules.push(
          <O_Module
            moduleType='Shapes'
            shapes={shapes}
            moduleName={shapes.moduleName}
            setShapesStore={setShapesStore}
            handleRandomizeModule={this.handleRandomizeModule}
            handleDropDownClickShapes={this.handleDropDownClickShapes}
            handleShapesColor={this.handleShapesColor}
            handleShapesSize={this.handleShapesSize}
            key={index}
          />
        )
      }
      if (moduleName == 'Vinyl') {
        modules.push(
          <O_Module
            moduleType='Vinyl'
            vinyl={vinyl}
            moduleName={vinyl.moduleName}
            handleRandomizeModule={this.handleRandomizeModule}
            handleTabClickVinyl={this.handleTabClickVinyl}
            handleVinylSize={this.handleVinylSize}
            handleVinylOpacity={this.handleVinylOpacity}
            handleChangeVinylTintColor={this.handleChangeVinylTintColor}
            setVinylStore={setVinylStore}
            key={index}
          />
        )
      }

      // Typography
      if (moduleName == 'BasicTypo') {
        modules.push(
          <O_Module
            moduleType='BasicTypo'
            basictypo={basictypo}
            moduleName={basictypo.moduleName}
            setBasicTypoStore={setBasicTypoStore}
            handleRandomizeModule={this.handleRandomizeModule}
            key={index}
          />
        )
      }
      if (moduleName == 'BasicTypoV2') {
        modules.push(
          <BasicTypoV2
            key={index}
          // randomizeModuleStore={randomizeModuleStore}
            basictypoV2={basictypoV2}
            setBasicTypoV2Store={setBasicTypoV2Store}
          />
        )
      }

      // Overlay
      if (moduleName == 'Overlay') {
        modules.push(
          <O_Module
            moduleType='Overlay'
            overlay={overlay}
            moduleName={overlay.moduleName}
            handleRandomizeModule={this.handleRandomizeModule}
            handleTabClickOverlay={this.handleTabClickOverlay}
            handleOverlayOpacity={this.handleOverlayOpacity}
            setOverlayStore={setOverlayStore}
            key={index}
          />
        )
      }

    })

    return modules
  }


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
          <div className="button--large" onClick={this.generateCover}>GENERATE</div>
          <A_IconButton
            onClick={this.downloadImage}
            icon='icon--download'
            size='large'
            style='filled'
          />
        </div>
      </div>
    </div>
  }
}
